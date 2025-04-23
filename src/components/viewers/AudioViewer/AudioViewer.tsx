import React, { useState, useRef, useEffect } from "react";
import styles from "./AudioViewer.module.css";
import VolumeOffIcon from "../../icons/VolumeOffIcon";
import VolumeOnIcon from "../../icons/VolumeOnIcon";
import PauseIcon from "../../icons/PauseIcon";
import PlayIcon from "../../icons/PlayIcon";
import { Range } from "react-range";

interface AudioViewerProps {
  fileUrl: string;
  fileName: string;
}

const AudioViewer: React.FC<AudioViewerProps> = ({ fileUrl, fileName }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isDurationAvailable, setIsDurationAvailable] = useState(false);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      const audio = audioRef.current;

      // Проверяем, что длительность доступна и не Infinity
      if (isFinite(audio.duration)) {
        setDuration(audio.duration);
        setIsDurationAvailable(true);
      } else {
        // Альтернативный способ определения длительности
        audio.addEventListener("durationchange", () => {
          if (isFinite(audio.duration)) {
            setDuration(audio.duration);
            setIsDurationAvailable(true);
          }
        });
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        togglePlay();
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying]);

  return (
    <div className={styles.audioPlayer}>
      <audio
        ref={audioRef}
        src={fileUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />

      <div className={styles.playerControls}>
        <button onClick={togglePlay} className={styles.controlButton}>
          {isPlaying ? (
            <PauseIcon color="#4676fb" />
          ) : (
            <PlayIcon color="#4676fb" />
          )}
        </button>

        <div className={styles.timeInfo}>
          <span>{formatTime(currentTime)}</span>

          <Range
            step={0.1}
            min={0}
            max={duration || 100}
            values={[currentTime]}
            onChange={(values) => {
              const newTime = values[0];
              setCurrentTime(newTime);
              if (audioRef.current) {
                audioRef.current.currentTime = newTime;
              }
            }}
            renderTrack={({ props, children }) => (
              <div {...props} className={styles.progressTrack}>
                <div
                  className={styles.progressFill}
                  style={{
                    width: `${(currentTime / (duration || 100)) * 100}%`,
                  }}
                />
                {children}
              </div>
            )}
            renderThumb={({ props }) => {
              const { key, ...restProps } = props;
              return (
                <div
                  key={key}
                  {...restProps}
                  className={styles.progressThumb}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    (restProps as any).onMouseDown?.(e);
                  }}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    (restProps as any).onTouchStart?.(e);
                  }}
                />
              );
            }}
          />

          {isDurationAvailable ? (
            <span>{formatTime(duration)}</span>
          ) : (
            <span>--:--</span>
          )}
        </div>

        <div className={styles.volumeControls}>
          <button onClick={toggleMute} className={styles.controlButton}>
            {isMuted || volume === 0 ? (
              <VolumeOffIcon color="#4676fb" />
            ) : (
              <VolumeOnIcon color="#4676fb" />
            )}
          </button>
          <Range
            step={0.01}
            min={0}
            max={1}
            values={[isMuted ? 0 : volume]}
            onChange={(values) => {
              const newVolume = values[0];
              setVolume(newVolume);
              setIsMuted(newVolume === 0);
              if (audioRef.current) {
                audioRef.current.volume = newVolume;
              }
            }}
            renderTrack={({ props, children }) => (
              <div {...props} className={styles.volumeTrack}>
                <div
                  className={styles.volumeFill}
                  style={{
                    width: `${(isMuted ? 0 : volume) * 100}%`,
                  }}
                />
                {children}
              </div>
            )}
            renderThumb={({ props }) => {
              const { key, ...restProps } = props;
              return (
                <div key={key} {...restProps} className={styles.volumeThumb} />
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AudioViewer;
