import PanelFilter from 'components/panel/filter/PanelFilter';
import styles from './Panel.module.scss';
import { RefObject } from 'react';

type PanelProps = {
  sidePanelRef: RefObject<HTMLDivElement>;
};

export default function Panel({ sidePanelRef }: PanelProps) {
  return (
    <div ref={sidePanelRef} className={styles.panel}>
      panel
      <PanelFilter />
    </div>
  );
}
