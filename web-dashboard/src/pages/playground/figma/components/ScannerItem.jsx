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
        className="absolute top-0.5 left-0 w-[113px] h-7 bg-secondary rounded-[13px] border-2 border-solid border-secondary-content/35"
        role="status"
        aria-label={`Scanner ${scanner.name} active`}
      />

      <div className="absolute top-0 left-[104px] w-[188px] h-[26px] flex items-center justify-center [font-family:'JetBrains_Mono-Bold',Helvetica] font-bold text-base-content text-[26px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
        {scanner.name}
      </div>

      <time
        className="absolute top-0.5 left-[287px] w-[121px] h-7 flex items-center justify-center [font-family:'JetBrains_Mono-Bold',Helvetica] font-bold text-base-content/55 text-xl text-center tracking-[0] leading-[normal]"
        dateTime={scanner.time}
      >
        {scanner.time}
      </time>
    </article>
  );
};

export default ScannerItem;
