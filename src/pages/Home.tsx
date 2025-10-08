import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Image, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher, type Language } from '@/components/LanguageSwitcher';
import heroImage from '@/assets/hero-museum.jpg';

const translations = {
  visit: {
    fr: 'Visiter',
    en: 'Visit',
    wo: 'Gënal'
  },
  explore: {
    fr: 'Explorer les Collections',
    en: 'Explore Collections',
    wo: 'Xool ay Collections'
  },
  subtitle: {
    fr: 'Un voyage immersif dans les civilisations noires',
    en: 'An immersive journey through Black civilizations',
    wo: 'Ab travel immersif ci civilisations ñu nit ñu'
  }
};

export default function Home() {
  const [language, setLanguage] = useState<Language>('fr');

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Musée des Civilisations Noires"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
          <div className="absolute inset-0 bg-gradient-radial opacity-30" />
        </div>

        {/* Language switcher */}
        <div className="absolute top-8 right-8 z-20">
          <LanguageSwitcher
            currentLanguage={language}
            onLanguageChange={setLanguage}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
          <div className="text-center space-y-8 animate-fade-in">
            {/* Title */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight">
              <span className="block mb-2">Musée des</span>
              <span className="block text-primary animate-glow-pulse">
                Civilisations Noires
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-cream max-w-2xl mx-auto animate-fade-up">
              {translations.subtitle[language]}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8 animate-scale-in">
              <Link to="/collections">
                <Button
                  size="lg"
                  className="group px-8 py-6 text-lg rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-glow transition-all duration-300 hover:scale-105"
                >
                  <Image className="w-6 h-6 mr-3 transition-transform group-hover:rotate-12" />
                  {translations.explore[language]}
                </Button>
              </Link>

              <Link to="/scan">
                <Button
                  size="lg"
                  variant="outline"
                  className="group px-8 py-6 text-lg rounded-2xl bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 font-bold transition-all duration-300 hover:scale-105"
                >
                  <QrCode className="w-6 h-6 mr-3 transition-transform group-hover:rotate-12" />
                  Scanner un QR
                </Button>
              </Link>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-float">
            <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
              <div className="w-1 h-3 bg-white/50 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Featured section */}
      <div className="relative bg-gradient-to-b from-black to-background py-24 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-block px-6 py-2 bg-primary/10 border border-primary/30 rounded-full mb-4">
            <span className="text-primary font-semibold">
              {language === 'fr' && '✨ Une expérience unique'}
              {language === 'en' && '✨ A unique experience'}
              {language === 'wo' && '✨ Ab expérience bu gën'}
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            {language === 'fr' && 'Les œuvres se racontent'}
            {language === 'en' && 'Artworks tell their stories'}
            {language === 'wo' && 'Ay œuvres wax ci leen'}
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {language === 'fr' && 'Découvrez des récits immersifs, guidés par des voix authentiques. Chaque œuvre devient une porte vers l\'histoire et la culture.'}
            {language === 'en' && 'Discover immersive stories, guided by authentic voices. Each artwork becomes a gateway to history and culture.'}
            {language === 'wo' && 'Gis ay récits immersifs, gui ci voix authentiques. Benn benn œuvre mool na ab porte ci tarixu ak culture.'}
          </p>
        </div>
      </div>
    </div>
  );
}
