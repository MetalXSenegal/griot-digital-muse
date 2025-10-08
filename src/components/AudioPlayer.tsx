import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface AudioPlayerProps {
  audioUrl: string;
  title: string;
  autoPlay?: boolean;
}

export const AudioPlayer = ({ audioUrl, title, autoPlay = false }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [ttsSpeaking, setTtsSpeaking] = useState(false);

  useEffect(() => {
    if (autoPlay && audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [autoPlay]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
    setProgress(progress);
  };

  const handleProgressChange = (value: number[]) => {
    if (!audioRef.current) return;
    const time = (value[0] / 100) * audioRef.current.duration;
    audioRef.current.currentTime = time;
    setProgress(value[0]);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleTTS = () => {
    if (!('speechSynthesis' in window)) return;
    if (ttsSpeaking) {
      window.speechSynthesis.cancel();
      setTtsSpeaking(false);
      return;
    }
    const utter = new SpeechSynthesisUtterance(title);
    utter.onend = () => setTtsSpeaking(false);
    setTtsSpeaking(true);
    window.speechSynthesis.speak(utter);
  };

  return (
    <div className="flex flex-col gap-4 p-6 bg-card rounded-2xl border border-border backdrop-blur-sm">
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />
      
      <div className="flex items-center gap-4">
        <Button
          onClick={togglePlay}
          size="lg"
          className="rounded-full w-16 h-16 bg-primary hover:bg-primary/90 shadow-glow"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6 ml-1" />
          )}
        </Button>

        <div className="flex-1">
          <p className="text-sm font-medium mb-2">{title}</p>
          <Slider
            value={[progress]}
            onValueChange={handleProgressChange}
            max={100}
            step={0.1}
            className="cursor-pointer"
          />
        </div>

        <Button
          onClick={toggleMute}
          variant="ghost"
          size="icon"
          className="rounded-full"
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5" />
          ) : (
            <Volume2 className="w-5 h-5" />
          )}
        </Button>

        {('speechSynthesis' in window) && (
          <Button onClick={toggleTTS} variant="outline" size="sm">
            {ttsSpeaking ? 'Stop TTS' : 'Lire le titre'}
          </Button>
        )}
      </div>

      {isPlaying && (
        <div className="flex gap-1 items-center justify-center h-12">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="w-1 bg-primary rounded-full animate-glow-pulse"
              style={{
                height: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.05}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
