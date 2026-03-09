import React from "react";

const Slide8 = () => (
  <>
    <h2 className="slide-outline-title">Frontend</h2>
    <div className="slide-outline-grid">
      <section className="slide-outline-section">
        <h3>Web Dashboard</h3>
        <p className="slide-outline-label">Questions</p>
        <ul>
          <li>What framework powers the frontend?</li>
          <li>How does the dashboard communicate with the backend?</li>
          <li>How frequently does the UI update?</li>
        </ul>
      </section>
      <section className="slide-outline-section">
        <h3>Pages</h3>
        <p className="slide-outline-label">Questions</p>
        <ul>
          <li>What pages currently exist in the dashboard?</li>
          <li>What information does the main dashboard show?</li>
          <li>How are devices managed in the interface?</li>
          <li>How are events visualized?</li>
        </ul>
      </section>
      <section className="slide-outline-section slide-outline-section-wide">
        <h3>Frontend Functionality</h3>
        <p className="slide-outline-label">Questions</p>
        <ul>
          <li>How are device health and connectivity displayed?</li>
          <li>How are scan events presented to users?</li>
          <li>What administrative controls exist?</li>
          <li>What features are planned but not yet implemented?</li>
        </ul>
      </section>
    </div>
  </>
);

export default Slide8;
