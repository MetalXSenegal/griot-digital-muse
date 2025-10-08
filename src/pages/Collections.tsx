import { useState } from 'react';
import { LanguageSwitcher, type Language } from '@/components/LanguageSwitcher';
import { ArtworkCard } from '@/components/ArtworkCard';
import { artworks } from '@/data/artworks';
import { Crown, Sparkles, Home as HomeIcon, PartyPopper, QrCode } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.png';

const categories = [
  { id: 'all', icon: HomeIcon, label: { fr: 'Tout', en: 'All', wo: 'Lépp' } },
  { id: 'royalty', icon: Crown, label: { fr: 'Royauté', en: 'Royalty', wo: 'Boroom' } },
  { id: 'spirituality', icon: Sparkles, label: { fr: 'Spiritualité', en: 'Spirituality', wo: 'Spiritualité' } },
  { id: 'celebration', icon: PartyPopper, label: { fr: 'Célébrations', en: 'Celebrations', wo: 'Celebrations' } },
];

export default function Collections() {
  const [language, setLanguage] = useState<Language>('fr');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredArtworks = selectedCategory === 'all'
    ? artworks
    : artworks.filter(art => art.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" className="text-xl font-bold text-primary">
              <img src={logo} alt="Logo" className="w-12 h-12" />
            </Button>
          </Link>
          
          <div className="flex items-center gap-3">
            <Link to="/scan">
              <Button variant="outline" size="sm" className="gap-2">
                <QrCode className="w-4 h-4" /> Scan
              </Button>
            </Link>
            <LanguageSwitcher
              currentLanguage={language}
              onLanguageChange={setLanguage}
            />
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial opacity-20" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            {language === 'fr' && 'Explorez les Collections'}
            {language === 'en' && 'Explore the Collections'}
            {language === 'wo' && 'Xool ay Collections'}
          </h1>
          <p className="text-xl text-muted-foreground animate-fade-up">
            {language === 'fr' && 'Un voyage à travers les trésors culturels africains'}
            {language === 'en' && 'A journey through African cultural treasures'}
            {language === 'wo' && 'Ab travel ci trésors culturels yi Afrique'}
          </p>
        </div>
      </div>

      {/* Category filters */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`
                  flex items-center gap-3 px-6 py-3 rounded-2xl font-medium whitespace-nowrap
                  transition-all duration-300 border-2
                  ${isActive
                    ? 'bg-primary text-primary-foreground border-primary shadow-glow scale-105'
                    : 'bg-card/50 text-foreground border-border hover:border-primary/50 hover:scale-105'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                {cat.label[language]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Artworks grid */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArtworks.map((artwork) => (
            <div key={artwork.id} className="animate-fade-up">
              <ArtworkCard
                id={artwork.id}
                image={artwork.image}
                title={artwork.title}
                origin={artwork.origin.country}
                language={language}
              />
            </div>
          ))}
        </div>

        {filteredArtworks.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">
              {language === 'fr' && 'Aucune œuvre dans cette catégorie'}
              {language === 'en' && 'No artwork in this category'}
              {language === 'wo' && 'Œuvre yuñu amul ci catégorie bii'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
