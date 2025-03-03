/* eslint-disable @typescript-eslint/no-explicit-any */
import { Map } from 'ol';
import { Layer } from 'ol/layer';

// const PANEL_WIDTH = 400;

/**
 * @param {HTMLInputElement} slider - 슬라이더 인풋
 * @param {Map} map - OpenLayers Map 객체
 * @param {Layer} topLayer - Swipe 대상이 되는 최상위 레이어
 * @param {number} panelWidth - panel의 너비
 */
export function swipeLayer(
  slider: HTMLInputElement,
  map: Map,
  topLayer: Layer,
  panelWidth: number
) {
  // slider.addEventListener('input', () => {
  //   // 슬라이더 값 변경 시 지도 다시 그리기
  //   map.render();
  // });

  const renderMap = () => {
    map.render();
  };

  // event listener 등록
  // 슬라이더 값 변경 시 지도 다시 그리기
  console.log('panelWidth !!!!!!', panelWidth);

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
  slider.addEventListener('input', renderMap);
  topLayer.on('prerender', handlePreRender);
  topLayer.on('postrender', handlePostRender);

  // cleanup 함수
  return () => {
    slider.removeEventListener('input', renderMap);
    topLayer.un('prerender', handlePreRender);
    topLayer.un('postrender', handlePostRender);
  };
}
