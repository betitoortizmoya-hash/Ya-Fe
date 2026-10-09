import { motion } from 'motion/react';

export default function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none">
      {/* Top Left Soft Blush Glow */}
      <motion.div
        animate={{
          x: [0, 25, -15, 0],
          y: [0, -30, 15, 0],
          scale: [1, 1.08, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-36 -left-36 w-[480px] h-[480px] rounded-full bg-gradient-to-br from-pink-200/40 via-rose-100/30 to-amber-100/20 blur-[130px]"
      />

      {/* Top Right Rose Quartz Orb */}
      <motion.div
        animate={{
          x: [0, -30, 20, 0],
          y: [0, 25, -20, 0],
          scale: [1, 0.94, 1.06, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 -right-32 w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-rose-200/35 via-pink-100/30 to-rose-300/25 blur-[120px]"
      />

      {/* Center Bottom Warm Peach Aura */}
      <motion.div
        animate={{
          x: [0, 35, -25, 0],
          y: [0, -20, 25, 0],
          scale: [1, 1.1, 0.98, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-10 left-1/4 w-[520px] h-[520px] rounded-full bg-gradient-to-t from-pink-100/40 via-orange-50/30 to-rose-100/30 blur-[140px]"
      />

      {/* Subtle floating petal shapes */}
      <div className="absolute top-1/3 left-12 w-6 h-10 rounded-[50px/25px] bg-rose-200/20 rotate-45 blur-[1px] animate-float-slow" />
      <div className="absolute top-2/3 right-20 w-8 h-12 rounded-[50px/25px] bg-pink-300/15 -rotate-12 blur-[1px] animate-float-reverse" />
    </div>
  );
}
