/* Swiper.tsx */
import { useEffect, useRef } from 'react';
import useLayerSwiper from 'hooks/useLayerSwiper';
import { Map } from 'ol';
import { Layer } from 'ol/layer';
import styles from './Swiper.module.scss';

type Props = {
  sidePanelRef: React.RefObject<HTMLDivElement>;
  mapRef: React.RefObject<Map>;
  beforeTileLayerRef: React.RefObject<Layer>;
  isOpenPanel: boolean;
};

export default function Swiper({
  sidePanelRef,
  mapRef,
  beforeTileLayerRef,
  isOpenPanel,
}: Props) {
  const swipeRef = useRef<HTMLInputElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const thumbRef = useRef<HTMLDivElement | null>(null);

  // 기존 swipe hook 적용
  useLayerSwiper({
    sidePanelRef,
    mapRef,
    swipeRef,
    beforeTileLayerRef,
    isOpenPanel,
  });

  useEffect(() => {
    const updateSlider = () => {
      if (
        swipeRef.current &&
        thumbRef.current &&
        trackRef.current &&
        mapRef.current
      ) {
        // 슬라이더 값에 따른 visibleWidth 계산
        const sliderValue = Number(swipeRef.current.value);
        const mapSize = mapRef.current.getSize();
        const mapWidth = mapSize ? mapSize[0] : 0;
        const visibleWidth = mapWidth * (sliderValue / 100);

        // 위치 업데이트
        thumbRef.current.style.left = `${visibleWidth}px`;
        trackRef.current.style.left = `${visibleWidth}px`;
      }
    };

    // 컴포넌트 마운트 시 및 이벤트 발생 시 업데이트
    updateSlider();
    swipeRef.current?.addEventListener('input', updateSlider);
    window.addEventListener('resize', updateSlider);

    return () => {
      swipeRef.current?.removeEventListener('input', updateSlider);
      window.removeEventListener('resize', updateSlider);
    };
  }, [mapRef, beforeTileLayerRef]);

  return (
    <div className={styles.swiper}>
      {/* 배경 track line */}
      <div ref={trackRef} className={styles.trackLine} />
      {/* 커스텀 thumb */}
      <div ref={thumbRef} className={styles.thumb} />

      {/* 기본 range input  */}
      <input
        className={styles.range__input}
        ref={swipeRef}
        id='swipe'
        type='range'
        min='0'
        max='100'
        defaultValue='50'
      />
    </div>
  );
}
