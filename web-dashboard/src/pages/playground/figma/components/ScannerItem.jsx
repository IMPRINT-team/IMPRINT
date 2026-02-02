const ScannerItem = ({ scanner }) => {
  return (
    <article className="absolute top-[73px] left-[19px] w-[412px] h-[30px]">
      <img
        className="absolute top-6 left-[121px] w-[285px] h-[3px]"
        alt=""
        src={scanner.image}
        role="presentation"
      />

      <div
        className="absolute top-0.5 left-0 w-[113px] h-7 bg-cyan-500 rounded-[13px] border-2 border-solid"
        role="status"
        aria-label={`Scanner ${scanner.name} active`}
      />

      <div className="absolute top-0 left-[104px] w-[188px] h-[26px] flex items-center justify-center [font-family:'JetBrains_Mono-Bold',Helvetica] font-bold text-white text-[26px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
        {scanner.name}
      </div>

      <time
        className="absolute top-0.5 left-[287px] w-[121px] h-7 flex items-center justify-center [font-family:'JetBrains_Mono-Bold',Helvetica] font-bold text-[#06b6d48c] text-xl text-center tracking-[0] leading-[normal]"
        dateTime={scanner.time}
      >
        {scanner.time}
      </time>
    </article>
  );
};

export default ScannerItem;
