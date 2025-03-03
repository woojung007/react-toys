/* eslint-disable @typescript-eslint/no-explicit-any */
import { Map } from 'ol';
import { Layer } from 'ol/layer';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
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
  // 요소 참조
  const containerRef = useRef<HTMLDivElement | null>(null);
  const thumbRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const swipeRef = useRef<HTMLInputElement | null>(null);

  // 드래그로 구한 swiper의 left 값 (px)
  const [sliderLeft, setSliderLeft] = useState(0); // 현재 thumb의 left 위치
  const isDraggingRef = useRef(false); // 드래그 중 여부
  const startXRef = useRef(0); // 드래그 시작 시의 마우스 X 좌표
  const startLeftRef = useRef(0); // 드래그 시작 시의 sliderLeft 값

  // sidePanel의 너비를 state로 관리 (패널이 열리면 해당 너비, 아니면 0)
  const [panelWidth, setPanelWidth] = useState(400);
  useEffect(() => {
    if (!sidePanelRef.current) return;
    setPanelWidth(
      isOpenPanel ? sidePanelRef.current.getBoundingClientRect().width : 0
    );
  }, [isOpenPanel, sidePanelRef]);

  // 초기에는 container의 중앙을 기준으로 sliderLeft 설정
  useLayoutEffect(() => {
    if (containerRef.current) {
      const { width } = containerRef.current.getBoundingClientRect();
      setSliderLeft(width / 2);
    }
  }, []);

  // sliderLeft가 변할 때 thumb와 track의 위치를 업데이트
  useEffect(() => {
    if (thumbRef.current && trackRef.current) {
      thumbRef.current.style.left = `${sliderLeft}px`;
      trackRef.current.style.left = `${sliderLeft}px`;
    }
  }, [sliderLeft]);

  // 1. thumb 드래그 이벤트 구현
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      startXRef.current = e.clientX;
      startLeftRef.current = sliderLeft;
      e.preventDefault();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !containerRef.current) return;
      const { width } = containerRef.current.getBoundingClientRect();
      const dx = e.clientX - startXRef.current;
      let newLeft = startLeftRef.current + dx;
      // container 내에서만 이동하도록 제한
      newLeft = Math.max(0, Math.min(newLeft, width));
      setSliderLeft(newLeft);

      // 드래그할 때마다 지도도 재렌더링하여 클리핑 업데이트
      if (mapRef.current) {
        mapRef.current.render();
      }
    };

    const handleMouseUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
      }
    };

    const thumbEl = thumbRef.current;
    if (thumbEl) {
      thumbEl.addEventListener('mousedown', handleMouseDown);
    }
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      if (thumbEl) {
        thumbEl.removeEventListener('mousedown', handleMouseDown);
      }
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [sliderLeft, mapRef]);

  // 2. map layer 클리핑 구현 (수정)
  useEffect(() => {
    if (!mapRef.current || !beforeTileLayerRef.current || !containerRef.current)
      return;
    const layer = beforeTileLayerRef.current;

    const handlePreRender = (event: any) => {
      const ctx = event.context;
      // swiper container의 절대 위치
      const containerRect = containerRef.current!.getBoundingClientRect();
      // map canvas의 절대 위치를 가져옴
      const mapTarget = mapRef.current?.getTargetElement();
      const mapRect = mapTarget
        ? mapTarget.getBoundingClientRect()
        : { left: 0 };

      // slider thumb의 절대 x 좌표: container의 left + sliderLeft
      // 패널이 열려 있으면 panelWidth만큼 offset이 발생하므로 빼줌
      const absoluteSliderX = containerRect.left + sliderLeft + panelWidth;
      // map canvas 내 상대 좌표로 변환
      const relativeSliderX = absoluteSliderX - mapRect.left;

      console.log('containerRect:', containerRect.left);
      console.log('sliderLeft:', sliderLeft);
      console.log('panelWidth:', panelWidth);
      console.log('mapRect:', mapRect.left);

      ctx.save();
      ctx.beginPath();
      // ctx.rect(panelWidth, 0, relativeSliderX, ctx.canvas.height);
      // map canvas의 좌측 0부터 relativeSliderX까지 클리핑
      ctx.rect(0, 0, relativeSliderX, ctx.canvas.height);
      ctx.clip();
    };

    const handlePostRender = (event: any) => {
      event.context.restore();
    };

    layer.on('prerender', handlePreRender);
    layer.on('postrender', handlePostRender);

    return () => {
      layer.un('prerender', handlePreRender);
      layer.un('postrender', handlePostRender);
    };
  }, [sliderLeft, mapRef, beforeTileLayerRef, panelWidth]);

  useEffect(() => {
    console.log('panelWidth:', panelWidth);
  }, [panelWidth]);

  return (
    <div
      ref={containerRef}
      className={`${styles.swiper} ${isOpenPanel ? '' : styles.collapsed}`}
    >
      {/* 배경 track line */}
      <div ref={trackRef} className={styles.trackLine} />
      {/* 드래그 가능한 thumb */}
      <div ref={thumbRef} className={styles.thumb} />

      {/* native range input (클리핑 영역 업데이트에 사용) */}
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
