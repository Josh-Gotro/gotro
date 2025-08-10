import PropTypes from "prop-types";

import { cleanBenefitPlanTitle } from "./cleanBenefitPlanTitle";

export function transformBenefits(serverBenefits) {
  // Add safety check for undefined or empty benefits array
  if (!serverBenefits || !Array.isArray(serverBenefits)) {
    console.warn('transformBenefits received invalid serverBenefits:', serverBenefits);
    return {
      benefits: [],
      lookupBenefitById: () => null,
      defaultSelections: [],
      getBenefitSelectionSummary: () => null,
      computeTotalPremium: () => 0,
      isBenefitTypeHfsa,
    };
  }
  
  const benefits = serverBenefits.map((b) => processBenefit(b));
  const defaultSelections = getDefaultSelections(serverBenefits);

  const lookupBenefitById = (id) =>
    benefits.find((b) => b.benefitTypeId === id);

  const getBenefitSelectionSummary = (selection) =>
    lookupBenefitById(selection.benefitTypeId)?.getBenefitSelectionSummary(
      selection,
    );

  const computeTotalPremium = (summaries) => {
    return summaries.reduce((total, { premium }) => total + (premium ?? 0), 0);
  };

  return {
    benefits,
    lookupBenefitById,
    defaultSelections,
    getBenefitSelectionSummary,
    computeTotalPremium,
    isBenefitTypeHfsa,
  };
}

function getDefaultSelections(serverBenefits) {
  return serverBenefits.map(
    ({ benefitTypeId, selectedBenefitOptionId, electedMonthlyRate }) => ({
      benefitTypeId,
      optionId: selectedBenefitOptionId,
      electedMonthlyRate,
    }),
  );
}

function isBenefitTypeHfsa(benefitTypeId) {
  return benefitTypeId === 4;
}

function isOptionOptOut(option) {
  return option.benefitPlanId === null;
}

function findOptOutOption(options) {
  return options.find(isOptionOptOut);
}

function findDefaultOption(options) {
  return options.find((o) => o.defaultOptionIndicator);
}

function getInitialAffirmativeOption(options, defaultOption, optOutOptionId) {
  const affirmativeOption = defaultOption?.benefitOptionId !== optOutOptionId
    ? defaultOption
    : options.find((o) => o.benefitOptionId !== optOutOptionId);
  
  // If no affirmative option found, return the first available option (could be opt-out)
  return affirmativeOption || options[0];
}

function optionToSelection(benefitTypeId, option) {
  // Handle case where option might be undefined
  if (!option) {
    return {
      benefitTypeId,
      optionId: null,
      electedMonthlyRate: null,
    };
  }
  
  return {
    benefitTypeId,
    optionId: option.benefitOptionId,
    electedMonthlyRate: null,
  };
}

function getAvailablePlans(options) {
  const planLookup = options
    .map(({ benefitPlanId, benefitPlanTitle }) => ({
      planId: benefitPlanId,
      planTitle: cleanBenefitPlanTitle(benefitPlanTitle),
    }))
    .reduce((planMap, p) => {
      if (p.planId !== null) {
        planMap[p.planId] = p;
      }
      return planMap;
    }, {});
  return Object.values(planLookup);
}

function getAvailableLevels(options) {
  const levelLookup = options
    .map(({ benefitLevelId, benefitLevelTitle }) => ({
      levelId: benefitLevelId,
      levelTitle: benefitLevelTitle,
    }))
    .reduce((levelMap, lvl) => {
      if (lvl.levelId !== null) {
        levelMap[lvl.levelId] = lvl;
      }
      return levelMap;
    }, {});
  return Object.values(levelLookup);
}

function findOptionByPlanAndLevel(options, planId, levelId) {
  return options.find(
    (o) => o.benefitPlanId === planId && o.benefitLevelId === levelId,
  );
}

function getOptionDescription(benefitTypeId, option) {
  if (!option) {
    return "No Option Selected";
  }
  
  const { benefitPlanTitle, benefitLevelTitle } = option;

  return isOptionOptOut(option)
    ? "Opted Out"
    : isBenefitTypeHfsa(benefitTypeId)
      ? benefitLevelTitle
      : `${cleanBenefitPlanTitle(benefitPlanTitle)} - ${benefitLevelTitle}`;
}

