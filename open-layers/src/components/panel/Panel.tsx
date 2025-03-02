import PanelFilter from 'components/panel/filter/PanelFilter'
import styles from './Panel.module.scss'

export default function Panel() {
  return (
    <section className={styles.panel}>
      panel
      <PanelFilter />
    </section>
  )
}
