import React from "react";
import { ClipboardList, MemoryStick, Users } from "lucide-react";

const Slide3 = () => (
  <>
    <div className="slide2-div1">
      <h2 className="slide2-title">Interaction Problem</h2>
    </div>
    <div className="slide2-div2" aria-label="Shared Environment Interactions">
      <Users className="slide2-icon" aria-hidden="true" />
    </div>
    <div className="slide2-div3">
      <div className="slide2-description">
        <p>Many shared environments require quick, reliable interactions such as:</p>
        <ul>
          <li>starting volunteer shifts</li>
          <li>checking out equipment</li>
          <li>logging event attendance</li>
          <li>accessing restricted spaces</li>
        </ul>
        <p>These interactions are often handled with:</p>
        <ul>
          <li>manual sign-in sheets</li>
          <li>disconnected software systems</li>
          <li>inconsistent record keeping</li>
        </ul>
      </div>
    </div>
    <div className="slide2-div4" aria-label="Core Idea">
      <MemoryStick className="slide2-icon" aria-hidden="true" />
    </div>
    <div className="slide2-div5">
      <div className="slide2-description">
        <p>Treat RFID taps as intentional interaction events.</p>
        <p>Each scan produces an event describing:</p>
        <ul>
          <li>who</li>
          <li>what device</li>
          <li>where</li>
          <li>when</li>
          <li>what interaction</li>
        </ul>
      </div>
    </div>
    <div className="slide2-div6" aria-label="Event Outcomes">
      <ClipboardList className="slide2-icon" aria-hidden="true" />
    </div>
    <div className="slide2-div7">
      <div className="slide2-description">
        <p>These events can drive:</p>
        <ul>
          <li>logging</li>
          <li>automation</li>
          <li>integrations</li>
          <li>analytics</li>
        </ul>
      </div>
    </div>
  </>
);

export default Slide3;
