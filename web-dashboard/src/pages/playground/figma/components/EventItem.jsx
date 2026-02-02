const EventItem = ({ event }) => {
  return (
    <div className="absolute top-[67px] left-4 w-[390px] h-4 flex">
      <div
        className="w-4 h-4 bg-cyan-500 rounded-[13px] border-2 border-solid"
        role="status"
        aria-label="Active indicator"
      />

      <div className="flex items-center justify-center w-32 h-[15px] [font-family:'JetBrains_Mono-Bold',Helvetica] font-bold text-white text-lg text-center tracking-[0] leading-[normal] whitespace-nowrap">
        {event.name}
      </div>

      <div className="flex items-center justify-center w-[242px] h-[15px] [font-family:'JetBrains_Mono-Bold',Helvetica] font-bold text-[#06b6d48c] text-lg text-center tracking-[0] leading-[normal] whitespace-nowrap">
        {event.uuid}
      </div>
    </div>
  );
};

export default EventItem;
