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
    const randomX = (Math.random() - 0.5) * 400; // -200 ~ 200 (범위 축소)
    const randomY = Math.random() * 600 + 300; // 300 ~ 900 (범위 축소)
    const randomRotate = Math.random() * 360 - 180; // -180 ~ 180 (범위 축소)
    const randomScale = 0.6 + Math.random() * 0.4; // 0.6 ~ 1.0 (범위 축소)
    
    return {
      randomX,
      randomY,
      randomRotate,
      randomScale,
      duration: 6 + Math.random() * 4 // 6-10초 (시간 단축)
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
        x: [0, animationValues.randomX],
        y: [0, animationValues.randomY],
        rotate: [verse.rotation, verse.rotation + animationValues.randomRotate],
        scale: [verse.scale, animationValues.randomScale],
        opacity: [0, 1, 0],
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
        fontSize: '1rem',
        fontWeight: 'bold',
        color: '#8B4513',
        whiteSpace: 'nowrap',
        textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
        fontFamily: 'serif',
        letterSpacing: '0.3px',
        opacity: 0.9,
        background: 'rgba(248, 246, 243, 0.9)',
        padding: '0.4rem 0.8rem',
        borderRadius: '0.4rem',
        border: '1px solid rgba(139, 69, 19, 0.3)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}>
        {verse.content}
      </div>
    </motion.div>
  );
} 