/* eslint-disable @typescript-eslint/no-explicit-any */
import useLayerSwiper from 'hooks/useLayerSwiper';
import { Map, View } from 'ol';
import { Layer } from 'ol/layer';
import TileLayer from 'ol/layer/Tile';
import 'ol/ol.css';
import { fromLonLat } from 'ol/proj';
import XYZ from 'ol/source/XYZ';
import { RefObject, useEffect, useRef } from 'react';
import { drawVectorLayerByGeoJson } from 'utils/drawVectorLayerByGeoJson';
import styles from './OlMap.module.scss';

type OlMapProps = {
  sidePanelRef: RefObject<HTMLDivElement>;
  isOpenPanel: boolean;
};

export default function OlMap({ sidePanelRef, isOpenPanel }: OlMapProps) {
  const mapRef = useRef<Map | null>(null);
  const swipeRef = useRef<HTMLInputElement | null>(null);
  const beforeTileLayerRef = useRef<Layer>(null);

  // Swipe(슬라이더) 적용
  useLayerSwiper({
    sidePanelRef,
    mapRef,
    swipeRef,
    beforeTileLayerRef,
    isOpenPanel,
  });

  useEffect(() => {
    // 이미 맵이 있다면 재생성 방지
    if (mapRef.current) return;

    // 1) OSM 타일 레이어 (배경지도)
    const backgroundLayer = new TileLayer({
      properties: {
        layerId: 'tile-osm',
        info: 'OSM 배경지도',
      },
      source: new XYZ({
        url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      }),
      zIndex: 1,
    });

    // 2) OpenLayers Map 생성
    const mapObject = new Map({
      target: 'map',
      layers: [backgroundLayer],
      view: new View({
        // center: [0,0], // EPSG:3857 기준
        center: fromLonLat([127, 37]), // EPSG:3857 변환된 대략 한반도 중심
        zoom: 7,
      }),
    });

    // 2024년 타일 레이어
    drawVectorLayerByGeoJson(
      mapObject,
      '/data/tile-2024.geojson',
      {
        layerId: 'tile-after',
        info: '2024년 타일',
      },
      10,
      { fillColor: 'rgb(255, 174, 0)', strokeColor: 'rgb(255, 174, 0)' }
    );

    // 2023년 타일 레이어
    const beforeTileLayer = drawVectorLayerByGeoJson(
      mapObject,
      '/data/tile-2023.geojson',
      {
        layerId: 'tile-before',
        info: '2023년 타일',
      },
      11,
      { fillColor: 'rgb(0, 255, 102)', strokeColor: 'rgb(0, 255, 102)' }
    );
    beforeTileLayerRef.current = beforeTileLayer;

    // 변화탐지 결과 레이어
    drawVectorLayerByGeoJson(
      mapObject,
      '/data/change_detection.geojson',
      {
        layerId: 'change_detection',
        info: '변화탐지 결과',
      },
      50,
      {
        fillColor: 'rgba(235, 229, 47, 0.3))',
        strokeColor: 'rgba(235, 229, 47, 1)',
      }
    );

    // TODO: 토지 클릭시 나오도록 처리
    // 빌딩마스크 레이어
    drawVectorLayerByGeoJson(
      mapObject,
      '/data/building_mask.geojson',
      {
        layerId: 'building_mask',
        info: '빌딩마스크',
      },
      51,
      {
        fillColor: 'rgba(239, 55, 255, 0.3)',
        strokeColor: 'rgba(239, 55, 255, 1)',
      }
    );

    mapRef.current = mapObject;
    (window as any).layers = mapObject.getAllLayers();
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      console.log(mapRef.current.getAllLayers());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapRef.current]);

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
    <section
      className={`${styles.map__container} ${
        isOpenPanel ? '' : styles.collapsed
      }`}
    >
      {/* 지도 */}
      <div id='map' className={styles.map} />

      {/* 스와이프용 슬라이더: 0 ~ 100 (left ~ right) */}
      <input
        className={styles.swiper}
        ref={swipeRef}
        id='swipe'
        type='range'
        min='0'
        max='100'
        defaultValue='50'
      />
    </section>
  );
}

// // 경기도 인근에 해당하는 경·위도 사각형 예시
// // (126.8, 37.4) ~ (127.2, 37.8) 대략 범위
// const buildingCoords: Coordinate[] = [
//   fromLonLat([126.8, 37.4]),
//   fromLonLat([127.2, 37.4]),
//   fromLonLat([127.2, 37.8]),
//   fromLonLat([126.8, 37.8]),
//   fromLonLat([126.8, 37.4]),
// ];
// drawVectorLayer(
//   mapObject,
//   buildingCoords,
//   {
//     layerId: 'building',
//     info: '변화탐지 빌딩 폴리곤',
//   },
//   110,
//   { fillColor: 'rgba(255, 0, 0, 0.4)', strokeColor: 'rgba(255, 0, 0, 1)' }
// );
