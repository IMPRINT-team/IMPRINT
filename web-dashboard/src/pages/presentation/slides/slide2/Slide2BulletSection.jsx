import React from "react";
import PropTypes from "prop-types";
import { ClipboardList } from "lucide-react";

const rowClasses = [
  "s2-single-div2",
  "s2-single-div3",
  "s2-single-div4",
  "s2-single-div5",
];

const Slide2BulletSection = ({ sectionTitle, bullets, icons }) => {
  return (
    <>
      <div className="s2-single-div1">
        <h2 className="s2-title">{sectionTitle}</h2>
      </div>

      {bullets.map((item, index) => {
        const Icon = icons[index] || ClipboardList;

        return (
          <div key={`${sectionTitle}-${index}`} className={`${rowClasses[index]} s2-grid-text-row`}>
            <Icon className="s2-bullet-icon" aria-hidden="true" />
            <p className="s2-grid-text">{item}</p>
          </div>
        );
      })}
    </>
  );
};

Slide2BulletSection.propTypes = {
  sectionTitle: PropTypes.string.isRequired,
  bullets: PropTypes.arrayOf(PropTypes.string).isRequired,
  icons: PropTypes.arrayOf(PropTypes.elementType),
};

Slide2BulletSection.defaultProps = {
  icons: [],
};

export default Slide2BulletSection;
