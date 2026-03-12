import React from "react";

const Slide6 = () => (
  <>
    <h2 className="slide-outline-title">Scanner Layer</h2>
    <div className="slide-outline-grid">
      <section className="slide-outline-section">
        <h3>Hardware Nodes</h3>
        <p className="slide-outline-label">Questions to answer</p>
        <ul>
          <li>What hardware platform are the scanners built on?</li>
          <li>How do scanners communicate with the backend?</li>
          <li>What protocol is used for sending scan events?</li>
        </ul>
      </section>
      <section className="slide-outline-section">
        <h3>Scanner Responsibilities</h3>
        <p className="slide-outline-label">Questions</p>
        <ul>
          <li>What data does a scanner send when a tag is read?</li>
          <li>How often can scans occur?</li>
          <li>How does the scanner confirm successful reads to the user?</li>
        </ul>
      </section>
      <section className="slide-outline-section slide-outline-section-wide">
        <h3>Edge Features</h3>
        <p className="slide-outline-label">Questions</p>
        <ul>
          <li>What feedback mechanisms exist on the scanner?</li>
          <li>Does the scanner track device identity?</li>
          <li>How is device health monitored?</li>
        </ul>
      </section>
    </div>
  </>
);

export default Slide6;
