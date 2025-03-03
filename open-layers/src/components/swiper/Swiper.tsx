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
      if (swipeRef.current) {
        const value = swipeRef.current.value;
        const percentage = (Number(value) / 100) * 100;
        swipeRef.current.style.setProperty(
          '--thumb-position',
          `${percentage}%`
        );
      }
    };

    swipeRef.current?.addEventListener('input', updateThumbPosition);
    return () => {
      swipeRef.current?.removeEventListener('input', updateThumbPosition);
    };
  }, []);

  return (
    <input
      className={styles.swiper}
      ref={swipeRef}
      id='swipe'
      type='range'
      min='0'
      max='100'
      defaultValue='50'
    />
  );
}
