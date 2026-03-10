import React, { useEffect, useRef } from "react";
import {
  ClipboardList,
  MemoryStick,
  PanelLeftOpen,
  ShieldCheck,
  TestTubeDiagonal,
  Users,
} from "lucide-react";
import Slide from "./Slide.jsx";
import Slide1 from "./slides/slide1/Slide1.jsx";
import Slide2BulletSection from "./slides/slide2/Slide2BulletSection.jsx";
import Slide5 from "./slides/slide5/Slide5.jsx";
import Slide6 from "./slides/slide6/Slide6.jsx";
import Slide7 from "./slides/slide7/Slide7.jsx";
import Slide8 from "./slides/slide8/Slide8.jsx";
import Slide9 from "./slides/slide9/Slide9.jsx";
import "./PresentationPage.css";

const PresentationPage = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    const onArrowNavigate = (event) => {
      const isArrowKey = event.key === "ArrowRight" || event.key === "ArrowLeft";
      const isFullscreenKey = event.key.toLowerCase() === "f";

      if (!isArrowKey && !isFullscreenKey) {
        return;
      }

      if (event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }

      const active = document.activeElement;
      const isTypingTarget =
        active &&
        (active.tagName === "INPUT" ||
          active.tagName === "TEXTAREA" ||
          active.tagName === "SELECT" ||
          active.isContentEditable);

      if (isTypingTarget) {
        return;
      }

      if (isFullscreenKey) {
        event.preventDefault();

        const fullscreenRoot = pageRef.current;
        if (!fullscreenRoot) {
          return;
        }

        if (document.fullscreenElement) {
          void document.exitFullscreen();
        } else {
          void fullscreenRoot.requestFullscreen();
        }
        return;
      }

      const container = pageRef.current;
      if (!container) {
        return;
      }

      const frames = Array.from(container.querySelectorAll(".slide-frame"));
      if (frames.length < 2) {
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const viewportCenter = containerRect.top + container.clientHeight / 2;

      let centeredIndex = 0;
      let minDistance = Number.POSITIVE_INFINITY;

      frames.forEach((frame, index) => {
        const rect = frame.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const distance = Math.abs(center - viewportCenter);
        if (distance < minDistance) {
          minDistance = distance;
          centeredIndex = index;
        }
      });

      const direction = event.key === "ArrowRight" ? 1 : -1;
      const targetIndex = centeredIndex + direction;

      if (targetIndex < 0 || targetIndex >= frames.length) {
        return;
      }

      event.preventDefault();

      const target = frames[targetIndex];
      const targetRect = target.getBoundingClientRect();
      const targetCenterInScrollSpace =
        targetRect.top - containerRect.top + container.scrollTop + targetRect.height / 2;
      const top = Math.max(0, targetCenterInScrollSpace - container.clientHeight / 2);

      container.scrollTo({ top, behavior: "smooth" });
    };

    window.addEventListener("keydown", onArrowNavigate);
    return () => window.removeEventListener("keydown", onArrowNavigate);
  }, []);

  return (
    <main ref={pageRef} className="presentation-page">
      <div className="slides-column">
        <Slide label="Slide 1: Title" contentClassName="parent">
          <Slide1 />
        </Slide>

        <Slide label="Slide 2: Current Challenges" contentClassName="slide2-single-parent">
          <Slide2BulletSection
            sectionTitle="Current challenges"
            bullets={[
              "manual sign-in sheets",
              "disconnected software systems",
              "inconsistent record keeping",
              "slow handoffs before work can even begin",
            ]}
            icons={[ClipboardList, PanelLeftOpen, MemoryStick, ShieldCheck]}
          />
        </Slide>

        <Slide label="Slide 3: Core Model" contentClassName="slide2-single-parent">
          <Slide2BulletSection
            sectionTitle="Core model"
            bullets={[
              "Treat RFID taps as intentional interaction events",
              "Each scan records: who + what device",
              "Each scan records: where + when",
              "Each scan records: what interaction",
            ]}
            icons={[MemoryStick, Users, PanelLeftOpen, TestTubeDiagonal]}
          />
        </Slide>

        <Slide label="Slide 4: What This Enables" contentClassName="slide2-single-parent">
          <Slide2BulletSection
            sectionTitle="What this enables"
            bullets={[
              "volunteers can check in and go straight to work",
              "equipment checkout is fast and traceable",
              "attendance and access events are logged in real time",
              "teams get automation-ready event history",
            ]}
            icons={[Users, ClipboardList, PanelLeftOpen, ShieldCheck]}
          />
        </Slide>

        <Slide label="Slide 5: Value" contentClassName="slide2-single-parent">
          <Slide2BulletSection
            sectionTitle="Value at the end of the day"
            bullets={[
              "less admin overhead",
              "faster starts for people on the ground",
              "higher trust in operational records",
              "better decisions from clean interaction data",
            ]}
            icons={[ClipboardList, Users, ShieldCheck, TestTubeDiagonal]}
          />
        </Slide>

        <Slide label="Slide 6: System Overview" contentClassName="slide-outline">
          <Slide5 />
        </Slide>

        <Slide label="Slide 7: Scanner Layer" contentClassName="slide-outline">
          <Slide6 />
        </Slide>

        <Slide label="Slide 8: Backend Architecture" contentClassName="slide-outline">
          <Slide7 />
        </Slide>

        <Slide label="Slide 9: Frontend" contentClassName="slide-outline">
          <Slide8 />
        </Slide>

        <Slide label="Slide 10: Challenges" contentClassName="slide-outline">
          <Slide9 />
        </Slide>
      </div>
    </main>
  );
};

export default PresentationPage;
