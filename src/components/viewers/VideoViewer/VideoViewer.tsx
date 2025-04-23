import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { Range } from "react-range";
import styles from "./VideoViewer.module.css";
import VolumeOnIcon from "../../icons/VolumeOnIcon";
import VolumeOffIcon from "../../icons/VolumeOffIcon";
import PauseIcon from "../../icons/PauseIcon";
import PlayIcon from "../../icons/PlayIcon";
import Loading from "../../Loading/Loading";

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
  const [loaded, setLoaded] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleVolumeChange = (values: number[]) => {
    const newVolume = values[0];
    setVolume(newVolume);
  };

  const handleProgress = (state: { played: number }) => {
    if (!isSeeking) {
      setPlayed(state.played);
    }
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  const handleSeekChange = (values: number[]) => {
    setIsSeeking(true);
    setPlayed(values[0]);
  };

  const handleSeekFinalChange = (values: number[]) => {
    setIsSeeking(false);
    if (playerRef.current) {
      playerRef.current.seekTo(values[0]);
    }
  };

  const handlePlaybackRateChange = (rate: number) => {
    setPlaybackRate(rate);
  };

  const toggleMute = () => {
    setVolume(volume === 0 ? 0.8 : 0);
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

  return (
    <div className={styles.videoViewer}>
      <div className={styles.playerWrapper}>
        {!loaded && <Loading size="large" />}
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
          {playing ? (
            <PauseIcon color="rgba(255, 255, 255, 0.6)" />
          ) : (
            <PlayIcon color="rgba(255, 255, 255, 0.6)" />
          )}
        </button>

        <div className={styles.timeControls}>
          <div className={styles.timeDisplay}>
            {formatTime(played * duration)}
          </div>

          <Range
            step={0.001}
            min={0}
            max={1}
            values={[played]}
            onChange={handleSeekChange}
            onFinalChange={handleSeekFinalChange}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                className={styles.progressTrack}
                style={{
                  ...props.style,
                }}
              >
                <div
                  className={styles.progressFill}
                  style={{
                    width: `${played * 100}%`,
                  }}
                />
                {children}
              </div>
            )}
            renderThumb={({ props }) => (
              <div {...props} className={styles.progressThumb} />
            )}
          />

          <div className={styles.timeDisplay}>{formatTime(duration)}</div>
        </div>

        <div className={styles.rightControls}>
          <div className={styles.volumeControl}>
            <button onClick={toggleMute} className={styles.controlButton}>
              {volume === 0 ? (
                <VolumeOffIcon color="rgba(255, 255, 255, 0.6)" />
              ) : (
                <VolumeOnIcon color="rgba(255, 255, 255, 0.6)" />
              )}
            </button>
            <Range
              step={0.01}
              min={0}
              max={1}
              values={[volume]}
              onChange={handleVolumeChange}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  className={styles.volumeTrack}
                  style={{
                    ...props.style,
                  }}
                >
                  <div
                    className={styles.volumeFill}
                    style={{
                      width: `${volume * 100}%`,
                    }}
                  />
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div {...props} className={styles.volumeThumb} />
              )}
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
        </div>
      </div>
    </div>
  );
};

export default VideoViewer;
