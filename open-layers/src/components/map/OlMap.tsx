import { Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import 'ol/ol.css'
import XYZ from 'ol/source/XYZ'
import { useEffect, useRef } from 'react'
import styles from './OlMap.module.scss'
// === WebGL 벡터 레이어 관련 ===
import { Feature } from 'ol'
import Polygon from 'ol/geom/Polygon'
import VectorLayer from 'ol/layer/Vector'
import { fromLonLat } from 'ol/proj'
import VectorSource from 'ol/source/Vector'
import Fill from 'ol/style/Fill'
import Stroke from 'ol/style/Stroke'
import Style from 'ol/style/Style'
import { drawLandLayer } from 'utils/drawLand'

export default function OlMap() {
  const mapRef = useRef<Map | null>(null)
  useEffect(() => {
    // 이미 맵이 있다면 재생성 방지
    if (mapRef.current) return

    // 1) OSM 타일 레이어 (배경지도)
    const osmTileLayer = new TileLayer({
      source: new XYZ({
        url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      }),
    })

    // 2) OpenLayers Map 생성
    const mapObject = new Map({
      target: 'map',
      layers: [osmTileLayer],
      view: new View({
        center: [0, 0], // EPSG:3857 기준
        zoom: 2,
      }),
    })

    drawLandLayer(mapObject)

    mapRef.current = mapObject
  }, [])

  return (
    <section className={styles.map__container}>
      <div id='map' className={styles.map} />
    </section>
  )
}
