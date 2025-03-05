import { Alert, Table,  Row, Col } from "react-bootstrap";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";

import { toDollarAmount } from "@/utils/formatters";
import { BenefitPackagePropTypes } from "@/utils/benefitPackageUtils";

import BenefitSelectionSummaryRow from "./BenefitSelectionSummaryRow";

import '../benefits-selection.scss';


const BenefitSelectionSummary = ({ summaries, totalPremium }) => {
  const notice = (
    <>
      <p>
        If you do not make a selection, the preselected default elections will be made on your
        behalf.
      </p>
      <p>
        Visit {""}
        <a href="https://drb.alaska.gov/employee/healthplans.html#hfsa"> AlaskaCare Employee Health Plan</a>
        {" "} for information about the plan options available.
      </p>
    </>
  );

  const formatPremium = (premium) => {
    return premium ? `$${toDollarAmount(premium)}` : "$0.00";
  }

  return (
    <>
      <Alert className="alert-warn">
        <Row>
          <Col xs={2} className="d-flex justify-content-center align-items-center ">
            <InformationCircleIcon height="40" width="40" />
          </Col>
          <Col xs={10}>
            {notice}
          </Col>
        </Row>
      </Alert>
      <Table hover>
        <thead>
          <tr>
            <th className="selection-column">Selection</th>
            <th className="summary-column">Summary</th>
            <th className="cost-column">Cost</th>
          </tr>
        </thead>
        <tbody>
          {summaries.map((s, idx) => (
            <BenefitSelectionSummaryRow
              key={idx}
              premiumFormatter={formatPremium}
              {...s}
            />
          ))}
        </tbody>
      </Table>
      <div className="monthly-premium">
        <span className="premium-label">Monthly Premium:</span>
        <span className="premium-amount">{formatPremium(totalPremium)}</span>
      </div>
    </>
  );
};

BenefitSelectionSummary.propTypes = {
  summaries: PropTypes.arrayOf(
    BenefitPackagePropTypes.benefitSelectionSummaryType,
  ).isRequired,
  totalPremium: PropTypes.number.isRequired,
};

export default BenefitSelectionSummary;
