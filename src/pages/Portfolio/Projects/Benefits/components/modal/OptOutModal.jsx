import Modal from "@/components/modal/Modal";
import PropTypes from "prop-types";

const OptOutModal = ({ show, onClose, onAgree, benefits }) => {
  const getCertificationDescriptions = (benefits) => {
    // Filter out the benefitSelections where certificationDescription is not null
    const benefitSelectionsWithDescription = benefits.benefitSelections.filter(
      (benefit) => benefit.certificationDescription !== null,
    );

    // Map over the filtered benefitSelections and return an array of certificationDescriptions
    const certificationDescriptions = benefitSelectionsWithDescription.map(
      (benefit) => benefit.certificationDescription,
    );

    return certificationDescriptions;
  };

  const certificationDescriptions = benefits
    ? getCertificationDescriptions(benefits)
    : [];

  const optOutCopy = (
    <div>
      <p>
        I certify that I have been given an opportunity to apply for coverage
        for myself and my eligible dependents, if any. Because of other health
        insurance or group health plan coverage I am declining/waiving/opting
        out of enrollment from the following AlaskaCare Employee Health Plan
        benefits:
      </p>

      <ul>
        {certificationDescriptions.map((description, index) => (
          <li key={index}>{description}</li>
        ))}
      </ul>

      <p>
        Please read the following Opt-Out Notice before proceeding:{" "}
        <a
          href="https://drb.alaska.gov/docs/forms/ben165.pdf"
          target="_blank"
          rel="noopener noreferrer">
          https://drb.alaska.gov/docs/forms/ben165.pdf
        </a>
      </p>
      <p>
        I have read and understand the information provided in the Opt-Out
        Notice and by clicking Agree and Continue, I am certifying that I am
        declining/waiving/opting out of the benefits listed above.
      </p>
    </div>
  );

  return (
    <Modal
      show={show}
      onClose={onClose}
      buttonAction={onAgree}
      actionButtonLabel="Agree and Continue"
      title="Opt-Out Waiver">
      {optOutCopy}
    </Modal>
  );
};

OptOutModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAgree: PropTypes.func.isRequired,
};

export default OptOutModal;
