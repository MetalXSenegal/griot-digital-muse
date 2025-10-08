export interface Artwork {
  id: string;
  title: {
    fr: string;
    en: string;
    wo: string;
  };
  origin: {
    region: string;
    country: string;
    coordinates: [number, number];
  };
  category: 'royalty' | 'spirituality' | 'daily' | 'celebration';
  image: string;
  description: {
    fr: string;
    en: string;
    wo: string;
  };
  audio: {
    fr: string;
    en: string;
    wo: string;
  };
  timeline: Array<{
    year: string;
    event: {
      fr: string;
      en: string;
      wo: string;
    };
    icon: string;
  }>;
  relatedArtworks: string[];
  tags: string[];
}

export const artworks: Artwork[] = [
  {
    id: 'mask-royal',
    title: {
      fr: 'Masque Royal Akan',
      en: 'Akan Royal Mask',
      wo: 'Masque bu Boroom Akan'
    },
    origin: {
      region: 'Ghana',
      country: 'Ghana',
      coordinates: [5.6037, -0.1870]
    },
    category: 'royalty',
    image: '/src/assets/artwork-mask.jpg',
    description: {
      fr: "Ce masque royal incarne la puissance et la sagesse des rois Akan. Ses motifs dorés racontent l'histoire d'une lignée royale vieille de plusieurs siècles.",
      en: "This royal mask embodies the power and wisdom of Akan kings. Its golden patterns tell the story of a royal lineage spanning centuries.",
      wo: "Ci masque royal bi, nekk na ci ñu barke ak xam-xam yu buur yi Akan. Motifs bi ñu dore, wax na ab tarixu ligné royale bu am ay siècle yu bari."
    },
    audio: {
      fr: '/audio/mask-fr.mp3',
      en: '/audio/mask-en.mp3',
      wo: '/audio/mask-wo.mp3'
    },
    timeline: [
      {
        year: '1400',
        event: {
          fr: 'Création du royaume Akan',
          en: 'Creation of Akan kingdom',
          wo: 'Royaume Akan ci weesu'
        },
        icon: '👑'
      },
      {
        year: '1650',
        event: {
          fr: 'Apogée de la tradition des masques',
          en: 'Peak of mask tradition',
          wo: 'Apogée tradition yu masque'
        },
        icon: '🎭'
      },
      {
        year: '1900',
        event: {
          fr: 'Transmission aux générations',
          en: 'Transmission to generations',
          wo: 'Transmission ci generations yi'
        },
        icon: '📜'
      }
    ],
    relatedArtworks: ['sculpture-king', 'textile-kente'],
    tags: ['royalty', 'gold', 'power', 'heritage']
  },
  {
    id: 'sculpture-king',
    title: {
      fr: 'Sculpture Royale Bénin',
      en: 'Benin Royal Sculpture',
      wo: 'Sculpture bu Boroom Bénin'
    },
    origin: {
      region: 'Bénin',
      country: 'Bénin',
      coordinates: [6.4969, 2.6289]
    },
    category: 'royalty',
    image: '/src/assets/artwork-sculpture.jpg',
    description: {
      fr: "Sculpté dans un bois noble, ce roi du Bénin porte les marques de sa souveraineté. Chaque perle de son collier représente une génération de sagesse.",
      en: "Carved from noble wood, this Benin king bears the marks of his sovereignty. Each bead of his necklace represents a generation of wisdom.",
      wo: "Daan ci bois noble, boroom Bénin bii am na ay marques ci souveraineté am. Benn benn perle ci collier bi, waxal na ab génération bu xam-xam."
    },
    audio: {
      fr: '/audio/sculpture-fr.mp3',
      en: '/audio/sculpture-en.mp3',
      wo: '/audio/sculpture-wo.mp3'
    },
    timeline: [
      {
        year: '1200',
        event: {
          fr: 'Fondation du royaume du Bénin',
          en: 'Foundation of Benin Kingdom',
          wo: 'Tekki royaume Bénin'
        },
        icon: '🏛️'
      },
      {
        year: '1500',
        event: {
          fr: "Âge d'or de la sculpture",
          en: 'Golden age of sculpture',
          wo: 'Age bu dore ci sculpture'
        },
        icon: '✨'
      },
      {
        year: '1897',
        event: {
          fr: 'Pillage des bronzes du Bénin',
          en: 'Benin Bronzes looting',
          wo: 'Ndaje bronzes yi Bénin'
        },
        icon: '⚠️'
      }
    ],
    relatedArtworks: ['mask-royal', 'textile-kente'],
    tags: ['royalty', 'wood', 'benin', 'heritage']
  },
  {
    id: 'textile-kente',
    title: {
      fr: 'Tissu Kente Ancestral',
      en: 'Ancestral Kente Cloth',
      wo: 'Dëkk Kente bu Njëkk'
    },
    origin: {
      region: 'Ghana',
      country: 'Ghana',
      coordinates: [7.9465, -1.0232]
    },
    category: 'celebration',
    image: '/src/assets/artwork-textile.jpg',
    description: {
      fr: "Chaque couleur, chaque motif de ce tissu Kente raconte une histoire. Porté lors des grandes cérémonies, il symbolise la richesse culturelle des Ashanti.",
      en: "Every color, every pattern in this Kente cloth tells a story. Worn during great ceremonies, it symbolizes the cultural wealth of the Ashanti.",
      wo: "Benn benn nit, benn benn motif ci dëkk Kente bii, wax na ab tarixu. Seet na ci ceremonies yu mag, waxal na richesse culturelle yi Ashanti."
    },
    audio: {
      fr: '/audio/textile-fr.mp3',
      en: '/audio/textile-en.mp3',
      wo: '/audio/textile-wo.mp3'
    },
    timeline: [
      {
        year: '1600',
        event: {
          fr: 'Origine du tissage Kente',
          en: 'Origin of Kente weaving',
          wo: 'Origine tissage Kente'
        },
        icon: '🧵'
      },
      {
        year: '1800',
        event: {
          fr: 'Symbole de prestige royal',
          en: 'Symbol of royal prestige',
          wo: 'Symbole prestige bu boroom'
        },
        icon: '👑'
      },
      {
        year: '2000',
        event: {
          fr: 'Renaissance contemporaine',
          en: 'Contemporary renaissance',
          wo: 'Renaissance contemporaine'
        },
        icon: '🌟'
      }
    ],
    relatedArtworks: ['mask-royal', 'sculpture-king'],
    tags: ['celebration', 'textile', 'patterns', 'ashanti']
  }
];
