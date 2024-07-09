/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { floors } from "../../data/floors";
import { Floor } from "../../types/floor.type";
import styles from "./SimpleSlider.module.scss";
import SliderDownArrow from "./SliderDownArrow";
import SliderUpArrow from "./SliderUpArrow";

export default function SimpleSlider() {
  const [currentFloor, setCurrentFloor] = useState<Floor>(floors[6]);
  const [mainSlide, setMainSlide] = useState<Slider | null>(null);

  const settings: Settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    // focusOnSelect: true, // 첫번쨰로 옴
    // rtl: true, // 데이터가 바뀜
    vertical: true,
    // verticalSwiping: true,
    // swipeToSlide: true,

    prevArrow: <SliderUpArrow className="prev" />,
    nextArrow: <SliderDownArrow />,

    beforeChange: function (currentSlide: any, nextSlide: any) {
      console.log("before change", currentSlide, nextSlide);
    },
    afterChange: function (currentSlide: any) {
      console.log("after change", currentSlide);
    },
  };

  const onClickFloor = (floor: Floor) => {
    setCurrentFloor(floor);
  };

  // 위로
  const onClickUp = () => {
    if (mainSlide) {
      mainSlide.slickPrev();
    }
  };

  // 아래로
  const onClickDown = () => {
    if (mainSlide) {
      mainSlide?.slickNext();
    }
  };

  return (
    <div className={styles.wrapper}>
      <button className="button" onClick={onClickUp}>
        위층
      </button>
      <Slider ref={(slider) => setMainSlide(slider)} {...settings}>
        {floors.map((floor: Floor) => (
          <div
            key={floor.id}
            className={`${styles.floor} ${
              floor.id === currentFloor.id && styles.active
            }`}
            onClick={() => {
              onClickFloor(floor);
            }}
          >
            {floor.text}
          </div>
        ))}
      </Slider>

      {/* 버튼 */}
      <div style={{ textAlign: "center" }}>
        <button className="button" onClick={onClickDown}>
          아래층
        </button>
      </div>
    </div>
  );
}
