import { Profiler, useEffect } from "react";
import styles from "./ImageComponent.module.css";
import { imagePaths } from "data/images/largeCapacityImages";

const ImageComponent = () => {
  const loadImage = async () => {
    // console.time("loadImage");

    imagePaths.forEach((path) => {
      const img = new Image();
      img.src = path;
      img.onload = () => {};
    });

    // console.timeEnd("loadImage");
  };

  const returnImages = () => {
    return imagePaths.map((path, index) => (
      <div key={index}>
        <img
          className={styles.image}
          loading="lazy"
          decoding="async"
          src={path}
          alt="this is a tenant list"
        />
      </div>
    ));
  };

  const paintImages = () => {
    loadImage();
  };

  let startTime: any;

  function measureReflow() {
    startTime = performance.now();

    requestAnimationFrame(logReflowTime);
  }

  function logReflowTime() {
    const reflowTime = performance.now() - startTime;
    console.log("Reflow time:", reflowTime);
  }

  useEffect(() => {
    paintImages();
    measureReflow();
  }, []);

  useEffect(() => {
    const startTime = performance.now();

    paintImages();

    const endTime = performance.now();
    const renderTime = endTime - startTime;
    console.log(`Video component rendered in ${renderTime} milliseconds`);
  }, []);

  const onRenderCallback = (
    id: string,
    phase: any,
    actualDuration: number,
    baseDuration: number,
    startTime: number,
    commitTime: number,
    interactions: any
  ) => {
    console.log(`${id} ${phase} phase:`);
    console.log(`Actual duration: ${actualDuration}`);
    console.log(`Base duration: ${baseDuration}`);
    console.log(`Start time: ${startTime}`);
    console.log(`Commit time: ${commitTime}`);
    console.log(`Interactions: ${interactions}`);
  };

  return (
    <div>
      {/* {new Array(5)
          .fill([...imagePaths])
          .flat() */}
      {/* <div>
        {imagePaths.map((path, index) => (
          <div key={index}>
            <img
              className={styles.image}
              //   loading="lazy"
              decoding="async"
              src={path}
              alt="this is a tenant list"
            />
          </div>
        ))}
      </div> */}
      <Profiler id="Video component" onRender={onRenderCallback}>
        {returnImages()}
      </Profiler>
    </div>
  );
};

export default ImageComponent;
