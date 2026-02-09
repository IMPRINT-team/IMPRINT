import divider from "../../../assets/playground/divider.svg";
import image from "../../../assets/playground/image.svg";
import vector1 from "../../../assets/playground/vector-1.svg";
import vector3 from "../../../assets/playground/vector-3.svg";
import EventItem from "./components/EventItem";
import ScannerItem from "./components/ScannerItem";
import React from "react"

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
    <div
      className="overflow-hidden w-full min-w-[1440px] min-h-[1024px] relative"
      style={{
        backgroundColor: "oklch(var(--b3))",
        color: "oklch(var(--bc))",
      }}
    >
      <section
        className="absolute top-[752px] left-[5px] w-[997px] h-[266px] rounded-lg border-2 border-solid"
        style={{
          borderColor: "oklch(var(--p) / 0.45)",
          backgroundImage:
            "linear-gradient(to bottom right, oklch(var(--b2)), oklch(var(--b3)))",
        }}
        aria-label="Bottom panel"
      />

      <header className="absolute top-0 left-0 w-[1440px] h-[88px]">
        <div
          className="absolute -top-0.5 -left-0.5 w-[1444px] h-[92px] rounded-sm border-2 border-solid"
          style={{
            borderColor: "oklch(var(--p) / 0.45)",
            backgroundImage:
              "linear-gradient(to bottom, oklch(var(--b2)), oklch(var(--b1)))",
          }}
        />

        <div
          className="absolute top-[11px] left-3.5 w-[66px] h-[66px] rounded-[33px]"
          style={{ backgroundColor: "oklch(var(--p) / 0.45)" }}
          role="img"
          aria-label="Logo"
        />
      </header>

      <main
        className="absolute top-[94px] left-[5px] w-[997px] h-[652px] flex items-center justify-center rounded-lg border-2 border-solid"
        style={{
          borderColor: "oklch(var(--p) / 0.45)",
          backgroundImage:
            "linear-gradient(to bottom right, oklch(var(--b2)), oklch(var(--b3)))",
        }}
        aria-label="Main display area"
      >
        <div
          className="mt-2 h-[461px] ml-px w-[461px] rounded-[230.5px] border-[15px] border-solid opacity-60"
          style={{ borderColor: "oklch(var(--b3))" }}
          role="presentation"
        />
      </main>

      <section
        className="absolute top-[752px] left-[1008px] w-[429px] h-[292px]"
        aria-labelledby="events-heading"
      >
        <div
          className="absolute top-px left-0 w-[427px] h-[292px] rounded-lg border-2 border-solid"
          style={{
            backgroundColor: "oklch(var(--b2))",
            borderColor: "oklch(var(--p) / 0.45)",
          }}
        />

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
          className="absolute top-[93px] left-[3px] w-[422px] h-[179px]"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, oklch(var(--b2) / 0), oklch(var(--b3)))",
          }}
          role="presentation"
        />

        <h2
          id="events-heading"
          className="absolute top-[15px] left-[15px] w-[100px] h-[27px] flex items-center justify-center [font-family:'JetBrains_Mono-Bold',Helvetica] font-bold text-xl text-center tracking-[0] leading-[normal]"
          style={{ color: "oklch(var(--bc))" }}
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
        <div
          className="absolute top-0 left-0 w-[427px] h-[652px] rounded-lg border-2 border-solid"
          style={{
            borderColor: "oklch(var(--p) / 0.45)",
            backgroundImage:
              "linear-gradient(to bottom right, oklch(var(--b2)), oklch(var(--b3)))",
          }}
        />

        {scanners.map((scanner, index) => (
          <ScannerItem key={scanner.id} scanner={scanner} index={index} />
        ))}

        <h2
          id="scanners-heading"
          className="absolute top-[15px] left-[17px] w-[100px] h-[27px] flex items-center justify-center [font-family:'JetBrains_Mono-Bold',Helvetica] font-bold text-xl text-center tracking-[0] leading-[normal]"
          style={{ color: "oklch(var(--bc))" }}
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
