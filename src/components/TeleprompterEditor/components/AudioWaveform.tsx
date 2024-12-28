import React, { useEffect, useRef } from 'react';

interface AudioWaveformProps {
  isRecording: boolean;
}

const AudioWaveform: React.FC<AudioWaveformProps> = ({ isRecording }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const analyserRef = useRef<AnalyserNode | null>(null);

  useEffect(() => {
    if (!isRecording) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    const setupAudioAnalyser = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioContext = new AudioContext();
        const source = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();
        
        analyser.fftSize = 256;
        source.connect(analyser);
        analyserRef.current = analyser;
        
        animate();
      } catch (err) {
        console.error('Error accessing microphone:', err);
      }
    };

    const animate = () => {
      const canvas = canvasRef.current;
      const analyser = analyserRef.current;
      
      if (!canvas || !analyser) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      
      const draw = () => {
        animationRef.current = requestAnimationFrame(draw);
        analyser.getByteFrequencyData(dataArray);
        
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        const barWidth = canvas.width / bufferLength;
        let x = 0;
        
        for (let i = 0; i < bufferLength; i++) {
          const barHeight = (dataArray[i] / 255) * canvas.height;
          
          const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
          gradient.addColorStop(0, '#3b82f6');
          gradient.addColorStop(1, '#1d4ed8');
          
          ctx.fillStyle = gradient;
          ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
          
          x += barWidth + 1;
        }
      };
      
      draw();
    };

    setupAudioAnalyser();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRecording]);

  return (
    <canvas
      ref={canvasRef}
      width={300}
      height={100}
      className="w-full h-[100px] rounded-lg bg-gray-900/30 backdrop-blur-sm"
    />
  );
};

export default AudioWaveform;