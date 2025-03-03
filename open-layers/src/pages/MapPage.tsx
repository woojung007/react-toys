import OlMap from 'components/map/OlMap';
import Panel from 'components/panel/Panel';
import { useRef, useState } from 'react';
import styles from './MapPage.module.scss';

export default function MapPage() {
  const sidePanelRef = useRef<HTMLDivElement>(null);
  const [isOpenPanel, setIsOpen] = useState(true);

  return (
    <div className={styles.container}>
      {isOpenPanel && <Panel sidePanelRef={sidePanelRef} />}
      <button onClick={() => setIsOpen(prev => !prev)}>
        {isOpenPanel ? '접기' : '열기'}
      </button>
      <OlMap sidePanelRef={sidePanelRef} isOpenPanel={isOpenPanel} />
    </div>
  );
}
