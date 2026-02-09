import React from "react"
import PropTypes from "prop-types"


const ImprintLogo = ({ width, height, className = "", ...props }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 200 200"
    fill="none"
    className={className}
    aria-hidden="true"
    data-debug-label="ImprintLogo"
    {...props}
  >
    <path
      d="M100 5 C115 5, 125 15, 135 20 C150 25, 160 35, 170 45 C180 55, 185 70, 190 85 C195 100, 190 115, 185 130 C180 145, 170 155, 160 165 C150 175, 135 185, 120 190 C105 195, 90 190, 75 185 C60 180, 45 170, 35 160 C25 150, 15 135, 10 120 C5 105, 10 90, 15 75 C20 60, 30 45, 45 35 C60 25, 75 15, 90 10 C95 5, 100 5, 100 5 Z"
      stroke="currentColor"
      strokeWidth="4"
    />
    <circle
      cx="100"
      cy="100"
      r="80"
      stroke="currentColor"
      strokeWidth="1"
      strokeDasharray="4 2"
    />
    <path
      id="textPath"
      d="M 100, 100 m -60, 0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0"
      fill="none"
    />
    <text
      fill="currentColor"
      fontSize="10"
      fontFamily="monospace"
      letterSpacing="3"
    >
      <textPath href="#textPath" startOffset="0%">
        101001110 110110 101010 11001010 10101010
      </textPath>
    </text>
    <rect x="94" y="65" width="12" height="70" fill="currentColor" />
    <rect x="88" y="65" width="24" height="6" fill="currentColor" />
    <rect x="88" y="129" width="24" height="6" fill="currentColor" />
    <path
      d="M 75 80 Q 65 100 75 120"
      stroke="currentColor"
      strokeWidth="3"
      fill="none"
    />
    <path
      d="M 125 80 Q 135 100 125 120"
      stroke="currentColor"
      strokeWidth="3"
      fill="none"
    />
  </svg>
)

ImprintLogo.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
}

export default ImprintLogo
