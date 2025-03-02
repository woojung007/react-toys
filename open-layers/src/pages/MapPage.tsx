import Panel from 'components/panel/Panel'
import styles from './MapPage.module.scss'
import OlMap from 'components/map/OlMap'

export default function MapPage() {
  return (
    <div className={styles.container}>
      <Panel />
      <OlMap />
    </div>
  )
}
