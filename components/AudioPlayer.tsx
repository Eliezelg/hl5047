'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Download, SkipBack, SkipForward } from 'lucide-react';

interface AudioPlayerProps {
  fileId: string;
  onDownload?: () => void;
  downloadUrl?: string;
}

export default function AudioPlayer({ fileId, onDownload, downloadUrl }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const audioUrl = `/api/courses/stream/${fileId}`;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadStart = () => setIsLoading(true);
    const handleLoadedData = () => setIsLoading(false);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };


  const skip = (seconds: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime += seconds;
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gray-100 rounded-lg p-3 w-full sm:w-auto">
      <audio ref={audioRef} src={audioUrl} preload="metadata" />
      
      <div className="flex items-center gap-1 sm:gap-2 w-full sm:w-[400px]">
        <div className="flex-1 sm:flex-none sm:w-[150px]">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
          />
        </div>

        <div className="flex items-center gap-1 flex-shrink-0">
          <span className="text-xs text-gray-500">{formatTime(currentTime)}</span>
          <span className="text-xs text-gray-500">/</span>
          <span className="text-xs text-gray-500">{formatTime(duration)}</span>
        </div>

        <div className="flex items-center gap-1 ml-auto">
          <button
            onClick={() => skip(-10)}
            className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors flex-shrink-0"
            title="10 שניות אחורה"
          >
            <SkipBack className="h-4 w-4" />
          </button>
          
          <button
            onClick={togglePlayPause}
            disabled={isLoading}
            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 flex-shrink-0"
          >
            {isLoading ? (
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4 mr-0.5" />
            )}
          </button>
          
          <button
            onClick={() => skip(10)}
            className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors flex-shrink-0"
            title="10 שניות קדימה"
          >
            <SkipForward className="h-4 w-4" />
          </button>
        </div>

        {downloadUrl ? (
          <a
            href={downloadUrl}
            download
            className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors flex-shrink-0 inline-block"
            title="הורד"
          >
            <Download className="h-4 w-4" />
          </a>
        ) : onDownload ? (
          <button
            onClick={onDownload}
            className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors flex-shrink-0"
            title="הורד"
          >
            <Download className="h-4 w-4" />
          </button>
        ) : null}
      </div>
    </div>
  );
}