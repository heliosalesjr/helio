"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const EndlessScrollingText = () => {
  const controlsTop = useAnimation();
  const controlsBottom = useAnimation();
  const [direction, setDirection] = useState(1); // 1 = direita para esquerda, -1 = esquerda para direita
  const containerRef = useRef(null);
  const textTopRef = useRef(null);
  const textBottomRef = useRef(null);
  const speed = 20; // Velocidade base do texto (ajustável)

  const phrases = {
    top: "Coding for a better now and an even better future ",
    bottom: "Education / Gaming / Scaling / Entertaining / Living ",
  };

  const calculatePosition = (ref) => {
    const style = window.getComputedStyle(ref.current);
    const matrix = new DOMMatrix(style.transform);
    return matrix.m41 || 0; // Pega a posição X do transform
  };

  const startAnimation = (controls, direction, offset = 0) => {
    controls.start({
      x: [offset, direction * -textTopRef.current.offsetWidth],
      transition: {
        duration: speed,
        repeat: Infinity,
        ease: "linear",
      },
    });
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const newDirection = window.scrollY > lastScrollY ? 1 : -1;
      if (newDirection !== direction) {
        setDirection(newDirection);

        // Pega a posição atual do texto
        const currentTopPosition = calculatePosition(textTopRef);
        const currentBottomPosition = calculatePosition(textBottomRef);

        // Para as animações atuais
        controlsTop.stop();
        controlsBottom.stop();

        // Reinicia as animações na posição atual
        startAnimation(controlsTop, newDirection, currentTopPosition);
        startAnimation(controlsBottom, -newDirection, currentBottomPosition);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [direction]);

  useEffect(() => {
    // Inicializa as animações
    startAnimation(controlsTop, direction);
    startAnimation(controlsBottom, -direction);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden w-full bg-gray-900 text-white py-12"
    >
      {/* Frase superior */}
      <div className="h-20 overflow-hidden">
        <motion.div
          ref={textTopRef}
          animate={controlsTop}
          className="flex whitespace-nowrap text-4xl md:text-6xl font-bold"
        >
          {phrases.top.repeat(3)}
        </motion.div>
      </div>
      {/* Frase inferior */}
      <div className="h-20 mt-4 overflow-hidden">
        <motion.div
          ref={textBottomRef}
          animate={controlsBottom}
          className="flex whitespace-nowrap text-2xl md:text-4xl font-medium text-gray-300"
        >
          {phrases.bottom.repeat(3)}
        </motion.div>
      </div>
    </div>
  );
};

export default EndlessScrollingText;
