import PanelFilter from 'components/panel/filter/PanelFilter';
import styles from './Panel.module.scss';
import { RefObject } from 'react';

type PanelProps = {
  sidePanelRef: RefObject<HTMLDivElement>;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export default function Panel({ sidePanelRef, isOpen, setIsOpen }: PanelProps) {
  return (
    <div
      ref={sidePanelRef}
      className={`${styles.panel} ${!isOpen && styles.closed}`}
    >
      <PanelFilter />
      {/* 버튼 */}
      <button
        className={styles.toggle__button}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '접기' : '열기'}
      </button>
    </div>
  );
}
