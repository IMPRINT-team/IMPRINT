import React from "react";
import ImprintLogo from "./ImprintLogo.jsx";

const ImprintLogoWatermark = () => (
  <div
    className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5"
    data-debug-label="ImprintLogoWatermark"
  >
    <ImprintLogo className="w-[60rem] h-[60rem]" />
  </div>
);

export default ImprintLogoWatermark;
