'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { GeneratedPoetry } from '@/types';

export default function ResultPage() {
  const router = useRouter();
  const [poetry, setPoetry] = useState<GeneratedPoetry | null>(null);

  useEffect(() => {
    const storedPoetry = sessionStorage.getItem('generatedPoetry');
    if (storedPoetry) {
      setPoetry(JSON.parse(storedPoetry));
    } else {
      // 저장된 시가 없으면 홈으로 이동
      router.push('/');
    }
  }, [router]);

  const handleNewPoetry = () => {
    sessionStorage.removeItem('generatedPoetry');
    router.push('/poets');
  };

  const handleShare = () => {
    if (poetry) {
      const text = `${poetry.title}\n\n${poetry.content}\n\n- ${poetry.poetName} 스타일로 생성된 시`;
      navigator.clipboard.writeText(text);
      alert('시가 클립보드에 복사되었습니다!');
    }
  };

  if (!poetry) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-ink-800 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-ink-600">시를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f6f3' }}>
      <Header />
      
      <main style={{ paddingTop: '5rem', paddingBottom: '2.5rem', paddingLeft: '1rem', paddingRight: '1rem' }}>
        <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
          <motion.div
            style={{ textAlign: 'center', marginBottom: '3rem' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 style={{ 
              fontSize: '3rem', 
              fontWeight: 'bold', 
              marginBottom: '1.5rem',
              background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 50%, #CD853F 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>생성된 시</h1>
            <p style={{ fontSize: '1.25rem', color: '#495057' }}>
              {poetry.poetName}의 스타일로 "{poetry.subject}"에 대한 시가 완성되었습니다
            </p>
          </motion.div>

          <motion.div
            style={{
              backgroundColor: '#f5f2ed',
              border: '1px solid #e8dcc8',
              borderRadius: '0.5rem',
              padding: '3rem',
              marginBottom: '2rem',
              boxShadow: '0 8px 20px -5px rgba(139, 69, 19, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1)'
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#2c1810', marginBottom: '1rem' }}>{poetry.title}</h2>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', color: '#495057' }}>
                <span>{poetry.poetName} 스타일</span>
                <span>•</span>
                <span>{poetry.subject}</span>
                <span>•</span>
                <span>{new Date(poetry.createdAt).toLocaleDateString('ko-KR')}</span>
              </div>
            </div>

            <motion.div
              style={{ textAlign: 'center', lineHeight: '1.6' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              {poetry.content.split('\n').map((line, index) => (
                <motion.p
                  key={index}
                  style={{ marginBottom: '1rem', color: '#2c1810' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                >
                  {line}
                </motion.p>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'center', alignItems: 'center' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.button
              onClick={handleShare}
              style={{
                backgroundColor: '#f0ebe0',
                color: '#2c1810',
                border: '1px solid #d4c4a8',
                borderRadius: '0.5rem',
                padding: '1rem 2rem',
                fontSize: '1.125rem',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 4px 6px -1px rgba(139, 69, 19, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                transition: 'all 0.3s ease'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              시 공유하기
            </motion.button>
            
            <motion.button
              onClick={handleNewPoetry}
              style={{
                backgroundColor: '#2c1810',
                color: '#f5f2ed',
                border: 'none',
                borderRadius: '0.5rem',
                padding: '1rem 2rem',
                fontSize: '1.125rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              새로운 시 만들기
            </motion.button>
          </motion.div>

          <motion.div
            style={{ marginTop: '3rem', textAlign: 'center' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div style={{
              backgroundColor: '#f5f2ed',
              border: '1px solid #e8dcc8',
              borderRadius: '0.5rem',
              padding: '1.5rem',
              boxShadow: '0 8px 20px -5px rgba(139, 69, 19, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#2c1810', marginBottom: '1rem' }}>
                시에 대한 설명
              </h3>
              <p style={{ color: '#495057', lineHeight: '1.6' }}>
                이 시는 {poetry.poetName}의 문체와 어조를 분석하여 AI가 생성한 작품입니다. 
                {poetry.subject}를 소재로 하여 {poetry.poetName}의 특유한 서정성과 표현 기법을 
                담아내려 노력했습니다. 실제 시인의 작품과는 차이가 있을 수 있으며, 
                이는 AI가 학습한 패턴을 바탕으로 한 창작 결과물입니다.
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
} 