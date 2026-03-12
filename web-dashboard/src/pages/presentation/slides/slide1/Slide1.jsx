import React from "react";
import ImprintLogo from "../../../../components/branding/ImprintLogo.jsx";

const Slide1 = () => (
  <>
    <div className="div1 slide-logo-slot">
      <ImprintLogo className="slide-logo" />
    </div>
    <div className="div2">
      <h1 className="slide-title">IMPRINT</h1>
    </div>
    <div className="div3">
      <p className="slide-kicker">Distributed RFID Activation Platform</p>
      <ul className="slide-team-list">
        <li>Lucas Starkey, Isaiah Chastain, Sawyer Blanchford</li>
        <li>Trigg Lampkins, Trey Gannod</li>
      </ul>
    </div>
    <div className="div4 format-block" aria-hidden="true" />
    <div className="div5 format-block" aria-hidden="true" />
    <div className="div6 format-block" aria-hidden="true" />
    <div className="div7 format-block" aria-hidden="true" />
  </>
);

export default Slide1;
