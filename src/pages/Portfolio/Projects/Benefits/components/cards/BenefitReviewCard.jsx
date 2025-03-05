import { toDollarAmount } from "@/utils/formatters";

import { BenefitPackagePropTypes } from "@/utils/benefitPackageUtils";
import "./cards.scss";

const BenefitReviewCard = ({ benefit, summary }) => {
  const { optOutOptionId, title, getOptionById } = benefit;
  const optOut = summary.optionId === optOutOptionId;
  const color = optOut ? "yellow" : "green";

  const fullOption = getOptionById(summary.optionId);

  return (
    <div className={`benefit-review-card ${color} shadow`}>
      <div className="benefit-review-title">
        {optOut ? (
          <div>
            {title} <br /> <span className="waived-text">Opted Out</span>
          </div>
        ) : (
          fullOption.benefitPlanTitle
        )}
      </div>
      <div className="benefit-review-details">
        <div className="benefit-review-coverage-level">
          {!optOut && ` Coverage Level: ${fullOption.benefitLevelTitle}`}
        </div>
        <div className="benefit-review-monthly-premium">
          {!optOut
            ? `Monthly Premium: $${toDollarAmount(summary.premium)}`
            : ""}
        </div>
      </div>
    </div>
  );
};

BenefitReviewCard.propTypes = {
  benefit: BenefitPackagePropTypes.benefitType.isRequired,
  summary: BenefitPackagePropTypes.benefitSelectionSummaryType.isRequired,
};

export default BenefitReviewCard;
