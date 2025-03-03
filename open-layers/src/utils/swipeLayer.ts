import { Map } from 'ol';
import { Layer } from 'ol/layer';
import RenderEvent from 'ol/render/Event';

const PANEL_WIDTH = 400;

/**
 * @param {HTMLInputElement} slider - 슬라이더 인풋
 * @param {Map} map - OpenLayers Map 객체
 * @param {Layer} topLayer - Swipe 대상이 되는 최상위 레이어
 */
export function swipeLayer(
  slider: HTMLInputElement,
  map: Map,
  topLayer: Layer,
  panelWidth: number
) {
  slider.addEventListener('input', () => {
    // 슬라이더 값 변경 시 지도 다시 그리기
    map.render();
  });

  topLayer.on('prerender', (event: any) => {
    const ctx = event.context;
    const mapSize = map.getSize();
    if (!mapSize) return;

    // 슬라이더 값(0~100)
    const sliderValue = Number(slider.value);
    // 지도 전체 폭
    const mapWidth = mapSize[0];

    // slider=0 => visibleWidth=0 => 레이어 전부 잘림(안 보임)
    // slider=100 => visibleWidth=mapWidth => 레이어 전부 보임
    const visibleWidth = (mapWidth * sliderValue) / 100;

    // console.clear();
    // console.log('mapWidth:', mapWidth);
    console.log('panelWidth:', panelWidth);

    ctx.save();
    ctx.beginPath();
    ctx.rect(panelWidth, 0, visibleWidth, ctx.canvas.height);
    ctx.clip();
  });

  // 그리기 후 복구
  topLayer.on('postrender', (event: any) => {
    const ctx = event.context;
    ctx.restore();
  });
}
