import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./IBANCheckForm.css";
import IBANCheckResult from "../IBANCheckResult/IBANCheckResult";
import IBANTooltip from "../IBANTooltip/IBANTooltip";

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

interface IBANValidationErrorResponse {
  status: string;
  errorType: string;
  message: string;
}

const IBANCheckForm: React.FC = () => {
  const [iban, setIban] = useState<string>("");
  const [result, setResult] = useState<IBANValidationSuccessResponse | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const IBAN_API_HOST: string = "http://172.105.69.35";
  const IBAN_API_PORT: string = "8888";
  const IBAN_API_URL: string = `${IBAN_API_HOST}:${IBAN_API_PORT}/api/iban/validate`;

  const handleCheckIBAN = async () => {
    setLoading(true);
    setResult(null); // Clear previous result
    setError(null); // Clear previous error
    try {
      const response = await axios.post<
        IBANValidationSuccessResponse | IBANValidationErrorResponse
      >(IBAN_API_URL, {
        iban,
      });
      if (response.data.status === "error") {
        const errorResponse = response.data as IBANValidationErrorResponse;
        setError(errorResponse.message);
        setResult(null);
      } else {
        const successResponse = response.data as IBANValidationSuccessResponse;
        setResult(successResponse);
        setError(null); // Clear any previous errors
      }
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Error checking IBAN. Please try again.");
      }
      setResult(null); // Clear any previous results
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="iban-check-form box">
      <h2>Check an IBAN</h2>
      <p>Type it in here and we’ll tell you if it’s the right format.</p>
      <label htmlFor="iban">Enter your IBAN</label>
      <div className="input-container">
        <input
          type="text"
          className="input"
          id="iban"
          value={iban}
          placeholder="e.g. DE 89 3704 0044 0532 0130 00"
          defaultValue={iban}
          onChange={(e) => setIban(e.target.value)}
        />
        <IBANTooltip />
      </div>
      <button className="button" onClick={handleCheckIBAN} disabled={loading}>
        Check IBAN
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
      </button>
      {error && <p className="error">{error}</p>}
      <IBANCheckResult result={result} loading={loading} />
    </div>
  );
};

export default IBANCheckForm;
