import React from "react";
import { ClipboardList, PanelLeftOpen, ShieldCheck } from "lucide-react";

const Slide2 = () => (
  <>
    <div className="slide2-div1">
      <h2 className="slide2-title">Platform outcomes</h2>
    </div>
    <div className="slide2-div2" aria-label="Validated event">
      <ShieldCheck className="slide2-icon" aria-hidden="true" />
    </div>
    <div className="slide2-div3">
      <div className="slide2-description">
        <p>Tap -&gt; validated event -&gt; action + visibility</p>
      </div>
    </div>
    <div className="slide2-div4" aria-label="Teams gain">
      <ClipboardList className="slide2-icon" aria-hidden="true" />
    </div>
    <div className="slide2-div5">
      <div className="slide2-description">
        <p className="slide2-note-label">Teams gain</p>
      </div>
    </div>
    <div className="slide2-div6" aria-label="Outcome list">
      <PanelLeftOpen className="slide2-icon" aria-hidden="true" />
    </div>
    <div className="slide2-div7">
      <div className="slide2-description">
        <ul>
          <li>real-time activity logs</li>
          <li>automation-ready integrations</li>
          <li>auditable event history</li>
        </ul>
      </div>
    </div>
  </>
);

export default Slide2;
