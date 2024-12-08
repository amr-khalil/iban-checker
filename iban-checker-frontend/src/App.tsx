import React from "react";
import Header from "./components/Header/Header";
import IBANCheckForm from "./components/IBANCheckForm/IBANCheckForm";

const App: React.FC = () => {
  return (
    <div className="container">
      <div className="top-background"></div>
      <Header />
      <IBANCheckForm />
    </div>
  );
};

export default App;
