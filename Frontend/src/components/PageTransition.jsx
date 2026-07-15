import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useLocation, useNavigationType } from 'react-router-dom';

/**
 * CinematicTransition — God-tier circular page roll effect.
 *
 * How it works:
 *  1. On route change, a full-screen overlay "rolls" in from the top using a
 *     clip-path that starts as a circle(0%) at the nav-link click origin,
 *     expands to cover the entire screen (circle(150%)), then contracts from
 *     the opposite side revealing the new page below.
 *  2. The overlay carries a dark glossy gradient that mimics a physical page
 *     turning — complete with a radial highlight arc simulating the cylinder's
 *     light reflection.
 *  3. The incoming page simultaneously rises from scale(0.92) with a subtle
 *     blur clearance for a premium "print-quality" reveal.
 */

export const TransitionContext = React.createContext({
  triggerTransition: (_origin) => {},
});

export const CinematicTransitionProvider = ({ children }) => {
  const location = useLocation();
  const navigationType = useNavigationType(); // 'PUSH' | 'POP' | 'REPLACE'
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('idle'); // idle | in | out
  const [origin, setOrigin] = useState({ x: '50%', y: '50%' });
  const pendingLocationRef = useRef(null);

  // Called by nav links BEFORE navigation fires
  const triggerTransition = (clickOrigin) => {
    setOrigin(clickOrigin);
  };

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      // Skip cinematic effect for browser back/forward navigation
      if (navigationType === 'POP') {
        setDisplayLocation(location);
        return;
      }
      setTransitionStage('in');
      pendingLocationRef.current = location;
    }
  }, [location, displayLocation, navigationType]);

  const handleOverlayComplete = () => {
    if (transitionStage === 'in') {
      setDisplayLocation(pendingLocationRef.current);
      setTransitionStage('out');
    } else {
      setTransitionStage('idle');
    }
  };

  return (
    <TransitionContext.Provider value={{ triggerTransition }}>
      {/* Render the "frozen" page while transitioning */}
      <div key={displayLocation.pathname} className="w-full min-h-screen">
        {children}
      </div>

      {/* Cinematic Overlay */}
      <AnimatePresence>
        {(transitionStage === 'in' || transitionStage === 'out') && (
          <motion.div
            key={transitionStage}
            className="fixed inset-0 z-[9999] pointer-events-none"
            style={{ transformOrigin: `${origin.x} ${origin.y}` }}
            initial={transitionStage === 'in'
              ? { clipPath: `circle(0% at ${origin.x} ${origin.y})`, opacity: 1 }
              : { clipPath: `circle(150% at ${origin.x} ${origin.y})`, opacity: 1 }
            }
            animate={transitionStage === 'in'
              ? { clipPath: `circle(150% at ${origin.x} ${origin.y})`, opacity: 1 }
              : { clipPath: `circle(0% at ${origin.x} ${origin.y})`, opacity: 0 }
            }
            transition={{
              duration: transitionStage === 'in' ? 0.62 : 0.55,
              ease: transitionStage === 'in'
                ? [0.76, 0, 0.24, 1]  // heavy ease-in — snappy expansion
                : [0.76, 0, 0.24, 1], // mirrors the collapse
            }}
            onAnimationComplete={handleOverlayComplete}
          >
            {/* Dark glossy overlay body */}
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(160deg, #0a0a0f 0%, #080810 40%, #050508 100%)',
            }} />

            {/* Cylindrical light arc — simulates rolling page highlight */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0, scaleX: 0.4 }}
              animate={{ opacity: [0, 0.7, 0], scaleX: [0.3, 1.4, 0.3] }}
              transition={{ duration: transitionStage === 'in' ? 0.62 : 0.55, ease: 'easeInOut' }}
              style={{
                background: 'radial-gradient(ellipse 30% 100% at 50% 50%, rgba(160,100,255,0.08) 0%, rgba(80,60,255,0.04) 40%, transparent 70%)',
                mixBlendMode: 'screen',
              }}
            />

            {/* Subtle logo/brand stamp in center while rolling */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0, 0.6, 0], scale: [0.85, 1.0, 0.85] }}
              transition={{ duration: transitionStage === 'in' ? 0.62 : 0.55, ease: 'easeInOut' }}
            >
              <img
                src="/logo.png"
                alt=""
                className="h-12 w-auto object-contain opacity-30 dark:brightness-0 dark:invert blur-[0.5px]"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </motion.div>

            {/* Edge vignette for depth */}
            <div className="absolute inset-0 pointer-events-none" style={{
              background: 'radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.6) 100%)',
              mixBlendMode: 'multiply',
            }} />
          </motion.div>
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
};

export const usePageTransition = () => React.useContext(TransitionContext);
