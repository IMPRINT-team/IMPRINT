import React from "react"
import PropTypes from "prop-types"

const ScannerItem = ({ scanner, index }) => {
  const topOffset = 73 + index * 40;

  return (
    <article
      className="absolute left-[19px] w-[412px] h-[30px]"
      style={{ top: `${topOffset}px` }}
    >
      <img
        className="absolute top-6 left-[121px] w-[285px] h-[3px]"
        alt=""
        src={scanner.image}
        role="presentation"
      />

      <div
        className="absolute top-0.5 left-0 w-[113px] h-7 rounded-[13px] border-2 border-solid"
        style={{
          backgroundColor: "oklch(var(--s))",
          borderColor: "oklch(var(--s-content) / 0.35)",
        }}
        role="status"
        aria-label={`Scanner ${scanner.name} active`}
      />

      <div
        className="absolute top-0 left-[104px] w-[188px] h-[26px] flex items-center justify-center [font-family:'JetBrains_Mono-Bold',Helvetica] font-bold text-[26px] text-center tracking-[0] leading-[normal] whitespace-nowrap"
        style={{ color: "oklch(var(--bc))" }}
      >
        {scanner.name}
      </div>

      <time
        className="absolute top-0.5 left-[287px] w-[121px] h-7 flex items-center justify-center [font-family:'JetBrains_Mono-Bold',Helvetica] font-bold text-xl text-center tracking-[0] leading-[normal]"
        style={{ color: "oklch(var(--bc) / 0.55)" }}
        dateTime={scanner.time}
      >
        {scanner.time}
      </time>
    </article>
  );
};

ScannerItem.propTypes = {
  scanner: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default ScannerItem;
