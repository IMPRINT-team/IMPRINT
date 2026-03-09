import React from "react";

const Slide7 = () => (
  <>
    <h2 className="slide-outline-title">Backend Architecture</h2>
    <div className="slide-outline-grid">
      <section className="slide-outline-section">
        <h3>Backend Layer</h3>
        <p className="slide-outline-label">Questions</p>
        <ul>
          <li>What server framework powers the backend?</li>
          <li>How are scan events ingested?</li>
          <li>What data model represents an interaction event?</li>
        </ul>
      </section>
      <section className="slide-outline-section">
        <h3>Data Management</h3>
        <p className="slide-outline-label">Questions</p>
        <ul>
          <li>What database stores scan events?</li>
          <li>How are devices and credentials represented?</li>
          <li>How is event history stored and queried?</li>
        </ul>
      </section>
      <section className="slide-outline-section">
        <h3>API Design</h3>
        <p className="slide-outline-label">Questions</p>
        <ul>
          <li>What endpoints do scanners call?</li>
          <li>How does the dashboard retrieve data?</li>
          <li>How can new systems integrate with the platform?</li>
        </ul>
      </section>
      <section className="slide-outline-section">
        <h3>Extensibility</h3>
        <p className="slide-outline-label">Questions</p>
        <ul>
          <li>What types of systems could consume scan events?</li>
          <li>How could external services subscribe to events?</li>
          <li>What future integrations might be supported?</li>
        </ul>
      </section>
    </div>
  </>
);

export default Slide7;
