const EventItem = ({ event, index }) => {
  const topOffset = 67 + index * 24;

  return (
    <div
      className="absolute left-4 w-[390px] h-4 flex"
      style={{ top: `${topOffset}px` }}
    >
      <div
        className="w-4 h-4 rounded-[13px] border-2 border-solid"
        style={{
          backgroundColor: "oklch(var(--s))",
          borderColor: "oklch(var(--s-content) / 0.35)",
        }}
        role="status"
        aria-label="Active indicator"
      />

      <div
        className="flex items-center justify-center w-32 h-[15px] [font-family:'JetBrains_Mono-Bold',Helvetica] font-bold text-lg text-center tracking-[0] leading-[normal] whitespace-nowrap"
        style={{ color: "oklch(var(--bc))" }}
      >
        {event.name}
      </div>

      <div
        className="flex items-center justify-center w-[242px] h-[15px] [font-family:'JetBrains_Mono-Bold',Helvetica] font-bold text-lg text-center tracking-[0] leading-[normal] whitespace-nowrap"
        style={{ color: "oklch(var(--bc) / 0.55)" }}
      >
        {event.uuid}
      </div>
    </div>
  );
};

export default EventItem;
