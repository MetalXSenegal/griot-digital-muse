import { Heart } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Language } from './LanguageSwitcher';

interface ArtworkCardProps {
  id: string;
  image: string;
  title: Record<Language, string>;
  origin: string;
  language: Language;
}

export const ArtworkCard = ({ id, image, title, origin, language }: ArtworkCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={`/artwork/${id}`}
      className="group relative block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-2xl bg-card border border-border transition-all duration-500 hover:scale-105 hover:shadow-glow">
        <div className="aspect-square overflow-hidden">
          <img
            src={image}
            alt={title[language]}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        {/* Gradient overlay */}
        <div className={`
          absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent
          transition-opacity duration-500
          ${isHovered ? 'opacity-100' : 'opacity-60'}
        `} />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-2xl font-bold mb-2 transition-transform duration-500 group-hover:translate-y-0 translate-y-2">
            {title[language]}
          </h3>
          <p className="text-sm text-cream/80 flex items-center gap-2">
            <span className="inline-block w-1 h-1 rounded-full bg-primary" />
            {origin}
          </p>
        </div>

        {/* Favorite button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-4 right-4 p-3 bg-black/50 backdrop-blur-sm rounded-full border border-white/20 transition-all duration-300 hover:scale-110 z-10"
        >
          <Heart
            className={`w-5 h-5 transition-colors duration-300 ${
              isFavorite ? 'fill-red-500 text-red-500' : 'text-white'
            }`}
          />
        </button>
      </div>
    </Link>
  );
};
