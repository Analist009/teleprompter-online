import React, { useRef, useEffect } from 'react';
import { Camera, CameraOff } from 'lucide-react';

interface VideoPreviewProps {
  enabled: boolean;
  onToggle: () => void;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ enabled, onToggle }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (enabled && videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(err => console.error('Error accessing camera:', err));
    }
    
    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [enabled]);

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="absolute top-2 right-2 p-2 bg-gray-800/70 rounded-lg
                   hover:bg-gray-700 transition-colors z-10"
      >
        {enabled ? (
          <CameraOff className="w-5 h-5 text-red-400" />
        ) : (
          <Camera className="w-5 h-5 text-gray-400" />
        )}
      </button>

      {enabled ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          className="w-full h-[200px] object-cover rounded-lg bg-gray-900"
        />
      ) : (
        <div className="w-full h-[200px] bg-gray-900/50 rounded-lg flex items-center justify-center">
          <span className="text-gray-400">מצלמה כבויה</span>
        </div>
      )}
    </div>
  );
};

export default VideoPreview;