/* eslint-disable @typescript-eslint/no-explicit-any */
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import 'ol/ol.css';
import { fromLonLat } from 'ol/proj';
import XYZ from 'ol/source/XYZ';
import { useEffect, useRef } from 'react';
import { drawGeoJsonLayer } from 'utils/drawGeoJsonLayer';
import { drawVectorLayer } from 'utils/drawVectorLayer';
import styles from './OlMap.module.scss';
import { Coordinate } from 'ol/coordinate';

export default function OlMap() {
  const mapRef = useRef<Map | null>(null);
  useEffect(() => {
    // 이미 맵이 있다면 재생성 방지
    if (mapRef.current) return;

    // 1) OSM 타일 레이어 (배경지도)
    const backgroundLayer = new TileLayer({
      properties: {
        layerId: 'osm',
        info: 'OSM 배경지도',
      },
      source: new XYZ({
        url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      }),
    });

    // 토지 레이어
    const landLayer = drawGeoJsonLayer('/data/land-korea.geojson', {
      layerId: 'changeDetection',
      info: '변화탐지 토지',
    });

    // 2) OpenLayers Map 생성
    const mapObject = new Map({
      target: 'map',
      // layers: [osmTileLayer],
      layers: [backgroundLayer, landLayer],
      view: new View({
        // center: [0,0], // EPSG:3857 기준
        center: fromLonLat([127, 37]), // EPSG:3857 변환된 대략 한반도 중심
        zoom: 7,
      }),
    });

    // 경기도 인근에 해당하는 경·위도 사각형 예시
    // (126.8, 37.4) ~ (127.2, 37.8) 대략 범위
    const buildingCoords: Coordinate[] = [
      fromLonLat([126.8, 37.4]),
      fromLonLat([127.2, 37.4]),
      fromLonLat([127.2, 37.8]),
      fromLonLat([126.8, 37.8]),
      fromLonLat([126.8, 37.4]),
    ];
    // 빌딩 레이어
    drawVectorLayer(mapObject, buildingCoords, {
      layerId: 'building',
      info: '변화탐지 빌딩',
    });

    // 5) Swipe(슬라이더) 적용
    const swipe = document.getElementById('swipe') as HTMLInputElement;
    if (!swipe) return;

    // 슬라이더 값을 변경할 때마다 지도 다시 그리기
    swipe.addEventListener('input', () => {
      mapObject.render();
    });

    // landLayer가 지도에서 그려지기 직전에 클리핑(자르기) 적용
    // OpenLayers 6.x+에서는 'prerender' 이벤트 사용 가능
    landLayer.on('prerender', (evt: any) => {
      const ctx = evt.context;
      const mapSize = mapObject.getSize();

      // 슬라이더 값(0~100%)
      const sliderValue = Number(swipe.value);
      // 현재 지도 width * 슬라이더 백분율
      const width = mapSize ? (mapSize[0] * sliderValue) / 100 : 0;

      // 왼쪽 부분만 보여주도록 clip
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, width, ctx.canvas.height);
      ctx.clip();
    });

    // landLayer를 다 그린 뒤, 원본 상태로 복구
    landLayer.on('postrender', (evt: any) => {
      const ctx = evt.context;
      ctx.restore();
    });

    mapRef.current = mapObject;
    (window as any).layers = mapObject.getAllLayers();
  }, []);

  return (
    <section className={styles.map__container}>
      <div id='map' className={styles.map} />
      {/* 스와이프용 슬라이더: 0 ~ 100 (left ~ right) */}
      <input id='swipe' type='range' min='0' max='100' defaultValue='50' />
    </section>
  );
}
