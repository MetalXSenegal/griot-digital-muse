import { useState } from 'react';
import { Button } from '@/components/ui/button';

export type Language = 'fr' | 'en' | 'wo';

interface LanguageSwitcherProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

export const LanguageSwitcher = ({ currentLanguage, onLanguageChange }: LanguageSwitcherProps) => {
  const languages: Language[] = ['fr', 'en', 'wo'];

  return (
    <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm rounded-full p-1 border border-border">
      {languages.map((lang) => (
        <button
          key={lang}
          onClick={() => onLanguageChange(lang)}
          className={`
            px-4 py-2 rounded-full text-sm font-medium uppercase tracking-wider
            transition-all duration-300
            ${
              currentLanguage === lang
                ? 'bg-primary text-primary-foreground shadow-glow'
                : 'text-muted-foreground hover:text-foreground'
            }
          `}
        >
          {lang}
        </button>
      ))}
    </div>
  );
};
