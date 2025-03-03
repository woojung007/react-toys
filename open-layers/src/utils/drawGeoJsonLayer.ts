import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import { LayerProperties } from 'types/property';

export function drawGeoJsonLayer(
  path: string,
  properties: LayerProperties,
  colors?: { fillColor: string; strokeColor: string }
) {
  const vectorSource = new VectorSource({
    url: path,
    format: new GeoJSON(),
  });

  const vectorLayer = new VectorLayer({
    properties,
    source: vectorSource,
    style: new Style({
      fill: new Fill({
        color: colors?.fillColor || 'rgba(8, 0, 255, 0.4)',
      }),
      stroke: new Stroke({
        color: colors?.strokeColor || 'rgb(8, 0, 255)',
        width: 2,
      }),
    }),
  });
  return vectorLayer;
}
