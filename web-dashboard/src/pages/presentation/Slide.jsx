import React from "react";
import PropTypes from "prop-types";
import ImprintLogoWatermark from "../../components/branding/ImprintLogoWatermark.jsx";

const Slide = ({ label, contentClassName = "", children }) => {
  const classes = ["slide-content", contentClassName].filter(Boolean).join(" ");

  return (
    <section className="slide-frame" aria-label={label}>
      <ImprintLogoWatermark />
      <div className={classes}>{children}</div>
    </section>
  );
};

Slide.propTypes = {
  label: PropTypes.string.isRequired,
  contentClassName: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Slide;
