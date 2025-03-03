import { Feature, Map } from 'ol';
import { Coordinate } from 'ol/coordinate';
import { Polygon } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import { LayerProperties } from 'types/property';

export function drawVectorLayer(
  olMap: Map,
  coords: Coordinate[],
  properties: LayerProperties
) {
  const feature = new Feature({
    geometry: new Polygon([coords]),
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
        color: 'rgba(255, 0, 0, 0.4)',
      }),
      stroke: new Stroke({
        color: 'rgba(255, 0, 0, 1)',
        width: 2,
      }),
    }),
  });

  // 6) 맵에 추가
  olMap.addLayer(layer);
}
