'use client';

import React, { useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { PoetryVerse } from '@/types';

interface FlyingVerseProps {
  verse: PoetryVerse;
  onAnimationComplete?: () => void;
}

export default function FlyingVerse({ verse, onAnimationComplete }: FlyingVerseProps) {
  // 애니메이션 값들을 메모이제이션하여 불필요한 재계산 방지
  const animationValues = useMemo(() => {
    const randomX = (Math.random() - 0.5) * 600; // -300 ~ 300
    const randomY = Math.random() * 800 + 400; // 400 ~ 1200
    const randomRotate = Math.random() * 540 - 270; // -270 ~ 270
    const randomScale = 0.5 + Math.random() * 0.6; // 0.5 ~ 1.1
    
    return {
      randomX,
      randomY,
      randomRotate,
      randomScale,
      duration: 8 + Math.random() * 6 // 8-14초
    };
  }, []);
  
  // 애니메이션 완료 콜백 최적화
  const handleAnimationComplete = useCallback(() => {
    onAnimationComplete?.();
  }, [onAnimationComplete]);
  
  return (
    <motion.div
      className="flying-verse"
      initial={{
        x: 0,
        y: 0,
        rotate: verse.rotation,
        scale: verse.scale,
        opacity: 0,
      }}
      animate={{
        x: [0, animationValues.randomX * 0.2, animationValues.randomX * 0.5, animationValues.randomX],
        y: [0, animationValues.randomY * 0.2, animationValues.randomY * 0.6, animationValues.randomY],
        rotate: [verse.rotation, verse.rotation + animationValues.randomRotate * 0.2, verse.rotation + animationValues.randomRotate * 0.6, verse.rotation + animationValues.randomRotate],
        scale: [verse.scale, animationValues.randomScale * 0.9, animationValues.randomScale, animationValues.randomScale * 0.7],
        opacity: [0, 1, 0.95, 0],
      }}
      transition={{
        duration: animationValues.duration,
        ease: "easeInOut",
        onComplete: handleAnimationComplete,
      }}
      style={{
        position: 'absolute',
        left: verse.position.x,
        top: verse.position.y,
        pointerEvents: 'none',
        zIndex: 2000
      }}
    >
      <div style={{
        fontSize: '1.1rem',
        fontWeight: 'bold',
        color: '#8B4513',
        whiteSpace: 'nowrap',
        textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        fontFamily: 'serif',
        letterSpacing: '0.5px',
        opacity: 0.9,
        background: 'rgba(248, 246, 243, 0.9)',
        padding: '0.5rem 1rem',
        borderRadius: '0.5rem',
        border: '1px solid rgba(139, 69, 19, 0.3)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
      }}>
        {verse.content}
      </div>
    </motion.div>
  );
} 