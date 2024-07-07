import { videoPaths } from "data/videos/videos";
import styles from "./VideoComponent.module.css";
import { useEffect, useRef } from "react";

const VideoComponent = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // 동영상 재생
  const playVideo = async () => {
    if (!videoRef.current) return;

    await videoRef.current.play();
  };

  // 동영상 멈충
  const pauseVideo = () => {
    if (!videoRef.current) return;

    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  };

  const handleVideoPlaying = async () => {
    try {
      if (!videoRef.current) return;

      await playVideo();
    } catch (e) {
      pauseVideo();
      console.warn("SCREENSAVER WARNING!", e);
    }
  };

  useEffect(() => {
    handleVideoPlaying();

    return () => {
      pauseVideo();
    };
  }, []);

  return (
    <div>
      {videoPaths.map((path, index) => (
        <div className={styles.video_wrapper} key={index}>
          <video
            autoPlay
            playsInline
            muted
            ref={videoRef}
            className={styles.video}
          >
            <source src={path} />
          </video>
        </div>
      ))}
    </div>
  );
};

export default VideoComponent;
