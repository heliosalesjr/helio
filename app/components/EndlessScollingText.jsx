"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

const EndlessScrollingText = () => {
  const controlsTop = useAnimation();
  const controlsBottom = useAnimation();

  const phrases = {
    top: "Coding for a better now and an even better future",
    bottom: "Education / Gaming / Scaling / Entertaining / Living",
  };

  // Configuração da animação
  const startAnimation = (direction) => {
    const animationSettings = {
      x: direction === 1 ? ["0%", "-100%"] : ["-100%", "0%"],
      transition: {
        duration: 10,
        ease: "linear",
        repeat: Infinity,
      },
    };

    controlsTop.start(animationSettings);
    controlsBottom.start({
      ...animationSettings,
      x: animationSettings.x.reverse(), // Movimento oposto
    });
  };

  // Detecta direção do scroll
  let lastScrollY = 0;
  const handleScroll = () => {
    const direction = window.scrollY > lastScrollY ? 1 : -1;
    lastScrollY = window.scrollY;
    startAnimation(direction);
  };

  useEffect(() => {
    startAnimation(1); // Inicia com direção padrão
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Renderiza múltiplas cópias do texto
  const renderRepeatedText = (text, copies = 3) => {
    return new Array(copies)
      .fill(text)
      .map((phrase, index) => <span key={index} className="mx-4">{phrase}</span>);
  };

  return (
    <div className="relative overflow-hidden w-full bg-gray-900 text-white py-12">
      {/* Linha superior */}
      <div className="h-20 overflow-hidden">
        <motion.div
          animate={controlsTop}
          className="flex whitespace-nowrap text-4xl md:text-6xl font-bold"
        >
          {renderRepeatedText(phrases.top)}
        </motion.div>
      </div>
      {/* Linha inferior */}
      <div className="h-20 mt-4 overflow-hidden">
        <motion.div
          animate={controlsBottom}
          className="flex whitespace-nowrap text-2xl md:text-4xl font-medium text-gray-300"
        >
          {renderRepeatedText(phrases.bottom)}
        </motion.div>
      </div>
    </div>
  );
};

export default EndlessScrollingText;
