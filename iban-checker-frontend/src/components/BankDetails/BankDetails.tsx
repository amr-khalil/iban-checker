import React from "react";
import "./BankDetails.css";

interface BankDetailsProps {
  bankDetails: {
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

const BankDetails: React.FC<BankDetailsProps> = ({ bankDetails }) => {
  return (
    <div className="bank-details">
      <h3>Bank Details</h3>
      <table>
        <tbody>
          <tr>
            <td>
              <span>Bank Identifier</span> {bankDetails.bankIdentifier}
            </td>
          </tr>
          <tr>
            <td>
              <span>Bank Name</span> {bankDetails.name}
            </td>
          </tr>
          <tr>
            <td>
              <span>BIC</span> {bankDetails.bic}
            </td>
          </tr>
          <tr>
            <td>
              <span>Branch</span> {bankDetails.branch}
            </td>
          </tr>
          <tr>
            <td>
              <span>Address</span> {bankDetails.address}
            </td>
          </tr>
          <tr>
            <td>
              <span>City</span> {bankDetails.city}
            </td>
          </tr>
          <tr>
            <td>
              <span>ZIP</span> {bankDetails.zip}
            </td>
          </tr>
          <tr>
            <td>
              <span>Country</span> {bankDetails.country}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BankDetails;
