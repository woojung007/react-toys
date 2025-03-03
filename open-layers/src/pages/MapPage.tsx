import OlMap from 'components/map/OlMap';
import Panel from 'components/panel/Panel';
import { useRef, useState } from 'react';
import styles from './MapPage.module.scss';

export default function MapPage() {
  const sidePanelRef = useRef<HTMLDivElement>(null);
  const [isOpenPanel, setIsOpenPanel] = useState(false);

  return (
    <div className={styles.container}>
      <Panel
        sidePanelRef={sidePanelRef}
        isOpen={isOpenPanel}
        setIsOpen={setIsOpenPanel}
      />

      <OlMap sidePanelRef={sidePanelRef} isOpenPanel={isOpenPanel} />
    </div>
  );
}
