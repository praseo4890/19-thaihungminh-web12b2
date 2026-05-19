"use client";
import { useEffect, useRef } from 'react';
import styles from './TransitionLoader.module.css';

export default function TransitionLoader({ isActive }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (isActive && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className={styles.overlay}>
      <img src="/back.jpg" className={styles.bgImage} alt="bg" />
      <div className={`${styles.box} ${isActive ? styles.boxActive : ''}`}>
        <video ref={videoRef} muted playsInline className="w-full h-full object-cover">
          <source src="/transition.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}