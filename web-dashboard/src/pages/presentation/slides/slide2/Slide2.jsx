import React from "react";
import { ClipboardList, MemoryStick, PanelLeftOpen } from "lucide-react";

const Slide2 = () => (
  <>
    <div className="slide2-div1">
      <h2 className="slide2-title">RFID is Underutilized</h2>
    </div>
    <div className="slide2-div2" aria-label="Current State">
      <MemoryStick className="slide2-icon" aria-hidden="true" />
    </div>
    <div className="slide2-div3">
      <div className="slide2-description">
        <p>Most RFID systems treat scans as passive identification.</p>
        <p className="slide2-note-label">Common examples</p>
        <ul>
          <li>door access logs</li>
          <li>attendance check-ins</li>
          <li>inventory scans</li>
        </ul>
        <p>These systems record presence, but rarely support interaction workflows.</p>
      </div>
    </div>
    <div className="slide2-div4" aria-label="Opportunity">
      <ClipboardList className="slide2-icon" aria-hidden="true" />
    </div>
    <div className="slide2-div5">
      <div className="slide2-description">
        <p className="slide2-note-label">Opportunity</p>
        <p>RFID scans can act as physical inputs to software systems.</p>
      </div>
    </div>
    <div className="slide2-div6" aria-label="Interaction Model">
      <PanelLeftOpen className="slide2-icon" aria-hidden="true" />
    </div>
    <div className="slide2-div7">
      <div className="slide2-description">
        <p className="slide2-note-label">Interaction model</p>
        <p>RFID tap -&gt; structured event -&gt; system action</p>
        <p className="slide2-note-label">Similar to</p>
        <ul>
          <li>button press</li>
          <li>keyboard input</li>
          <li>API request</li>
        </ul>
      </div>
    </div>
  </>
);

export default Slide2;
