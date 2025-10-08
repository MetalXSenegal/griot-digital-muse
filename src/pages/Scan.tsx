import { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Camera, ArrowLeft, Keyboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { artworks } from '@/data/artworks';

export default function Scan() {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [manualCode, setManualCode] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let stream: MediaStream;
    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch (e) {
        setError('Camera access denied. Use manual code input.');
      }
    };
    startCamera();
    return () => {
      if (stream) stream.getTracks().forEach(t => t.stop());
    };
  }, []);

  const tryNavigateToArtwork = (code: string) => {
    const byId = artworks.find(a => a.id === code);
    if (byId) {
      navigate(`/artwork/${byId.id}`);
      return true;
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/collections">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-5 h-5" />
              Collections
            </Button>
          </Link>
          <div className="text-lg font-semibold">Scan QR</div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        <div className="rounded-2xl overflow-hidden border border-border bg-card">
          <div className="relative aspect-video bg-black">
            <video ref={videoRef} className="w-full h-full object-cover opacity-70" muted playsInline />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 border-2 border-primary rounded-xl animate-pulse" />
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 bg-black/40 px-4 py-2 rounded-full flex items-center gap-2">
              <Camera className="w-4 h-4" /> Positionnez le QR au centre
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
          <div className="text-sm text-muted-foreground">
            Si le scan ne marche pas, entrez le code de l'œuvre (ex: mcn-3).
          </div>
          <div className="flex gap-3">
            <Input value={manualCode} onChange={(e) => setManualCode(e.target.value)} placeholder="Code œuvre (id)" />
            <Button onClick={() => !tryNavigateToArtwork(manualCode) && setError('Œuvre introuvable')}>
              <Keyboard className="w-4 h-4 mr-2" /> Aller
            </Button>
          </div>
          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}
        </div>
      </div>
    </div>
  );
}


