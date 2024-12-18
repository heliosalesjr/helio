import { bungeeShade } from '../ui/fonts';
import styles from './AnimatedName.module.css';

export default function AnimatedName() {
  return (
    <div className="flex items-center justify-center min-h-screen min-w-screen bg-gray-100 p-4">
      <h1 
        className={`${bungeeShade.className} ${styles.animatedText} text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-center`}
      >
        Hélio Sales Júnior
      </h1>
    </div>
  );
}
