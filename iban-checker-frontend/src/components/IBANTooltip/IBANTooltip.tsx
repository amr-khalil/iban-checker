import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import "./IBANTooltip.css";

const IBANTooltip: React.FC = () => {
  return (
    <div className="info-button">
      <FontAwesomeIcon icon={faInfoCircle} />
      <div className="info-tooltip">
        <table>
          <thead>
            <tr>
              <th>Country</th>
              <th>IBAN Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Germany</td>
              <td>DE89370400440532013000</td>
            </tr>
            <tr>
              <td>United Kingdom</td>
              <td>GB82WEST12345698765432</td>
            </tr>
            <tr>
              <td>France</td>
              <td>FR7630001007941234567890185</td>
            </tr>
            <tr>
              <td>Netherlands</td>
              <td>NL91ABNA0417164300</td>
            </tr>
            <tr>
              <td>Spain</td>
              <td>ES9121000418450200051332</td>
            </tr>
            <tr>
              <td>Italy</td>
              <td>IT60X0542811101000000123456</td>
            </tr>
            <tr>
              <td>Belgium</td>
              <td>BE68539007547034</td>
            </tr>
            <tr>
              <td>Switzerland</td>
              <td>CH9300762011623852957</td>
            </tr>
            <tr>
              <td>Sweden</td>
              <td>SE4550000000058398257466</td>
            </tr>
            <tr>
              <td>Denmark</td>
              <td>DK5000400440116243</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IBANTooltip;
