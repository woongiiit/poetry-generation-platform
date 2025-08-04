'use client';

import React, { useState, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import FlyingVerse from '@/components/FlyingVerse';
import { poets } from '@/lib/data';
import { PoetryVerse } from '@/types';

export default function PoetsPage() {
  const router = useRouter();
  
  const [selectedPoet, setSelectedPoet] = useState<string | null>(null);
  const [flyingVerses, setFlyingVerses] = useState<PoetryVerse[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const [currentWorkIndex, setCurrentWorkIndex] = useState(0);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // 타이머 ref로 메모리 누수 방지
  const animationTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 시인별 특화된 시 문장들 메모이제이션
  const poetSpecificVerses = useMemo(() => ({
    '1': [ // 김소월
      "진달래꽃 아름 따다",
      "가실 길에 뿌리오리다",
      "사뿐히 즈려밟고",
      "고이 보내드리오리다",
      "영변에 약산",
      "말없이 고이",
      "죽어도 아니 눈물"
    ],
    '2': [ // 윤동주
      "죽는 날까지 하늘을 우러러",
      "한 점 부끄러움이 없기를",
      "잎새에 이는 바람에도",
      "나는 괴로워했다",
      "별을 노래하는 마음으로",
      "모든 죽어가는 것을 사랑해야지"
    ],
    '3': [ // 서정주
      "국화 옆에서",
      "한 잔 술을",
      "마시고 싶다",
      "아무도 모르게",
      "조용히 마시고 싶다",
      "국화 한 송이",
      "피어 있는 것을"
    ],
    '4': [ // 박목월
      "산에는 꽃 피네",
      "꽃이 피네",
      "갈 봄 여름 없이",
      "꽃이 피네",
      "산에 산에 피는 꽃",
      "저만치 혼자서",
      "피어 있네"
    ],
    '5': [ // 조지훈
      "청산도 절로 절로",
      "녹수도 절로 절로",
      "산수간에 나도 절로",
      "이 중에 절로 자란 몸이",
      "맑은 물에 산들도",
      "보고 싶어라"
    ],
    '6': [ // 김춘수
      "꽃이 지고",
      "새가 지고",
      "나비가 지고",
      "그리고 나도",
      "지고 지고",
      "지고 지고",
      "지고 지고"
    ],
    '7': [ // 정지용
      "산에는 꽃 피네",
      "꽃이 피네",
      "갈 봄 여름 없이",
      "꽃이 피네",
      "산에 산에 피는 꽃",
      "저만치 혼자서",
      "피어 있네"
    ],
    '8': [ // 김수영
      "풀잎도",
      "그리고",
      "바람도",
      "그리고",
      "그리고",
      "그리고",
      "그리고"
    ]
  }), []);

  // 추가적인 시 문장들 메모이제이션
  const additionalVerses = useMemo(() => [
    "바람에 날리는 시 한 줄",
    "한지 위에 써진 글자들",
    "옛 시인의 마음이 담긴",
    "시간을 넘어 전해지는",
    "아름다운 시의 향기",
    "한 폭의 그림 같은",
    "시인의 꿈이 담긴",
    "영원한 아름다움의",
    "시 한 수의 의미",
    "마음에 남는 그 한 줄",
    "시인의 마음이 담긴",
    "영원히 기억될",
    "아름다운 시구",
    "한 폭의 그림",
    "시인의 꿈",
    "바람에 흩날리는",
    "시 한 수의 향기",
    "옛 시인의 꿈",
    "시간을 넘어",
    "전해지는 아름다움",
    "한 폭의 그림 같은",
    "시인의 마음",
    "영원한 아름다움",
    "시 한 수의 의미",
    "마음에 남는",
    "그 한 줄의 아름다움",
    "시인의 꿈이 담긴",
    "영원히 기억될",
    "아름다운 시구",
    "한 폭의 그림 같은",
    "시인의 마음이 담긴"
  ], []);

  // 시 문장 생성 함수 메모이제이션
  const generateVerses = useCallback((poetId: string) => {
    const poet = poets.find(p => p.id === poetId);
    if (!poet) return [];

    const verses: PoetryVerse[] = [];
    
    // window 객체 안전하게 접근
    const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
    
    // 시인의 대표작 구절들 - 최대 3개만 선택하여 성능 최적화
    poet.representativeWorks.slice(0, 3).forEach((work, workIndex) => {
      work.content.slice(0, 3).forEach((line, lineIndex) => {
        verses.push({
          id: `work-${workIndex}-${lineIndex}`,
          content: line,
          position: {
            x: Math.random() * windowWidth,
            y: -100 - Math.random() * 200
          },
          rotation: Math.random() * 360,
          scale: 0.8 + Math.random() * 0.4
        });
      });
    });
    
    // 시인별 특화된 시 문장들 추가 - 최대 5개만 선택
    const specificVerses = poetSpecificVerses[poetId as keyof typeof poetSpecificVerses] || [];
    specificVerses.slice(0, 5).forEach((verse, index) => {
      verses.push({
        id: `specific-${index}`,
        content: verse,
        position: {
          x: Math.random() * windowWidth,
          y: -100 - Math.random() * 200
        },
        rotation: Math.random() * 360,
        scale: 0.7 + Math.random() * 0.5
      });
    });
    
    // 추가적인 시 문장들 - 최대 8개만 선택
    additionalVerses.slice(0, 8).forEach((verse, index) => {
      verses.push({
        id: `additional-${index}`,
        content: verse,
        position: {
          x: Math.random() * windowWidth,
          y: -100 - Math.random() * 200
        },
        rotation: Math.random() * 360,
        scale: 0.6 + Math.random() * 0.6
      });
    });

    return verses;
  }, [poetSpecificVerses, additionalVerses]);

  // 시인 선택 핸들러 최적화
  const handlePoetSelect = useCallback((poetId: string) => {
    // 이미 애니메이션 중이면 중복 실행 방지
    if (isAnimating || isTransitioning) {
      console.log('⚠️ 이미 애니메이션 중입니다');
      return;
    }

    // 기존 타이머 정리
    if (animationTimerRef.current) clearTimeout(animationTimerRef.current);

    setSelectedPoet(poetId);
    
    const verses = generateVerses(poetId);
    setFlyingVerses(verses);

    console.log('🎯 시 문장들 생성 완료:', verses.length, '개');
    console.log('📝 첫 번째 시 문장:', verses[0]?.content);

    // 0초 후 낙엽 효과와 함께 시 문장들 시작 (즉시 시작)
    animationTimerRef.current = setTimeout(() => {
      console.log('🍂 낙엽 효과와 시 문장들 시작');
      setIsTransitioning(true);
      setIsAnimating(true);
    }, 0);

    // 낙엽 애니메이션 완료 시 페이지 전환 (onAnimationComplete에서 처리)
    // transitionTimerRef는 더 이상 사용하지 않음
  }, [isAnimating, isTransitioning, generateVerses, router]);

  // 카루셀 네비게이션 최적화
  const nextPoet = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % poets.length);
  }, []);

  const prevPoet = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + poets.length) % poets.length);
  }, []);

  // 툴팁 핸들러 최적화
  const handleCardHover = useCallback(() => {
    if (isAnimating || isTransitioning) return;
    console.log('🎯 Card hover detected');
    setShowTooltip(true);
    setCurrentWorkIndex(0);
    setCurrentLineIndex(0);
    console.log('📋 Tooltip should be visible now');
  }, [isAnimating, isTransitioning]);

  const handleCardLeave = useCallback(() => {
    console.log('👋 Card leave detected');
    setShowTooltip(false);
    console.log('📋 Tooltip should be hidden now');
  }, []);

  // 툴팁 구절 순환 최적화
  React.useEffect(() => {
    if (!showTooltip || isAnimating || isTransitioning) return;

    const interval = setInterval(() => {
      const currentPoet = poets[currentIndex];
      const currentWork = currentPoet.representativeWorks[currentWorkIndex];
      
      if (currentLineIndex < currentWork.content.length - 1) {
        setCurrentLineIndex(prev => prev + 1);
      } else {
        setCurrentLineIndex(0);
        setCurrentWorkIndex(prev => (prev + 1) % currentPoet.representativeWorks.length);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [showTooltip, currentIndex, currentWorkIndex, currentLineIndex, isAnimating, isTransitioning]);

  // 컴포넌트 언마운트 시 타이머 정리
  React.useEffect(() => {
    return () => {
      if (animationTimerRef.current) clearTimeout(animationTimerRef.current);
    };
  }, []);

  // 현재 시인 메모이제이션
  const currentPoet = useMemo(() => poets[currentIndex], [currentIndex]);
  const selectedPoetData = useMemo(() => 
    poets.find(p => p.id === selectedPoet), [selectedPoet]
  );

  return (
    <div className="min-h-screen relative overflow-visible">
      <Header />
      
      <main className="pt-10 pb-24 px-4" style={{ minHeight: '100vh', backgroundColor: '#f8f6f3' }}>
        <div className="max-w-6xl mx-auto">
          <div className="relative w-full" style={{ overflow: 'visible', marginTop: 0 }}>
            {/* 이전 버튼 */}
            <motion.button
              onClick={prevPoet}
              style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                backgroundColor: '#8B4513',
                color: '#f5f2ed',
                border: 'none',
                borderRadius: '50%',
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                fontSize: '1.5rem',
                fontWeight: 'bold'
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ‹
            </motion.button>

            {/* 다음 버튼 */}
            <motion.button
              onClick={nextPoet}
              style={{
                position: 'absolute',
                right: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                backgroundColor: '#8B4513',
                color: '#f5f2ed',
                border: 'none',
                borderRadius: '50%',
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                fontSize: '1.5rem',
                fontWeight: 'bold'
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ›
            </motion.button>

            {/* 시인 카드 컨테이너 */}
            <div 
              style={{ 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '500px',
                padding: '2rem',
                position: 'relative',
                overflow: 'visible'
              }}
            >
              <AnimatePresence mode="wait">
              <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    backgroundColor: '#f5f2ed',
                    border: '1px solid #e8dcc8',
                    borderRadius: '0.5rem',
                    boxShadow: '0 8px 20px -5px rgba(139, 69, 19, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1)',
                    position: 'relative',
                    overflow: 'hidden',
                    width: '400px',
                    height: '500px',
                    padding: '2rem',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start'
                  }}
                whileHover={{ 
                  y: -5,
                  scale: 1.02,
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)"
                }}
                whileTap={{ scale: 0.98 }}
                  onClick={() => handlePoetSelect(poets[currentIndex].id)}
                  onMouseEnter={handleCardHover}
                  onMouseLeave={handleCardLeave}
                >
                  
                  <div style={{ 
                    width: '120px', 
                    height: '120px', 
                    margin: '0 auto 1.5rem auto', 
                    borderRadius: '50%', 
                    overflow: 'hidden', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    background: 'linear-gradient(to bottom right, #495057, #212529)'
                  }}>
                    <img 
                      src={`/images/poets/${poets[currentIndex].id === '1' ? 'yoon-dongju' : 
                                   poets[currentIndex].id === '2' ? 'kim-sowol' :
                                   poets[currentIndex].id === '3' ? 'han-yongun' :
                                   poets[currentIndex].id === '4' ? 'park-mokwol' :
                                   poets[currentIndex].id === '5' ? 'jo-jihun' :
                                   poets[currentIndex].id === '6' ? 'kim-chunsu' :
                                   poets[currentIndex].id === '7' ? 'jeong-jiyong' :
                                   poets[currentIndex].id === '8' ? 'kim-suyoung' : 'default'}.jpg`}
                      alt={`${poets[currentIndex].name} 시인`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `<span style="color: #f5f2ed; font-weight: bold; font-size: 3rem;">${poets[currentIndex].name.charAt(0)}</span>`;
                        }
                      }}
                    />
                </div>
                
                  <h3 style={{ 
                    fontSize: '2rem', 
                    fontWeight: 'bold', 
                    textAlign: 'center', 
                    marginBottom: '1rem', 
                    color: '#2c1810' 
                  }}>
                    {poets[currentIndex].name}
                </h3>
                
                  <p style={{ 
                    fontSize: '1rem', 
                    textAlign: 'center', 
                    marginBottom: '1.5rem', 
                    color: '#495057',
                    lineHeight: '1.5'
                  }}>
                    {poets[currentIndex].era} • {poets[currentIndex].description}
                  </p>
                   
                  <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    justifyContent: 'center', 
                    gap: '0.75rem', 
                    marginTop: 'auto'
                  }}>
                    {poets[currentIndex].id === '1' && (
                      <>
                        <span style={{ padding: '6px 12px', backgroundColor: '#e8dcc8', color: '#2c1810', fontSize: '14px', borderRadius: '16px', border: '1px solid #d4c4a8' }}>서정적</span>
                        <span style={{ padding: '6px 12px', backgroundColor: '#e8dcc8', color: '#2c1810', fontSize: '14px', borderRadius: '16px', border: '1px solid #d4c4a8' }}>민족적</span>
                        <span style={{ padding: '6px 12px', backgroundColor: '#e8dcc8', color: '#2c1810', fontSize: '14px', borderRadius: '16px', border: '1px solid #d4c4a8' }}>자연</span>
                      </>
                    )}
                    {poets[currentIndex].id === '2' && (
                      <>
                        <span style={{ padding: '6px 12px', backgroundColor: '#e8dcc8', color: '#2c1810', fontSize: '14px', borderRadius: '16px', border: '1px solid #d4c4a8' }}>민족의식</span>
                        <span style={{ padding: '6px 12px', backgroundColor: '#e8dcc8', color: '#2c1810', fontSize: '14px', borderRadius: '16px', border: '1px solid #d4c4a8' }}>서정성</span>
                        <span style={{ padding: '6px 12px', backgroundColor: '#e8dcc8', color: '#2c1810', fontSize: '14px', borderRadius: '16px', border: '1px solid #d4c4a8' }}>항일</span>
                      </>
                    )}
                    {poets[currentIndex].id === '3' && (
                      <>
                        <span style={{ padding: '6px 12px', backgroundColor: '#e8dcc8', color: '#2c1810', fontSize: '14px', borderRadius: '16px', border: '1px solid #d4c4a8' }}>서민적</span>
                        <span style={{ padding: '6px 12px', backgroundColor: '#e8dcc8', color: '#2c1810', fontSize: '14px', borderRadius: '16px', border: '1px solid #d4c4a8' }}>향토</span>
                        <span style={{ padding: '6px 12px', backgroundColor: '#e8dcc8', color: '#2c1810', fontSize: '14px', borderRadius: '16px', border: '1px solid #d4c4a8' }}>현실</span>
                      </>
                    )}
                    {poets[currentIndex].id === '4' && (
                      <>
                        <span style={{ padding: '6px 12px', backgroundColor: '#e8dcc8', color: '#2c1810', fontSize: '14px', borderRadius: '16px', border: '1px solid #d4c4a8' }}>상징적</span>
                        <span style={{ padding: '6px 12px', backgroundColor: '#e8dcc8', color: '#2c1810', fontSize: '14px', borderRadius: '16px', border: '1px solid #d4c4a8' }}>서정적</span>
                        <span style={{ padding: '6px 12px', backgroundColor: '#e8dcc8', color: '#2c1810', fontSize: '14px', borderRadius: '16px', border: '1px solid #d4c4a8' }}>모던</span>
                      </>
                    )}
                    {poets[currentIndex].id === '5' && (
                      <>
                        <span style={{ padding: '6px 12px', backgroundColor: '#e8dcc8', color: '#2c1810', fontSize: '14px', borderRadius: '16px', border: '1px solid #d4c4a8' }}>독립운동</span>
                        <span style={{ padding: '6px 12px', backgroundColor: '#e8dcc8', color: '#2c1810', fontSize: '14px', borderRadius: '16px', border: '1px solid #d4c4a8' }}>민족의식</span>
                        <span style={{ padding: '6px 12px', backgroundColor: '#e8dcc8', color: '#2c1810', fontSize: '14px', borderRadius: '16px', border: '1px solid #d4c4a8' }}>저항</span>
                      </>
                    )}
                    {poets[currentIndex].id === '6' && (
                      <>
                        <span style={{ padding: '6px 12px', backgroundColor: '#e8dcc8', color: '#2c1810', fontSize: '14px', borderRadius: '16px', border: '1px solid #d4c4a8' }}>생명력</span>
                        <span style={{ padding: '6px 12px', backgroundColor: '#e8dcc8', color: '#2c1810', fontSize: '14px', borderRadius: '16px', border: '1px solid #d4c4a8' }}>자연</span>
                        <span style={{ padding: '6px 12px', backgroundColor: '#e8dcc8', color: '#2c1810', fontSize: '14px', borderRadius: '16px', border: '1px solid #d4c4a8' }}>통찰</span>
                      </>
                    )}
                    {poets[currentIndex].id === '7' && (
                      <>
                        <span style={{ padding: '6px 12px', backgroundColor: '#e8dcc8', color: '#2c1810', fontSize: '14px', borderRadius: '16px', border: '1px solid #d4c4a8' }}>순수</span>
                        <span style={{ padding: '6px 12px', backgroundColor: '#e8dcc8', color: '#2c1810', fontSize: '14px', borderRadius: '16px', border: '1px solid #d4c4a8' }}>서정</span>
                        <span style={{ padding: '6px 12px', backgroundColor: '#e8dcc8', color: '#2c1810', fontSize: '14px', borderRadius: '16px', border: '1px solid #d4c4a8' }}>자연</span>
                      </>
                    )}
                    {poets[currentIndex].id === '8' && (
                      <>
                        <span style={{ padding: '6px 12px', backgroundColor: '#e8dcc8', color: '#2c1810', fontSize: '14px', borderRadius: '16px', border: '1px solid #d4c4a8' }}>전통</span>
                        <span style={{ padding: '6px 12px', backgroundColor: '#e8dcc8', color: '#2c1810', fontSize: '14px', borderRadius: '16px', border: '1px solid #d4c4a8' }}>조화</span>
                        <span style={{ padding: '6px 12px', backgroundColor: '#e8dcc8', color: '#2c1810', fontSize: '14px', borderRadius: '16px', border: '1px solid #d4c4a8' }}>고전</span>
                      </>
                    )}
                    {poets[currentIndex].id === '9' && (
                      <>
                        <span style={{ padding: '6px 12px', backgroundColor: '#e8dcc8', color: '#2c1810', fontSize: '14px', borderRadius: '16px', border: '1px solid #d4c4a8' }}>실험적</span>
                        <span style={{ padding: '6px 12px', backgroundColor: '#e8dcc8', color: '#2c1810', fontSize: '14px', borderRadius: '16px', border: '1px solid #d4c4a8' }}>철학적</span>
                        <span style={{ padding: '6px 12px', backgroundColor: '#e8dcc8', color: '#2c1810', fontSize: '14px', borderRadius: '16px', border: '1px solid #d4c4a8' }}>추상</span>
                      </>
                    )}
                </div>
              </motion.div>
              </AnimatePresence>
            </div>

            {/* 인디케이터 */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '0.5rem', 
              marginTop: '2rem' 
            }}>
              {poets.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: index === currentIndex ? '#8B4513' : '#d4c4a8',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* 배너를 최상위 레벨로 이동 */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999,
              pointerEvents: 'none'
            }}
            onAnimationStart={() => console.log('🎬 Banner animation started')}
            onAnimationComplete={() => console.log('✅ Banner animation completed')}
          >
            <div style={{
              backgroundColor: 'rgba(248, 246, 243, 0.95)',
              color: '#2c1810',
              padding: '1.5rem 3rem',
              borderRadius: '0.75rem',
              width: '600px',
              maxWidth: '90vw',
              textAlign: 'center',
              boxShadow: '0 8px 32px rgba(139, 69, 19, 0.2), 0 4px 16px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(139, 69, 19, 0.3)',
              backdropFilter: 'blur(10px)',
              borderTop: '3px solid rgba(139, 69, 19, 0.5)',
              borderBottom: '3px solid rgba(139, 69, 19, 0.5)',
              pointerEvents: 'auto'
            }}>
              <div style={{
                fontSize: '1.2rem',
                fontWeight: '600',
                marginBottom: '1rem',
                color: '#8B4513',
                letterSpacing: '0.5px'
              }}>
                {poets[currentIndex].name}의 {poets[currentIndex].representativeWorks[currentWorkIndex].title}
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${currentWorkIndex}-${currentLineIndex}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  style={{
                    fontSize: '1.1rem',
                    lineHeight: '1.8',
                    fontStyle: 'italic',
                    color: '#495057',
                    minHeight: '2.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  "{poets[currentIndex].representativeWorks[currentWorkIndex].content[currentLineIndex]}"
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 화면 전환 오버레이 - 낙엽 효과 */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(248, 246, 243, 0.6)',
              zIndex: 1500,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column'
            }}
          >
            {/* 낙엽 효과 */}
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#8B4513',
                textAlign: 'center',
                marginBottom: '2rem'
              }}
            >
              {selectedPoetData?.name}의 시가 흩날립니다...
            </motion.div>
            
            {/* 회전하는 낙엽 애니메이션 */}
            <motion.div
              initial={{ rotate: 0, scale: 0 }}
              animate={{ 
                rotate: 360, 
                scale: [0, 1, 1.1, 1],
                y: [0, -15, 0]
              }}
              exit={{ 
                scale: 0,
                opacity: 0,
                transition: { duration: 0.5 }
              }}
              transition={{ 
                duration: 3,
                ease: "easeInOut"
              }}
              onAnimationComplete={() => {
                // 애니메이션 완료 후 페이지 전환
                console.log('🍂 낙엽 애니메이션 완료, 페이지 전환');
                router.push(`/generate?poet=${selectedPoet}`);
              }}
              style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(45deg, #8B4513, #A0522D)',
                borderRadius: '50% 0 50% 50%',
                transform: 'rotate(45deg)',
                boxShadow: '0 4px 12px rgba(139, 69, 19, 0.3)'
              }}
            />
            
            {/* 추가 낙엽들 */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: Math.random() * window.innerWidth - window.innerWidth / 2,
                  y: -100,
                  rotate: 0,
                  opacity: 0
                }}
                animate={{ 
                  x: Math.random() * window.innerWidth - window.innerWidth / 2,
                  y: window.innerHeight + 100,
                  rotate: 360,
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: 4 + Math.random() * 3,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
                style={{
                  position: 'absolute',
                  width: '30px',
                  height: '30px',
                  background: 'linear-gradient(45deg, #A0522D, #CD853F)',
                  borderRadius: '50% 0 50% 50%',
                  transform: 'rotate(45deg)',
                  boxShadow: '0 2px 8px rgba(139, 69, 19, 0.2)'
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 바람에 날리는 시 구절들 */}
      <AnimatePresence>
        {isAnimating && isTransitioning && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {flyingVerses.map((verse) => (
              <FlyingVerse
                key={verse.id}
                verse={verse}
                onAnimationComplete={() => {
                  // 애니메이션 완료 처리
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
} 