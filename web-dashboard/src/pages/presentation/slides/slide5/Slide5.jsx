import React from "react";

const Slide5 = () => (
  <>
    <h2 className="slide-outline-title">System Overview</h2>
    <div className="slide-outline-grid">
      <section className="slide-outline-section">
        <h3>Distributed Interaction Platform</h3>
        <p>RFID scans drive digital actions across distributed services.</p>
      </section>
      <section className="slide-outline-section">
        <h3>Core System Pieces</h3>
        <ul>
          <li>RFID scanners</li>
          <li>backend services</li>
          <li>data storage</li>
          <li>web dashboard</li>
        </ul>
      </section>
      <section className="slide-outline-section slide-outline-section-wide">
        <h3>Key Architectural Idea</h3>
        <p>Separation of:</p>
        <ul>
          <li>hardware</li>
          <li>application logic</li>
          <li>user interface</li>
        </ul>
      </section>
    </div>
  </>
);

export default Slide5;
