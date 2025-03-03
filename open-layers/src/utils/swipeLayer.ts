import { Map } from 'ol';
import { Layer } from 'ol/layer';

/**
 * @param {HTMLInputElement} slider - 슬라이더 인풋
 * @param {Map} map - OpenLayers Map 객체
 * @param {Layer} topLayer - Swipe 대상이 되는 최상위 레이어
 */
export function swipeLayer(
  slider: HTMLInputElement,
  map: Map,
  topLayer: Layer
) {
  slider.addEventListener('input', () => {
    // 슬라이더 값 변경 시 지도 다시 그리기
    map.render();
  });

  topLayer.on('prerender', (evt: any) => {
    const ctx = evt.context;
    const mapSize = map.getSize();
    if (!mapSize) return;

    // 슬라이더 값 (0~100)
    const sliderValue = Number(slider.value);
    // 지도 전체 폭
    const mapWidth = mapSize[0];
    const clipWidth = (mapWidth * sliderValue) / 100;

    // 기본(왼->오른쪽) 로직
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, clipWidth, ctx.canvas.height);
    ctx.clip();
  });

  // 그리기 후 복구
  topLayer.on('postrender', (evt: any) => {
    const ctx = evt.context;
    ctx.restore();
  });
}
