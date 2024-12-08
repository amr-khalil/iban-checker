import React from "react";
import "./Header.css";

const Header: React.FC = () => {
  return (
    <header className="header">
      <h1>IBAN Checker</h1>
      <p>
        IBANs always follow a set format. This means we can tell if yours is
        valid or not, and show you what each part of it represents.
      </p>
      <div className="break-line"></div>
    </header>
  );
};

export default Header;
