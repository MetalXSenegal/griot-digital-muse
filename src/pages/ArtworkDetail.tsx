import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Share2, Heart } from 'lucide-react';
import { LanguageSwitcher, type Language } from '@/components/LanguageSwitcher';
import { AudioPlayer } from '@/components/AudioPlayer';
import { Button } from '@/components/ui/button';
import { artworks } from '@/data/artworks';
import { ArtworkCard } from '@/components/ArtworkCard';

export default function ArtworkDetail() {
  const { id } = useParams();
  const [language, setLanguage] = useState<Language>('fr');
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageZoom, setImageZoom] = useState(false);

  const artwork = artworks.find(art => art.id === id);

  if (!artwork) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            {language === 'fr' && 'Œuvre non trouvée'}
            {language === 'en' && 'Artwork not found'}
            {language === 'wo' && 'Œuvre amul'}
          </h1>
          <Link to="/collections">
            <Button>
              {language === 'fr' && 'Retour aux collections'}
              {language === 'en' && 'Back to collections'}
              {language === 'wo' && 'Dellu ci collections'}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedArtworks = artworks.filter(art =>
    artwork.relatedArtworks.includes(art.id)
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/collections">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-5 h-5" />
              {language === 'fr' && 'Collections'}
              {language === 'en' && 'Collections'}
              {language === 'wo' && 'Collections'}
            </Button>
          </Link>
          
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
            
            <Button variant="ghost" size="icon">
              <Share2 className="w-5 h-5" />
            </Button>

            <LanguageSwitcher
              currentLanguage={language}
              onLanguageChange={setLanguage}
            />
          </div>
        </div>
      </div>

      {/* Main image */}
      <div className="relative w-full h-screen">
        <img
          src={artwork.image}
          alt={artwork.title[language]}
          className={`w-full h-full object-contain bg-black cursor-zoom-in transition-transform duration-500 ${
            imageZoom ? 'scale-150' : 'scale-100'
          }`}
          onClick={() => setImageZoom(!imageZoom)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 -mt-32 relative z-10">
        <div className="space-y-12">
          {/* Title & Origin */}
          <div className="animate-fade-up">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              {artwork.title[language]}
            </h1>
            
            <div className="flex items-center gap-3 text-muted-foreground">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="text-lg">{artwork.origin.country}, {artwork.origin.region}</span>
            </div>
          </div>

          {/* Audio Griot */}
          <div className="animate-fade-up space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="text-3xl">🎙️</span>
              {language === 'fr' && 'Écoutez l\'Histoire'}
              {language === 'en' && 'Listen to the Story'}
              {language === 'wo' && 'Déggal Tarixu'}
            </h2>
            
            <AudioPlayer
              audioUrl={artwork.audio[language]}
              title={artwork.title[language]}
              autoPlay={true}
            />
          </div>

          {/* Description */}
          <div className="animate-fade-up bg-card/50 backdrop-blur-sm p-8 rounded-2xl border border-border">
            <p className="text-lg leading-relaxed text-foreground">
              {artwork.description[language]}
            </p>
          </div>

          {/* Timeline */}
          <div className="animate-fade-up space-y-6">
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <Clock className="w-8 h-8 text-primary" />
              {language === 'fr' && 'Timeline Historique'}
              {language === 'en' && 'Historical Timeline'}
              {language === 'wo' && 'Timeline Historique'}
            </h2>

            <div className="relative pl-8 border-l-2 border-primary/30 space-y-8">
              {artwork.timeline.map((event, index) => (
                <div
                  key={index}
                  className="relative animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute -left-[37px] w-12 h-12 bg-primary rounded-full flex items-center justify-center text-2xl border-4 border-background shadow-glow">
                    {event.icon}
                  </div>
                  
                  <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border hover:border-primary/50 transition-colors duration-300">
                    <div className="text-primary font-bold text-xl mb-2">
                      {event.year}
                    </div>
                    <p className="text-foreground text-lg">
                      {event.event[language]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Related artworks */}
          {relatedArtworks.length > 0 && (
            <div className="animate-fade-up space-y-8 pb-20">
              <h2 className="text-3xl font-bold text-white">
                {language === 'fr' && 'Œuvres Connexes'}
                {language === 'en' && 'Related Artworks'}
                {language === 'wo' && 'Œuvres yu connexes'}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedArtworks.map((related) => (
                  <ArtworkCard
                    key={related.id}
                    id={related.id}
                    image={related.image}
                    title={related.title}
                    origin={related.origin.country}
                    language={language}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
