import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import styles from "./VideoViewer.module.css";

interface VideoViewerProps {
  fileUrl: string;
  fileName: string;
}

const VideoViewer: React.FC<VideoViewerProps> = ({ fileUrl, fileName }) => {
  const playerRef = useRef<ReactPlayer>(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  const handleProgress = (state: { played: number }) => {
    setPlayed(state.played);
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayed(parseFloat(e.target.value));
  };

  const handleSeekMouseUp = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(played);
    }
  };

  const handlePlaybackRateChange = (rate: number) => {
    setPlaybackRate(rate);
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  const formatTime = (seconds: number) => {
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds();

    if (hh) {
      return `${hh}:${mm.toString().padStart(2, "0")}:${ss
        .toString()
        .padStart(2, "0")}`;
    }
    return `${mm}:${ss.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <div
      className={`${styles.videoViewer} ${
        isFullscreen ? styles.fullscreen : ""
      }`}
    >
      <div className={styles.playerWrapper}>
        {!loaded && <div className={styles.loading}>Загрузка видео...</div>}
        <ReactPlayer
          ref={playerRef}
          url={fileUrl}
          playing={playing}
          volume={volume}
          playbackRate={playbackRate}
          width="100%"
          height="100%"
          onProgress={handleProgress}
          onDuration={handleDuration}
          onReady={() => setLoaded(true)}
          onError={() => setLoaded(true)}
          controls={false}
          className={styles.reactPlayer}
        />
      </div>

      <div className={styles.controls}>
        <button onClick={handlePlayPause} className={styles.controlButton}>
          {playing ? "⏸" : "▶"}
        </button>

        <div className={styles.timeControls}>
          <input
            type="range"
            min={0}
            max={1}
            step="any"
            value={played}
            onChange={handleSeekChange}
            onMouseUp={handleSeekMouseUp}
            className={styles.seekBar}
          />
          <div className={styles.timeDisplay}>
            {formatTime(played * duration)} / {formatTime(duration)}
          </div>
        </div>

        <div className={styles.rightControls}>
          <div className={styles.volumeControl}>
            <span>🔊</span>
            <input
              type="range"
              min={0}
              max={1}
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className={styles.volumeSlider}
            />
          </div>

          <select
            value={playbackRate}
            onChange={(e) =>
              handlePlaybackRateChange(parseFloat(e.target.value))
            }
            className={styles.speedControl}
          >
            <option value={0.5}>0.5x</option>
            <option value={0.75}>0.75x</option>
            <option value={1}>1x</option>
            <option value={1.25}>1.25x</option>
            <option value={1.5}>1.5x</option>
            <option value={2}>2x</option>
          </select>

          <button onClick={toggleFullscreen} className={styles.controlButton}>
            {isFullscreen ? "⤢" : "⤡"}
          </button>
        </div>
      </div>

      <div className={styles.videoInfo}>
        <h3>{fileName}</h3>
        <a href={fileUrl} download={fileName} className={styles.downloadButton}>
          Скачать видео
        </a>
      </div>
    </div>
  );
};

export default VideoViewer;
