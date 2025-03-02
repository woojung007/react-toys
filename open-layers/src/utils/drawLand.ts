import { Feature, Map } from 'ol'
import { Polygon } from 'ol/geom'
import VectorLayer from 'ol/layer/Vector'
import { fromLonLat } from 'ol/proj'
import VectorSource from 'ol/source/Vector'
import Fill from 'ol/style/Fill'
import Stroke from 'ol/style/Stroke'
import Style from 'ol/style/Style'

export function drawLandLayer(olMap: Map) {
  // 3) 폴리곤(예: 토지) Feature 생성
  //    실제 좌표는 GeoJSON 등이 있을 수 있지만, 여기선 예시로 사각형 하나
  const landCoords = [
    fromLonLat([-5, 30]),
    fromLonLat([0, 30]),
    fromLonLat([0, 35]),
    fromLonLat([-5, 35]),
    fromLonLat([-5, 30]), // 폴리곤 닫기
  ]
  const landFeature = new Feature({
    geometry: new Polygon([landCoords]),
  })

  // 4) VectorSource 생성 (Feature 추가)
  const landSource = new VectorSource({
    features: [landFeature],
  })

  // 5) VectorLayer 생성 + 스타일 지정
  const landLayer = new VectorLayer({
    source: landSource,
    style: new Style({
      fill: new Fill({
        color: 'rgba(255, 0, 0, 0.4)', // 반투명 빨강
      }),
      stroke: new Stroke({
        color: 'rgba(255, 0, 0, 1)', // 빨강 테두리
        width: 2,
      }),
    }),
  })

  // 6) 맵에 추가
  olMap.addLayer(landLayer)

  // 7) 폴리곤이 화면에 잘 보이도록 fit
  olMap.getView().fit(landFeature.getGeometry()!.getExtent(), {
    padding: [50, 50, 50, 50],
    duration: 1000,
  })
}
