import React from "react";
import Slide from "./Slide.jsx";
import Slide1 from "./slides/slide1/Slide1.jsx";
import Slide2 from "./slides/slide2/Slide2.jsx";
import Slide3 from "./slides/slide3/Slide3.jsx";
import Slide4 from "./slides/slide4/Slide4.jsx";
import Slide5 from "./slides/slide5/Slide5.jsx";
import Slide6 from "./slides/slide6/Slide6.jsx";
import Slide7 from "./slides/slide7/Slide7.jsx";
import Slide8 from "./slides/slide8/Slide8.jsx";
import Slide9 from "./slides/slide9/Slide9.jsx";
import "./PresentationPage.css";

const PresentationPage = () => {
  return (
    <main className="presentation-page">
      <div className="slides-column">
        <Slide label="Slide 1: Title" contentClassName="parent">
          <Slide1 />
        </Slide>

        <Slide label="Slide 2: Inputs" contentClassName="slide-two-parent">
          <Slide2 />
        </Slide>

        <Slide label="Slide 3: Use Cases" contentClassName="slide-two-parent">
          <Slide3 />
        </Slide>

        <Slide label="Slide 4: Use Cases" contentClassName="slide-outline">
          <Slide4 />
        </Slide>

        <Slide label="Slide 5: System Overview" contentClassName="slide-outline">
          <Slide5 />
        </Slide>

        <Slide label="Slide 6: Scanner Layer" contentClassName="slide-outline">
          <Slide6 />
        </Slide>

        <Slide label="Slide 7: Backend Architecture" contentClassName="slide-outline">
          <Slide7 />
        </Slide>

        <Slide label="Slide 8: Frontend" contentClassName="slide-outline">
          <Slide8 />
        </Slide>

        <Slide label="Slide 9: Challenges" contentClassName="slide-outline">
          <Slide9 />
        </Slide>
      </div>
    </main>
  );
};

export default PresentationPage;
