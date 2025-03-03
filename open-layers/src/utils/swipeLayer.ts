/* eslint-disable @typescript-eslint/no-explicit-any */
import { Map } from 'ol';
import Layer from 'ol/layer/Layer';

export function swipeLayer(
  swipeRef: HTMLInputElement,
  olMap: Map,
  layer: Layer
) {
  // 슬라이더 값을 변경할 때마다 지도 다시 그리기
  swipeRef.addEventListener('input', () => {
    olMap.render();
  });

  // layer 가 지도에서 그려지기 직전에 클리핑(자르기) 적용
  // OpenLayers 6.x+에서는 'prerender' 이벤트 사용 가능
  layer.on('prerender', (evt: any) => {
    const ctx = evt.context;
    const mapSize = olMap.getSize();

    // 슬라이더 값(0~100%)
    const sliderValue = Number(swipeRef.value);
    // 현재 지도 width * 슬라이더 백분율
    const width = mapSize ? (mapSize[0] * sliderValue) / 100 : 0;

    // 왼쪽 부분만 보여주도록 clip
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, width, ctx.canvas.height);
    ctx.clip();
  });

  // layer 를 다 그린 뒤, 원본 상태로 복구
  layer.on('postrender', (evt: any) => {
    const ctx = evt.context;
    ctx.restore();
  });
}
