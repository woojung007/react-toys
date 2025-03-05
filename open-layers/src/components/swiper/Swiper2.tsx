import React, { useRef, useState } from 'react';
import styles from './Swiper2.module.scss';

export default function MapSliderExample() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderValue, setSliderValue] = useState(50); // 초기값 50

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue(Number(e.target.value));
  };

  const handleLeft = getRangeHandlePosition(containerRef, sliderValue);

  console.log(handleLeft);

  return (
    <div ref={containerRef} className={styles.swiper}>
      {/* range input */}
      <input
        type='range'
        min='0'
        max='100'
        value={sliderValue}
        onChange={handleSliderChange}
        style={{
          position: 'absolute',
          bottom: '20px',
          width: '100%',
          right: '0',
        }}
      />

      {/* 배경 track line */}
      <div className={styles.trackLine} />

      {/* 핸들 위치 표시용 div */}
      <div
        className={styles.thumb}
        style={{
          // top: '10px',
          left: handleLeft ? `${handleLeft}px` : `50%`,
          transform: handleLeft
            ? 'translate(0, -50%)'
            : 'translate(-50%, -50%)',
        }}
      />
    </div>
  );
}

/**
 * 지도 컨테이너 내에서 range 핸들의 left 위치(픽셀)를 계산합니다.
 * @param containerRef - 지도 컨테이너의 Ref (HTMLDivElement)
 * @param sliderValue - range input의 값 (0 ~ 100)
 * @returns 핸들이 위치해야 할 left (픽셀)
 */
function getRangeHandlePosition(
  containerRef: React.RefObject<HTMLDivElement>,
  sliderValue: number
): number {
  if (!containerRef.current) return 0;
  const containerRect = containerRef.current.getBoundingClientRect();
  return containerRect.width * (sliderValue / 100);
}
