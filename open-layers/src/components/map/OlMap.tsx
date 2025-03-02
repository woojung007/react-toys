import { useEffect, useRef } from 'react'
import styles from './OlMap.module.scss'
import 'ol/ol.css'
import { Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'

export default function OlMap() {
  const mapRef = useRef<Map | null>(null)

  useEffect(() => {
    if (mapRef.current) return

    const osmTileLayer = new TileLayer({
      source: new XYZ({
        url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      }),
    })

    const mapObject = new Map({
      target: 'map',
      layers: [osmTileLayer],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    })

    mapRef.current = mapObject
  }, [])

  return (
    <section className={styles.map__container}>
      <div id='map' className={styles.map} />
    </section>
  )
}
