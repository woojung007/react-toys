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
  properties: LayerProperties,
  zIndex: number,
  colors?: { fillColor: string; strokeColor: string }
) {
  const feature = new Feature({
    geometry: new Polygon([coords]),
  });

  // 4) VectorSource 생성 (Feature 추가)
  const vectorSource = new VectorSource({
    features: [feature],
  });

  // 5) VectorLayer 생성 + 스타일 지정
  const vectorLayer = new VectorLayer({
    properties,
    source: vectorSource,
    style: new Style({
      fill: new Fill({
        color: colors?.fillColor || 'rgba(255, 0, 0, 0.4)',
      }),
      stroke: new Stroke({
        color: colors?.strokeColor || 'rgba(255, 0, 0, 1)',
        width: 2,
      }),
    }),
  });

  vectorLayer.setZIndex(zIndex);
  olMap.addLayer(vectorLayer);
  return vectorLayer;
}
