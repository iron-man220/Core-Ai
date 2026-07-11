import React, { useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { useTheme } from '../context/ThemeContext';

import WebGLBackground from '../components/WebGLBackground';

<<<<<<< HEAD
=======

>>>>>>> 715814d4b475b37fb9e9e7efd451d8e255bd22cb
export function Home() {
  const { theme } = useTheme();

  return (
    <div className="relative flex-1 flex flex-col items-center justify-center overflow-hidden bg-background">
      {/* 3D Particle Background - The Antigravity Animation */}
      {/* 3D Particle Background - The Antigravity Animation */}
      <WebGLBackground />

      {/* Main Content Modal */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
        className="text-center max-w-lg mx-auto z-10 p-8 rounded-2xl bg-background/60 backdrop-blur-md border border-border/50 shadow-[0_0_40px_rgba(139,92,246,0.1)]"
      >
        <h1 className="text-3xl md:text-[32px] font-semibold mb-4 tracking-tight text-foreground leading-snug">
          You have successfully authenticated.
        </h1>
        <p className="text-muted-foreground text-[16px]">
          You should be redirected back to the product.{' '}
          <Link to="/dashboard" className="text-foreground hover:text-primary hover:underline transition-colors font-medium">
            Click here
          </Link>{' '}
          if not working.
        </p>
      </motion.div>
    </div>
  );
}
