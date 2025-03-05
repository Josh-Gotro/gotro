import PropTypes from "prop-types";

import SOAButton from "@/components/buttons/SOAButton";

const BenefitOptOutSection = ({ onSelectBenefitsClick }) => (
  <>
    <div className="opt-out-text">
      <h2>Opted Out</h2>
    </div>
    <div className="button-premium-container">
      <SOAButton
        onClick={onSelectBenefitsClick}
        primary={true}
        sm
        text={"Select Benefits"}
        width={"100%"}
        className="select-benefits-button"
      />
    </div>
  </>
);

BenefitOptOutSection.propTypes = {
  onSelectBenefitsClick: PropTypes.func.isRequired,
};

export default BenefitOptOutSection;
