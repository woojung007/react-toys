import React, { useEffect, useState } from "react";
import styles from "./MotionPage.module.css";

enum PopupStatus {
  BASE = "BASE",
  OPEN = "OPEN",
  CLOSE = "CLOSE",
}

const MotionPage = () => {
  const [popupStatus, setPopupStatus] = useState<PopupStatus>(PopupStatus.BASE);

  //   click btn
  const handleStatus = (status: PopupStatus) => {
    if (status === PopupStatus.BASE) {
      setPopupStatus(PopupStatus.OPEN);
      return;
    }

    if (status === PopupStatus.OPEN) {
      setPopupStatus(PopupStatus.CLOSE);
      return;
    }

    if (status === PopupStatus.CLOSE) {
      setPopupStatus(PopupStatus.OPEN);
      return;
    }
  };

  useEffect(() => {
    console.log("popupStatus :", popupStatus);
  }, [popupStatus]);
  return (
    <div className={styles.wrapper}>
      <div className={styles.btn_wrapper}>
        <button
          onClick={handleStatus.bind(this, popupStatus)}
          className={styles.btn1}
        >
          팝업 on/off 버튼
        </button>
      </div>

      <div
        className={`${styles.popup} 
        ${popupStatus === PopupStatus.OPEN && styles.visible} 
        ${popupStatus === PopupStatus.CLOSE && styles.hidden}
        `}
      >
        팝업이야
      </div>
    </div>
  );
};

export default MotionPage;
