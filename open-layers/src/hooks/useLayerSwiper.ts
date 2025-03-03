/* eslint-disable @typescript-eslint/no-explicit-any */
import { Map } from 'ol';
import { Layer } from 'ol/layer';
import { RefObject, useEffect, useLayoutEffect, useState } from 'react';

type Props = {
  sidePanelRef: RefObject<HTMLDivElement>;
  mapRef: RefObject<Map>;
  swipeRef: RefObject<HTMLInputElement>;
  beforeTileLayerRef: RefObject<Layer>;
  isOpenPanel: boolean;
};

// Swipe(슬라이더) 기능을 관리하는 훅
export default function useLayerSwiper({
  sidePanelRef,
  mapRef,
  swipeRef,
  beforeTileLayerRef,
  isOpenPanel,
}: Props) {
  const [panelWidth, setPanelWidth] = useState(0);

  // 초기 렌더 후 실제 DOM이 준비된 시점에 측정
  useLayoutEffect(() => {
    if (sidePanelRef.current) {
      const width = sidePanelRef.current.getBoundingClientRect().width;
      setPanelWidth(width);
    }
  }, [isOpenPanel]);

  useEffect(() => {
    if (!mapRef.current) return;
    if (!swipeRef.current) return;
    if (!beforeTileLayerRef.current) return;

    const map = mapRef.current;
    const slider = swipeRef.current;
    const topLayer = beforeTileLayerRef.current;

    console.log('열림?', isOpenPanel);

    // 슬라이더 값 변경 시 지도 다시 그리기
    const renderMap = () => {
      map.render();
    };

    // 1) prerender 핸들러
    const handlePreRender = (event: any) => {
      const ctx = event.context;
      const mapSize = map.getSize();
      if (!mapSize) return;

      const sliderValue = Number(slider.value);
      const mapWidth = mapSize[0];
      const visibleWidth = (mapWidth * sliderValue) / 100;

      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, visibleWidth + panelWidth, ctx.canvas.height);
      ctx.clip();
    };

    // 2) postrender 핸들러
    const handlePostRender = (event: any) => {
      const ctx = event.context;
      ctx.restore();
    };

    // event listener 등록
    slider.addEventListener('input', renderMap);
    topLayer.on('prerender', handlePreRender);
    topLayer.on('postrender', handlePostRender);

    // cleanup 함수
    return () => {
      slider.removeEventListener('input', renderMap);
      topLayer.un('prerender', handlePreRender);
      topLayer.un('postrender', handlePostRender);
    };
  }, [panelWidth]);
}
