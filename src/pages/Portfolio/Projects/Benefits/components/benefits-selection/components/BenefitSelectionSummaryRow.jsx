import PropTypes from "prop-types";

const BenefitSelectionSummaryRow = ({
  premiumFormatter,
  title,
  description,
  premium,
}) => {
  return (
    <tr>
      <td>{title}</td>
      <td>{description}</td>
      <td style={{ textAlign: 'right' }}>{description === "Opted Out" ? "--" : premiumFormatter(premium)}</td>
    </tr>
  );
};

BenefitSelectionSummaryRow.propTypes = {
  premiumFormatter: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  premium: PropTypes.number.isRequired,
};

export default BenefitSelectionSummaryRow;
