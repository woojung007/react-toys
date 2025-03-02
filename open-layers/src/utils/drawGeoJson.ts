import VectorSource from 'ol/source/Vector'
import GeoJSON from 'ol/format/GeoJSON'
import VectorLayer from 'ol/layer/Vector'
import Style from 'ol/style/Style'
import Fill from 'ol/style/Fill'
import Stroke from 'ol/style/Stroke'

export function drawGeoJson(path: string) {
  const vectorSource = new VectorSource({
    url: path,
    format: new GeoJSON(),
  })

  const vectorLayer = new VectorLayer({
    source: vectorSource,
    style: new Style({
      fill: new Fill({
        color: 'rgba(8, 0, 255, 0.4)',
      }),
      stroke: new Stroke({
        color: 'rgb(8, 0, 255)',
      }),
    }),
  })
  return vectorLayer
}
