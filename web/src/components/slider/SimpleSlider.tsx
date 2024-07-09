/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { floors } from "../../data/floors";
import { Floor } from "../../types/floor.type";
import styles from "./SimpleSlider.module.scss";
import SliderDownArrow from "./SliderDownArrow";
import SliderUpArrow from "./SliderUpArrow";

export default function SimpleSlider() {
  const [slide, setSlide] = useState<Floor[]>([]);
  const [currentFloor, setCurrentFloor] = useState<Floor>(floors[0]);
  const [mainSlide, setMainSlide] = useState<Slider | null>(null);
  const [activeSlide, setActiveSlide] = useState<number | undefined>();
  const [hasMoreUp, setHasMoreUp] = useState<number | undefined>();
  const [hasMoreDown, setHasMoreDown] = useState<number | undefined>();

  useEffect(() => {
    const reveredOrderedFloors = floors.map((floor, index) => ({
      ...floor,
      order: index,
    }));
    // .reverse();

    setSlide([...reveredOrderedFloors]);
    setCurrentFloor(reveredOrderedFloors[7]);
    // setActiveSlide((7 % 5) + 3); // <- 이렇게 하면 onChange 가 제대로 안먹음
    setActiveSlide(7);
  }, []);

  useEffect(() => {
    console.log(activeSlide);
  }, [activeSlide]);

  const settings: Settings = {
    arrows: false,
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
    // centerMode: true,
    // centerPadding: "10px",
    // initialSlide: 11,
    prevArrow: <SliderUpArrow />,
    nextArrow: <SliderDownArrow />,

    beforeChange: function (currentStartIndex: number, nextStartIndex: number) {
      console.log("before change", currentStartIndex, nextStartIndex);
    },

    afterChange: function (currentStartIndex: number) {
      console.log("after change", currentStartIndex);
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
      mainSlide.slickNext();
    }
  };

  return (
    <div className={styles.wrapper}>
      <button className="button" onClick={onClickUp}>
        위층
      </button>
      <Slider
        initialSlide={activeSlide} // 내부적으로 undefined 만 검사함
        ref={(slider) => setMainSlide(slider)}
        {...settings}
      >
        {slide.map((floor: Floor) => (
          <div
            key={floor.id}
            className={`${styles.floor} ${
              floor.id === currentFloor?.id && styles.active
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
