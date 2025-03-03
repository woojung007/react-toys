import Panel from 'components/panel/Panel';
import styles from './MapPage.module.scss';
import OlMap from 'components/map/OlMap';
import { useLayoutEffect, useRef, useState } from 'react';

export default function MapPage() {
  const sidePanelRef = useRef<HTMLDivElement>(null);
  const [panelWidth, setPanelWidth] = useState(0);

  // 초기 렌더 후 실제 DOM이 준비된 시점에 측정
  useLayoutEffect(() => {
    if (sidePanelRef.current) {
      const width = sidePanelRef.current.getBoundingClientRect().width;
      // const width = sidePanelRef.current?.offsetWidth;
      setPanelWidth(width);
    }
  }, []); // TODO: isOpen이 바뀔 때마다 측정

  console.log('panelWidth:', panelWidth);
  return (
    <div className={styles.container}>
      <Panel sidePanelRef={sidePanelRef} />
      <OlMap panelWidth={panelWidth} />
    </div>
  );
}
