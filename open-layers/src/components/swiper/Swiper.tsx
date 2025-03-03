import { RefObject, useEffect, useRef } from 'react';
import styles from './Swiper.module.scss';
import useLayerSwiper from 'hooks/useLayerSwiper';
import { Map } from 'ol';
import { Layer } from 'ol/layer';

type Props = {
  sidePanelRef: RefObject<HTMLDivElement>;
  mapRef: RefObject<Map>;
  beforeTileLayerRef: RefObject<Layer>;
  isOpenPanel: boolean;
};

export default function Swiper({
  sidePanelRef,
  mapRef,
  beforeTileLayerRef,
  isOpenPanel,
}: Props) {
  const swipeRef = useRef<HTMLInputElement | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Swipe(슬라이더) 적용
  useLayerSwiper({
    sidePanelRef,
    mapRef,
    swipeRef,
    beforeTileLayerRef,
    isOpenPanel,
  });

  useEffect(() => {
    const updateThumbPosition = () => {
      if (swipeRef.current && trackRef.current) {
        const value = swipeRef.current.value;
        const percentage = `${value}%`;

        // 세로선 위치 즉시 업데이트
        trackRef.current.style.left = percentage;
      }
    };

    // 이벤트 리스너 추가
    swipeRef.current?.addEventListener('input', updateThumbPosition);

    return () => {
      swipeRef.current?.removeEventListener('input', updateThumbPosition);
    };
  }, []);

  return (
    <div>
      {/* 세로선 */}
      <div ref={trackRef} className={styles.trackLine}></div>

      {/* 스와이퍼 슬라이더 */}
      <input
        className={styles.swiper}
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
