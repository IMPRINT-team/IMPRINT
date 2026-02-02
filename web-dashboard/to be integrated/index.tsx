import { useState } from "react";
import divider from "./divider.svg";
import image from "./image.svg";
import vector1 from "./vector-1.svg";
import vector3 from "./vector-3.svg";

interface Scanner {
  id: string;
  name: string;
  time: string;
  active: boolean;
}

interface Event {
  id: string;
  name: string;
  uuid: string;
}

export const Desktop = (): JSX.Element => {
  const [scanners] = useState<Scanner[]>([
    {
      id: "scanner-1",
      name: "NORTH GATE",
      time: "00:00:01",
      active: true,
    },
  ]);

  const [events] = useState<Event[]>([
    {
      id: "event-1",
      name: "NORTH GATE",
      uuid: "UUID: 1123-123456-34",
    },
  ]);

  return (
    <div className="bg-slate-900 overflow-hidden w-full min-w-[1440px] min-h-[1024px] relative">
      <section
        className="absolute top-[752px] left-[5px] w-[997px] h-[266px] rounded-lg border-2 border-solid border-cyan-900 [background:radial-gradient(50%_50%_at_50%_50%,rgba(30,41,59,1)_0%,rgba(15,23,42,1)_100%)]"
        aria-label="Bottom panel"
      />

      <header className="absolute top-0 left-0 w-[1440px] h-[88px]">
        <div className="absolute -top-0.5 -left-0.5 w-[1444px] h-[92px] rounded-sm border-2 border-solid border-cyan-900 bg-[linear-gradient(360deg,rgba(30,41,59,1)_0%,rgba(82,112,161,1)_100%)]" />

        <div
          className="absolute top-[11px] left-3.5 w-[66px] h-[66px] bg-cyan-900 rounded-[33px]"
          role="img"
          aria-label="Logo"
        />
      </header>

      <main
        className="absolute top-[94px] left-[5px] w-[997px] h-[652px] flex items-center justify-center rounded-lg border-2 border-solid border-cyan-900 [background:radial-gradient(50%_50%_at_50%_50%,rgba(30,41,59,1)_0%,rgba(15,23,42,1)_100%)]"
        aria-label="Main display area"
      >
        <div
          className="mt-2 h-[461px] ml-px w-[461px] rounded-[230.5px] border-[15px] border-solid border-slate-900 opacity-60"
          role="presentation"
        />
      </main>

      <section
        className="absolute top-[752px] left-[1008px] w-[429px] h-[292px]"
        aria-labelledby="events-heading"
      >
        <div className="absolute top-px left-0 w-[427px] h-[292px] bg-slate-800 rounded-lg border-2 border-solid border-cyan-900" />

        {events.map((event, index) => (
          <div
            key={event.id}
            className="absolute top-[67px] left-4 w-[390px] h-4 flex"
          >
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
        ))}

        <img
          className="absolute top-[82px] left-[43px] w-[359px] h-0.5"
          alt=""
          src={divider}
          role="presentation"
        />

        <div
          className="absolute top-[93px] left-[3px] w-[422px] h-[179px] bg-[linear-gradient(180deg,rgba(30,41,59,0)_0%,rgba(15,23,42,1)_100%)]"
          role="presentation"
        />

        <h2
          id="events-heading"
          className="absolute top-[15px] left-[15px] w-[100px] h-[27px] flex items-center justify-center [font-family:'JetBrains_Mono-Bold',Helvetica] font-bold text-white text-xl text-center tracking-[0] leading-[normal]"
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
        <div className="absolute top-0 left-0 w-[427px] h-[652px] rounded-lg border-2 border-solid border-cyan-900 [background:radial-gradient(50%_50%_at_50%_50%,rgba(30,41,59,1)_0%,rgba(15,23,42,1)_100%)]" />

        {scanners.map((scanner, index) => (
          <article
            key={scanner.id}
            className="absolute top-[73px] left-[19px] w-[412px] h-[30px]"
          >
            <img
              className="absolute top-6 left-[121px] w-[285px] h-[3px]"
              alt=""
              src={image}
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
        ))}

        <h2
          id="scanners-heading"
          className="absolute top-[15px] left-[17px] w-[100px] h-[27px] flex items-center justify-center [font-family:'JetBrains_Mono-Bold',Helvetica] font-bold text-white text-xl text-center tracking-[0] leading-[normal]"
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
