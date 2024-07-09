import React, { useEffect, useRef } from "react";

type VideoProps = {
  videoUrl: string;
  isActive: boolean;
  goNextSlide: () => void;
};

const Video = ({ videoUrl, isActive, goNextSlide }: VideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const playVideo = async () => {
    if (!videoRef.current) return;

    await videoRef.current.play();
  };

  const pauseVideo = () => {
    if (!videoRef.current) return;

    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  };

  const handleVideoPlaying = async () => {
    try {
      if (!videoRef.current) return;

      if (isActive) {
        await playVideo();
      } else {
        pauseVideo();
      }
    } catch (e) {
      pauseVideo();
      console.warn("SCREENSAVER WARNING!", e);
    }
  };

  useEffect(() => {
    handleVideoPlaying();
  }, [isActive]);

  return (
    <video muted ref={videoRef} onEnded={goNextSlide}>
      <source src={videoUrl} />
    </video>
  );
};

export default Video;