function processBenefit(benefit) {
  const {
    benefitTypeId,
    benefitTypeTitle,
    benefitOptions,
    minMonthlyRate,
    maxMonthlyRate,
  } = benefit;

  // Add safety check for benefitOptions
  if (!benefitOptions || !Array.isArray(benefitOptions) || benefitOptions.length === 0) {
    console.warn('processBenefit received benefit with invalid options:', benefit);
    // Create a dummy option to satisfy PropTypes requirements
    const dummyOption = {
      benefitOptionId: -1,
      benefitPlanId: null,
      benefitPlanTitle: 'No Plan Available',
      benefitLevelId: null,
      benefitLevelTitle: 'No Options',
      monthlyCost: 0,
      defaultOptionIndicator: true
    };
    return {
      benefitTypeId,
      title: benefitTypeTitle,
      optOutOptionId: null,
      defaultOption: dummyOption,
      initialAffirmativeSelection: { benefitTypeId, optionId: -1, electedMonthlyRate: null },
      getOptionById: () => dummyOption,
      getOptionByPlanAndLevel: () => dummyOption,
      calculatePremium: () => 0,
      minMonthlyRate,
      maxMonthlyRate,
      plans: [],
      levels: [],
      getBenefitSelectionSummary: () => ({ benefitTypeId, optionId: -1, title: benefitTypeTitle, description: 'No options available', premium: 0 }),
    };
  }

  const optionMap = new Map(benefitOptions.map((o) => [o.benefitOptionId, o]));
  const defaultOption = findDefaultOption(benefitOptions);
  const optOutOptionId = findOptOutOption(benefitOptions)?.benefitOptionId;

  const getOptionById = (id) => optionMap.get(id);
  const getOptionByPlanAndLevel = (planId, levelId) =>
    findOptionByPlanAndLevel(benefitOptions, planId, levelId);

  const calculatePremium = ({ optionId, electedMonthlyRate }) =>
    electedMonthlyRate ?? getOptionById(optionId)?.monthlyCost ?? 0;
  const firstAffirmativeOption = getInitialAffirmativeOption(
    benefitOptions,
    defaultOption,
    optOutOptionId,
  );
  const initialAffirmativeSelection = optionToSelection(
    benefitTypeId,
    firstAffirmativeOption,
  );

  const plans = getAvailablePlans(benefitOptions);
  const levels = getAvailableLevels(benefitOptions);

  const getBenefitSelectionSummary = (selection) => {
    const { optionId } = selection;
    const option = getOptionById(optionId);
    const description = getOptionDescription(benefitTypeId, option);
    const premium = calculatePremium(selection);

    return {
      benefitTypeId,
      optionId,
      title: benefitTypeTitle,
      description,
      premium,
    };
  };

  return {
    benefitTypeId,
    title: benefitTypeTitle,
    optOutOptionId,
    defaultOption,
    initialAffirmativeSelection,
    getOptionById,
    getOptionByPlanAndLevel,
    calculatePremium,
    minMonthlyRate,
    maxMonthlyRate,
    plans,
    levels,
    getBenefitSelectionSummary,
  };
}

const benefitOptionType = PropTypes.shape({
  benefitOptionId: PropTypes.number.isRequired,
  benefitPlanId: PropTypes.number,
  benefitPlanTitle: PropTypes.string,
  benefitLevelId: PropTypes.number,
  benefitLevelTitle: PropTypes.string,
  monthlyCost: PropTypes.number,
  defaultOptionIndicator: PropTypes.bool.isRequired,
});

const benefitLevelType = PropTypes.shape({
  levelId: PropTypes.number.isRequired,
  levelTitle: PropTypes.string.isRequired,
});

const benefitPlanType = PropTypes.shape({
  planId: PropTypes.number.isRequired,
  planTitle: PropTypes.string.isRequired,
});

const selectedOptionType = PropTypes.shape({
  benefitTypeId: PropTypes.number.isRequired,
  optionId: PropTypes.number.isRequired,
  electedMonthlyRate: PropTypes.number,
});

const benefitType = PropTypes.shape({
  benefitTypeId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  optOutOptionId: PropTypes.number.isRequired,
  defaultOption: benefitOptionType.isRequired,
  initialAffirmativeSelection: selectedOptionType.isRequired,
  getOptionById: PropTypes.func.isRequired,
  getOptionByPlanAndLevel: PropTypes.func.isRequired,
  calculatePremium: PropTypes.func.isRequired,
  minMonthlyRate: PropTypes.number,
  maxMonthlyRate: PropTypes.number,
  plans: PropTypes.arrayOf(benefitPlanType).isRequired,
  levels: PropTypes.arrayOf(benefitLevelType).isRequired,
  getBenefitSelectionSummary: PropTypes.func.isRequired,
});

export const BenefitPackagePropTypes = {
  benefitPackageType: PropTypes.shape({
    benefits: PropTypes.arrayOf(benefitType).isRequired,
    lookupBenefitById: PropTypes.func.isRequired,
    defaultSelections: PropTypes.arrayOf(selectedOptionType).isRequired,
    getBenefitSelectionSummary: PropTypes.func.isRequired,
    computeTotalPremium: PropTypes.func.isRequired,
    isBenefitTypeHfsa: PropTypes.func.isRequired,
  }),
  benefitType,
  benefitLevelType,
  benefitSelectionSummaryType: PropTypes.shape({
    benefitTypeId: PropTypes.number.isRequired,
    optionId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    premium: PropTypes.number.isRequired,
  }),
  selectedOptionType,
};
