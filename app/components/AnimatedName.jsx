'use client'

import { useState } from 'react';
import styles from './AnimatedName.module.css';
import * as fonts from '../ui/fonts';

const fontOptions = [
  { name: 'Teko', font: fonts.teko },
  { name: 'Saira Condensed', font: fonts.sairaCondensed },
  { name: 'Squada One', font: fonts.squadaOne },
  { name: 'Rubik Mono One', font: fonts.rubikMonoOne },
  { name: 'Bungee', font: fonts.bungee },
  { name: 'Bungee Inline', font: fonts.bungeeInline },
  { name: 'Odibee Sans', font: fonts.odibeeSans },
  { name: 'Unica One', font: fonts.unicaOne },
  { name: 'League Gothic', font: fonts.leagueGothic },
  { name: 'Staatliches', font: fonts.staatliches },
  { name: 'Megrim', font: fonts.megrim },
];

export default function AnimatedName() {
  const [currentFontIndex, setCurrentFontIndex] = useState(0);

  const nextFont = () => {
    setCurrentFontIndex((prevIndex) => (prevIndex + 1) % fontOptions.length);
  };

  const currentFont = fontOptions[currentFontIndex];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-screen bg-gray-100 p-4">
      <h1 
        className={`${currentFont.font.className} ${styles.animatedText} text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-center mb-8`}
      >
        Ornitorrinco
      </h1>
      <button 
        onClick={nextFont}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Próxima Fonte: {fontOptions[(currentFontIndex + 1) % fontOptions.length].name}
      </button>
    </div>
  );
}

