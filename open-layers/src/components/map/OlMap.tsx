import { Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import 'ol/ol.css'
import { fromLonLat } from 'ol/proj'
import XYZ from 'ol/source/XYZ'
import { useEffect, useRef } from 'react'
import styles from './OlMap.module.scss'
import { drawGeoJson } from 'utils/drawGeoJson'
import { drawVectorLayer } from 'utils/drawVectorLayer'

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

    const landLayer = drawGeoJson('/data/land-korea.geojson')

    // 2) OpenLayers Map 생성
    const mapObject = new Map({
      target: 'map',
      // layers: [osmTileLayer],
      layers: [osmTileLayer, landLayer],
      view: new View({
        // center: [0,0], // EPSG:3857 기준
        center: fromLonLat([127, 37]), // EPSG:3857 변환된 대략 한반도 중심
        zoom: 7,
      }),
    })

    drawVectorLayer(mapObject)

    mapRef.current = mapObject
  }, [])

  return (
    <section className={styles.map__container}>
      <div id='map' className={styles.map} />
    </section>
  )
}
