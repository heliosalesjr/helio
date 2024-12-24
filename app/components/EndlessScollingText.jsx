"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

const EndlessScrollingText = () => {
  const controlsTop = useAnimation();
  const controlsBottom = useAnimation();
  const containerRef = useRef(null);

  // Detecta mudança na direção do scroll
  const handleScroll = () => {
    const direction = window.scrollY > lastScrollY ? 1 : -1;
    lastScrollY = window.scrollY;

    // Define direção do movimento com easing in/out
    const animationSettings = {
      x: direction === 1 ? ["100%", "-100%"] : ["-100%", "100%"],
      transition: {
        duration: 10,
        ease: "easeInOut",
        repeat: Infinity,
      },
    };

    controlsTop.start(animationSettings);
    controlsBottom.start({
      ...animationSettings,
      x: animationSettings.x.reverse(), // Movimento oposto
    });
  };

  // Define o scroll inicial e adiciona listener
  let lastScrollY = 0;
  useEffect(() => {
    controlsTop.start({
      x: ["100%", "-100%"],
      transition: { duration: 10, ease: "easeInOut", repeat: Infinity },
    });

    controlsBottom.start({
      x: ["-100%", "100%"],
      transition: { duration: 10, ease: "easeInOut", repeat: Infinity },
    });

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controlsTop, controlsBottom]);

  return (
    <div className="relative overflow-hidden w-full bg-gray-900 text-white py-12">
      <div className="h-20">
        {/* Frase superior */}
        <motion.div
          ref={containerRef}
          animate={controlsTop}
          className="text-4xl md:text-6xl font-bold whitespace-nowrap"
        >
          Coding for a better now and an even better future
        </motion.div>
      </div>
      <div className="h-20 mt-4">
        {/* Frase inferior */}
        <motion.div
          ref={containerRef}
          animate={controlsBottom}
          className="text-2xl md:text-4xl font-medium text-gray-300 whitespace-nowrap"
        >
          Education / Gaming / Scaling / Entertaining / Living
        </motion.div>
      </div>
    </div>
  );
};

export default EndlessScrollingText;
