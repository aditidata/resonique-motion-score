import { useRef, useEffect } from 'react';
// src/utils/playTone.ts
export function useTone(frequency: number, duration = 1.5) {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    const audioCtx = new AudioCtx();

    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    // Smooth sine wave
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);

    // Gentle fade in/out
    const now = audioCtx.currentTime;
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.15, now + 0.05); // fade in
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration); // fade out

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start(now);
    oscillator.stop(now + duration);
  } catch (err) {
    console.error('Error playing tone:', err);
  }
}
