import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faCheckCircle,
  faTimesCircle,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import "./IBANCheckResult.css";
import BankDetails from "../BankDetails/BankDetails";

interface IBANValidationSuccessResponse {
  status: string;
  iban: string;
  valid: boolean;
  validLength: boolean;
  validFormat: boolean;
  validCountryCode: boolean;
  validChecksum: boolean;
  bankDetails?: {
    bankIdentifier: string;
    name: string;
    bic: string;
    branch: string;
    address: string;
    city: string;
    zip: string;
    country: string;
  };
}

interface IBANCheckResultProps {
  result: IBANValidationSuccessResponse | null;
  loading: boolean;
}

const IBANCheckResult: React.FC<IBANCheckResultProps> = ({
  result,
  loading,
}) => {
  if (loading) {
    return (
      <div className="result-card">
        <div className="spinner-container">
          <FontAwesomeIcon icon={faSpinner} spin className="spinner" />
        </div>
      </div>
    );
  }

  if (!result) return null;

  const likeIcon = (condition: boolean) => (
    <FontAwesomeIcon
      icon={condition ? faThumbsUp : faThumbsDown}
      className={condition ? "thump-up" : "thump-down"}
    />
  );

  const validIcon = (condition: boolean) => (
    <FontAwesomeIcon
      icon={condition ? faCheckCircle : faTimesCircle}
      className={condition ? "icon-success" : "icon-error"}
    />
  );

  return (
    <div className="result-card">
      <div className="result">
        <h3>IBAN Check Result</h3>
        <table className="result-table">
          <tbody>
            <tr className="main-row">
              <td>
                <span>
                  {result.iban} is {result.valid ? "valid" : "not valid"}{" "}
                </span>
                <span>{validIcon(result.valid)}</span>
              </td>
            </tr>
            <tr>
              <td>
                <span>IBAN length for this country </span>
                <span>{likeIcon(result.validLength)}</span>
              </td>
            </tr>
            <tr>
              <td>
                <span>
                  IBAN format is{" "}
                  {result.validFormat ? "correct" : "not correct"}{" "}
                </span>
                <span>{likeIcon(result.validFormat)}</span>
              </td>
            </tr>
            <tr>
              <td>
                <span>
                  Country code is{" "}
                  {result.validCountryCode ? "supported" : "not supported"}{" "}
                </span>
                <span>{likeIcon(result.validCountryCode)}</span>
              </td>
            </tr>
            <tr>
              <td>
                <span>
                  Checksum is {result.validChecksum ? "correct" : "not correct"}{" "}
                </span>
                <span>{likeIcon(result.validChecksum)}</span>
              </td>
            </tr>
          </tbody>
        </table>
        {result.valid && result.bankDetails && (
          <BankDetails bankDetails={result.bankDetails} />
        )}
      </div>
    </div>
  );
};

export default IBANCheckResult;
