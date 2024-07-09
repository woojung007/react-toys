import { useEffect, useState } from "react";
import styles from "./ScreenOrientation.module.css";

const ScreenMode = () => {
  const isHorizontal = window.screen.orientation.type === "landscape-primary";

  const container = document.querySelector("#container");

  const [orientation, setOrientation] = useState(
    isHorizontal ? "가로모드" : "세로모드"
  );

  const exitFullScreen = (element: Document | any) => {
    // window.screen.orientation.unlock(); // ! not working

    // 일반 웹
    if (element.exitFullscreen) {
      element.exitFullscreen();

      return;
    }

    if (element.cancelFullScreen) {
      element.cancelFullScreen();

      return;
    }

    if (element.webkitCancelFullScreen) {
      element.webkitCancelFullScreen();
      return;
    }

    if (element.mozCancelFullScreen) {
      element.mozCancelFullScreen();

      return;
    }

    if (element.msExitFullscreen) {
      element.msExitFullscreen();

      return;
    }
  };

  //  모드 고정 (전체 화면)
  const lockFullScreen = () => {
    if (container) {
      if (container.requestFullscreen) {
        return container.requestFullscreen();
      }

      setOrientation("가로모드");
    }
  };

  //  전체 화면 해제
  const unlockOrientation = () => {
    exitFullScreen(document);

    setOrientation("세로모드");
  };

  useEffect(() => {
    const handleOrientationChange = () => {
      setOrientation(isHorizontal ? "가로모드" : "세로모드");
    };

    window.screen.orientation.addEventListener(
      "change",
      handleOrientationChange
    );

    return () => {
      window.screen.orientation.removeEventListener(
        "change",
        handleOrientationChange
      );
    };
  }, []);

  return (
    <div id="container" className={styles.mode_wrapper}>
      <p id="orientation-status">{orientation}</p>
      <div id="buttons-container">
        <button id="lock-landscape-button" onClick={lockFullScreen}>
          전체 화면
        </button>
        <button id="unlock-button" onClick={unlockOrientation}>
          해제하기
        </button>
      </div>
    </div>
  );
};

export default ScreenMode;
