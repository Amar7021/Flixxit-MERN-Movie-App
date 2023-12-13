import { useRef, useState } from "react";
import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@mui/icons-material";
import Card from "../card/Card";
import "./cardSlider.scss";

const CardSlider = ({ data, title }) => {
  const [sliderPosition, setSliderPosition] = useState(0);
  const [showControls, setShowControls] = useState(false);

  const listRef = useRef();

  const handleDirection = direction => {
    let distance = listRef.current.getBoundingClientRect().x - 50;
    if (direction === "left" && sliderPosition > 0) {
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
      setSliderPosition(sliderPosition - 1);
    }
    if (direction === "right" && sliderPosition < 4) {
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
      setSliderPosition(sliderPosition + 1);
    }
  };

  return (
    <div
      className="cardSlider"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <span className="cardTitle">{title}</span>
      <div className="wrapper">
        <div className={`slider-action left ${!showControls ? "none" : ""}`}>
          <ArrowBackIosOutlined
            className="sliderArrow left"
            onClick={() => handleDirection("left")}
          />
        </div>
        <div className="slider" ref={listRef}>
          {data.map((movie, index) => {
            return <Card movie={movie} index={index} key={movie.id} />;
          })}
        </div>
        <div className={`slider-action right ${!showControls ? "none" : ""}`}>
          <ArrowForwardIosOutlined
            className="sliderArrow right"
            onClick={() => handleDirection("right")}
          />
        </div>
      </div>
    </div>
  );
};

export default CardSlider;
