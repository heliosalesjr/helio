"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

const EndlessScrollingText = () => {
  const controlsTop = useAnimation();
  const controlsBottom = useAnimation();
  const [direction, setDirection] = useState(1); // 1 = para a direita, -1 = para a esquerda

  const phrases = {
    top: "Coding for a better now and an even better future",
    bottom: "Education / Gaming / Scaling / Entertaining / Living",
  };

  // Configuração da animação
  const startAnimation = (currentDirection) => {
    const speed = 20; // Ajuste a velocidade aqui (maior valor = mais devagar)
    const offset = "100%";

    controlsTop.start({
      x: currentDirection === 1 ? [0, `-${offset}`] : [`-${offset}`, 0],
      transition: {
        repeat: Infinity,
        duration: speed,
        ease: "linear",
      },
    });

    controlsBottom.start({
      x: currentDirection === -1 ? [0, `-${offset}`] : [`-${offset}`, 0],
      transition: {
        repeat: Infinity,
        duration: speed,
        ease: "linear",
      },
    });
  };

  // Atualiza a direção ao detectar o scroll
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const newDirection = window.scrollY > lastScrollY ? 1 : -1;
      if (newDirection !== direction) {
        setDirection(newDirection);
        startAnimation(newDirection); // Reinicia a animação na nova direção
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [direction]);

  // Inicia a animação quando o componente é montado
  useEffect(() => {
    startAnimation(direction);
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

