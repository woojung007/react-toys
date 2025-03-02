import { Feature, Map } from 'ol';
import { Polygon } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import { fromLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import { LayerProperties } from 'types/property';

export function drawVectorLayer(olMap: Map, properties: LayerProperties) {
  // 경기도 인근에 해당하는 경·위도 사각형 예시
  // (126.8, 37.4) ~ (127.2, 37.8) 대략 범위
  const landCoords = [
    fromLonLat([126.8, 37.4]),
    fromLonLat([127.2, 37.4]),
    fromLonLat([127.2, 37.8]),
    fromLonLat([126.8, 37.8]),
    fromLonLat([126.8, 37.4]), // 폴리곤 닫기
  ];
  const feature = new Feature({
    geometry: new Polygon([landCoords]),
  });

  // 4) VectorSource 생성 (Feature 추가)
  const source = new VectorSource({
    features: [feature],
  });

  // 5) VectorLayer 생성 + 스타일 지정
  const layer = new VectorLayer({
    properties,
    source: source,
    style: new Style({
      fill: new Fill({
        color: 'rgba(255, 0, 0, 0.4)', // 반투명 빨강
      }),
      stroke: new Stroke({
        color: 'rgba(255, 0, 0, 1)', // 빨강 테두리
        width: 2,
      }),
    }),
  });

  // 6) 맵에 추가
  olMap.addLayer(layer);

  // 7) 폴리곤이 화면에 잘 보이도록 fit
  olMap.getView().fit(feature.getGeometry()!.getExtent(), {
    padding: [50, 50, 50, 50],
    duration: 1000,
  });
}
