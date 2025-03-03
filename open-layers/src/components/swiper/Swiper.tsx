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
  // containerRef: 부모 컨테이너의 위치를 얻기 위해 사용합니다.
  const containerRef = useRef<HTMLDivElement | null>(null);
  const swipeRef = useRef<HTMLInputElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const thumbRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef(false);

  // 레이어를 clipping 함
  useLayerSwiper({
    sidePanelRef,
    mapRef,
    swipeRef,
    beforeTileLayerRef,
    isOpenPanel,
  });

  // range input의 값에 따라 thumb와 track의 위치를 업데이트하는 함수
  const updateSlider = () => {
    if (
      swipeRef.current &&
      thumbRef.current &&
      trackRef.current &&
      mapRef.current
    ) {
      const sliderValue = Number(swipeRef.current.value);
      const mapSize = mapRef.current.getSize();
      const mapWidth = mapSize ? mapSize[0] : 0;
      const visibleWidth = mapWidth * (sliderValue / 100);

      thumbRef.current.style.left = `${visibleWidth}px`;
      trackRef.current.style.left = `${visibleWidth}px`;
    }
  };

  // 커스텀 thumb 드래그 이벤트 핸들러들
  const handleThumbMouseDown = (e: MouseEvent) => {
    isDraggingRef.current = true;
    e.preventDefault(); // 텍스트 선택 등 원치 않는 기본 동작 방지
  };

  const handleThumbMouseMove = (e: MouseEvent) => {
    if (!isDraggingRef.current || !swipeRef.current || !containerRef.current)
      return;
    // 부모 컨테이너의 위치를 기준으로 마우스 위치 계산
    const containerRect = containerRef.current.getBoundingClientRect();
    let newLeft = e.clientX - containerRect.left;

    // 컨테이너 너비 내로 값 제한 (0 ~ containerRect.width)
    newLeft = Math.max(0, Math.min(newLeft, containerRect.width));

    // 새 slider 값 계산 (0 ~ 100)
    const newSliderValue = (newLeft / containerRect.width) * 100;
    swipeRef.current.value = newSliderValue.toString();

    // input의 값이 변경되었을 때와 동일하게 slider 업데이트
    updateSlider();
  };

  const handleThumbMouseUp = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
    }
  };

  useEffect(() => {
    // 컴포넌트 마운트 시 초기 업데이트 및 윈도우 리사이즈 이벤트 등록
    updateSlider();
    const handleResize = () => {
      updateSlider();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [mapRef, beforeTileLayerRef]);

  useEffect(() => {
    // 커스텀 thumb에 마우스 이벤트 등록
    const thumbEl = thumbRef.current;
    if (!thumbEl) return;
    thumbEl.addEventListener('mousedown', handleThumbMouseDown);
    document.addEventListener('mousemove', handleThumbMouseMove);
    document.addEventListener('mouseup', handleThumbMouseUp);

    return () => {
      thumbEl.removeEventListener('mousedown', handleThumbMouseDown);
      document.removeEventListener('mousemove', handleThumbMouseMove);
      document.removeEventListener('mouseup', handleThumbMouseUp);
    };
  }, []);

  return (
    // containerRef를 부모 div에 부여하여 위치 계산의 기준으로 사용합니다.
    <div className={styles.swiper} ref={containerRef}>
      {/* 배경 track line */}
      <div ref={trackRef} className={styles.trackLine} />
      {/* 커스텀 thumb (드래그 가능) */}
      <div ref={thumbRef} className={styles.thumb} />
      {/* native range input: onChange 이벤트를 통해 updateSlider 호출 */}
      <input
        className={styles.range__input}
        ref={swipeRef}
        id='swipe'
        type='range'
        min='0'
        max='100'
        defaultValue='50'
        onChange={updateSlider}
        onInput={updateSlider}
      />
    </div>
  );
}
