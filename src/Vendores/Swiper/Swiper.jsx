import "./Swiper.css";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";

import { Children, useState, useEffect } from "react";
export default function Swiper({
  children,
  autoSlide = false,
  slideTime = 3000,
}) {
  const childrenCount = Children.count(children);
  const [slide, setSlide] = useState(0);

  // Bullets
  let bullets = [];

  if (childrenCount > 1) {
    for (let i = 0; i < childrenCount; i++) {
      bullets.push(
        <span
          key={i}
          className={`bullet ${slide == i ? "active" : ""}`}
          onClick={() => {
            setSlide(i);
          }}></span>
      );
    }
  }

  useEffect(() => {
    if (autoSlide) {
      // Auto Slide >>
      const intervalId = setInterval(() => {
        if (slide === childrenCount - 1) {
          setSlide(0);
        } else {
          setSlide((prevCount) => prevCount + 1);
        }
      }, slideTime);

      // Cleanup the interval when component unmounts
      return () => clearInterval(intervalId);
    }
  }, [slide, autoSlide]);

  // Handle slide Fn >>
  const slideRight = () => {
    if (slide < childrenCount - 1) {
      setSlide(slide + 1);
    }
  };
  const slideLeft = () => {
    if (slide > 0) {
      setSlide(slide - 1);
    }
  };
  return (
    <div className="swiper">
      {/* Images Wrapper */}
      <div className="swiper-wrapper">
        {/* Bullets */}

        {childrenCount > 1 ? (
          <div className="bullets-warpper">
            {bullets.map((span) => {
              return span;
            })}
          </div>
        ) : (
          <></>
        )}

        <div className="images-wrapper" style={{ marginLeft: `-${slide}00%` }}>
          {children}
        </div>
      </div>

      {/* Indecators */}
      {childrenCount > 1 ? (
        <div className="indecators">
          <span
            onClick={() => {
              slideRight();
            }}
            className="right">
            <IconButton aria-label="slide right">
              <ArrowForwardIcon />
            </IconButton>
          </span>
          <span
            onClick={() => {
              slideLeft();
            }}
            className="left">
            <IconButton aria-label="slide left">
              <ArrowBackIcon />
            </IconButton>
          </span>
        </div>
      ) : (
        <></>
      )}
      {/*  */}
      {/*  */}
    </div>
  );
}
