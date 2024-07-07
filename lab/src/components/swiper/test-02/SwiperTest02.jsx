import React from "react";
import styles from "./SwiperTest02.module.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

export default function SwiperTest02() {
  return (
    <Swiper
      className={styles.container}
      spaceBetween={50}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      modules={[Pagination]}
      pagination={{ clickable: true }}
    >
      {Array.from({ length: TOTAL_SLIDES }).map((slide) => (
        <SwiperSlide className={styles.slides}>
          <div className={styles.items}>
            {ITEMS.map((item) => (
              <div key={item.id} className={styles.item}>
                {item.value}
              </div>
            ))}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

const TOTAL_ITEMS = 80;

const ITEMS_PER_SLIDE = 12;

const TOTAL_SLIDES = Math.floor(TOTAL_ITEMS / ITEMS_PER_SLIDE);

const ITEMS = Array.from({ length: ITEMS_PER_SLIDE }).map((slide, idx) => ({
  id: idx,
  value: `아이템 ${idx + 1}`,
}));
