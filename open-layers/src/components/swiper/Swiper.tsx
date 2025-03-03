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
  // swiper container, thumb, track 참조
  const containerRef = useRef<HTMLDivElement | null>(null);
  const thumbRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  // 드래그로 구한 swiper의 left 값 (px)
  const [sliderLeft, setSliderLeft] = useState(0); // 현재 슬라이더의 왼쪽 위치(px)
  const isDraggingRef = useRef(false); // 드래그가 진행중인지 여부를 나타내는 플래그
  const startXRef = useRef(0); // 드래그가 시작될때의 마우스 X 좌표
  const startLeftRef = useRef(0); // 드래그 시작시의 sliderLeft 값

  const [panelWidth, setPanelWidth] = useState(400);

  useEffect(() => {
    if (!sidePanelRef.current) return;

    if (isOpenPanel) {
      setPanelWidth(sidePanelRef.current.getBoundingClientRect().width);
    } else {
      setPanelWidth(0);
    }
  }, [isOpenPanel]);

  // 초기에는 container의 중앙을 기준으로 설정
  useLayoutEffect(() => {
    if (containerRef.current) {
      const { width } = containerRef.current.getBoundingClientRect();
      setSliderLeft(width / 2);
    }
  }, []);

  // sliderLeft 변화에 따라 thumb와 track의 위치 업데이트
  useEffect(() => {
    if (thumbRef.current && trackRef.current) {
      thumbRef.current.style.left = `${sliderLeft}px`;
      trackRef.current.style.left = `${sliderLeft}px`;
    }
  }, [sliderLeft]);

  // thumb에 마우스 이벤트로 드래그 구현
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
      // 컨테이너 내에서만 이동하도록 제한
      newLeft = Math.max(0, Math.min(newLeft, width));
      setSliderLeft(newLeft);
      // slider 값 변경에 따라 지도도 재렌더링해서 clipping 업데이트
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

  // map layer 클리핑: swiper의 left 값, container의 절대 좌표, 패널 너비를 적용하여 clipping 영역 지정
  useEffect(() => {
    if (!mapRef.current || !beforeTileLayerRef.current || !containerRef.current)
      return;
    const layer = beforeTileLayerRef.current;

    const handlePreRender = (event: any) => {
      const ctx = event.context;
      // container의 절대 위치를 가져옴
      const containerRect = containerRef.current!.getBoundingClientRect();
      // swiper thumb의 실제 위치 계산: container의 left + sliderLeft에서 패널 너비를 빼줌
      const absoluteSliderX = containerRect.left + sliderLeft - panelWidth;

      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, absoluteSliderX, ctx.canvas.height);
      ctx.clip();
    };

    const handlePostRender = (event: any) => {
      const ctx = event.context;
      ctx.restore();
    };

    layer.on('prerender', handlePreRender);
    layer.on('postrender', handlePostRender);

    return () => {
      layer.un('prerender', handlePreRender);
      layer.un('postrender', handlePostRender);
    };
  }, [sliderLeft, mapRef, beforeTileLayerRef, isOpenPanel]);

  return (
    <div
      ref={containerRef}
      className={`${styles.swiper} ${isOpenPanel ? '' : styles.collapsed}`}
    >
      {/* 배경 track line */}
      <div ref={trackRef} className={styles.trackLine} />
      {/* 드래그 가능한 thumb */}
      <div ref={thumbRef} className={styles.thumb} />
    </div>
  );
}
