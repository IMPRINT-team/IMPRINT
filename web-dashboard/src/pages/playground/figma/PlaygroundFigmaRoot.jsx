import divider from "../../../assets/playground/divider.svg";
import image from "../../../assets/playground/image.svg";
import vector1 from "../../../assets/playground/vector-1.svg";
import vector3 from "../../../assets/playground/vector-3.svg";
import EventItem from "./components/EventItem";
import ScannerItem from "./components/ScannerItem";

const PlaygroundFigmaRoot = () => {
  const scanners = [
    {
      id: "scanner-1",
      name: "NORTH GATE",
      time: "00:00:01",
      active: true,
      image,
    },
  ];

  const events = [
    {
      id: "event-1",
      name: "NORTH GATE",
      uuid: "UUID: 1123-123456-34",
    },
  ];

  return (
    <div className="bg-base-300 overflow-hidden w-full min-w-[1440px] min-h-[1024px] relative text-base-content">
      <section
        className="absolute top-[752px] left-[5px] w-[997px] h-[266px] rounded-lg border-2 border-solid border-primary/45 bg-gradient-to-br from-base-200 to-base-300"
        aria-label="Bottom panel"
      />

      <header className="absolute top-0 left-0 w-[1440px] h-[88px]">
        <div className="absolute -top-0.5 -left-0.5 w-[1444px] h-[92px] rounded-sm border-2 border-solid border-primary/45 bg-gradient-to-b from-base-200 to-base-100" />

        <div
          className="absolute top-[11px] left-3.5 w-[66px] h-[66px] bg-primary/45 rounded-[33px]"
          role="img"
          aria-label="Logo"
        />
      </header>

      <main
        className="absolute top-[94px] left-[5px] w-[997px] h-[652px] flex items-center justify-center rounded-lg border-2 border-solid border-primary/45 bg-gradient-to-br from-base-200 to-base-300"
        aria-label="Main display area"
      >
        <div
          className="mt-2 h-[461px] ml-px w-[461px] rounded-[230.5px] border-[15px] border-solid border-base-300 opacity-60"
          role="presentation"
        />
      </main>

      <section
        className="absolute top-[752px] left-[1008px] w-[429px] h-[292px]"
        aria-labelledby="events-heading"
      >
        <div className="absolute top-px left-0 w-[427px] h-[292px] bg-base-200 rounded-lg border-2 border-solid border-primary/45" />

        {events.map((event, index) => (
          <EventItem key={event.id} event={event} index={index} />
        ))}

        <img
          className="absolute top-[82px] left-[43px] w-[359px] h-0.5"
          alt=""
          src={divider}
          role="presentation"
        />

        <div
          className="absolute top-[93px] left-[3px] w-[422px] h-[179px] bg-gradient-to-b from-base-200/0 to-base-300"
          role="presentation"
        />

        <h2
          id="events-heading"
          className="absolute top-[15px] left-[15px] w-[100px] h-[27px] flex items-center justify-center [font-family:'JetBrains_Mono-Bold',Helvetica] font-bold text-base-content text-xl text-center tracking-[0] leading-[normal]"
        >
          EVENTS
        </h2>

        <img
          className="top-[35px] left-[125px] h-0.5 absolute w-52"
          alt=""
          src={vector3}
          role="presentation"
        />
      </section>

      <section
        className="absolute top-[94px] left-[1008px] w-[429px] h-[652px]"
        aria-labelledby="scanners-heading"
      >
        <div className="absolute top-0 left-0 w-[427px] h-[652px] rounded-lg border-2 border-solid border-primary/45 bg-gradient-to-br from-base-200 to-base-300" />

        {scanners.map((scanner, index) => (
          <ScannerItem key={scanner.id} scanner={scanner} index={index} />
        ))}

        <h2
          id="scanners-heading"
          className="absolute top-[15px] left-[17px] w-[100px] h-[27px] flex items-center justify-center [font-family:'JetBrains_Mono-Bold',Helvetica] font-bold text-base-content text-xl text-center tracking-[0] leading-[normal]"
        >
          SCANNERS
        </h2>

        <img
          className="top-[34px] left-[140px] h-[3px] absolute w-52"
          alt=""
          src={vector1}
          role="presentation"
        />
      </section>
    </div>
  );
};

export default PlaygroundFigmaRoot;
