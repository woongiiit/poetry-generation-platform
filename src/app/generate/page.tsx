'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import { getPoetById } from '@/lib/data';
import { Poet } from '@/types';

function GenerateContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const poetId = searchParams.get('poet');
  
  const [poet, setPoet] = useState<Poet | null>(null);
  const [subject, setSubject] = useState('');
  const [style, setStyle] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (poetId) {
      const selectedPoet = getPoetById(poetId);
      setPoet(selectedPoet || null);
    }
  }, [poetId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !poet) return;

    setIsGenerating(true);

    // 실제 API 호출 대신 시뮬레이션
    setTimeout(() => {
      const generatedPoetry = {
        id: Date.now().toString(),
        title: `${subject}에 대한 시`,
        content: `${poet.name}의 스타일로 ${subject}에 대한 시가 생성되었습니다.\n\n여기에 실제 생성된 시 내용이 들어갑니다.\n\n시인의 문체와 어조를 따라\n아름다운 시가 완성되었습니다.`,
        poetName: poet.name,
        subject: subject,
        createdAt: new Date().toISOString()
      };

      // 생성된 시를 세션스토리지에 저장하고 결과 페이지로 이동
      sessionStorage.setItem('generatedPoetry', JSON.stringify(generatedPoetry));
      router.push('/result');
    }, 2000);
  };

  if (!poet) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-ink-800 mb-4">시인을 먼저 선택해주세요</h1>
          <button 
            onClick={() => router.push('/poets')}
            className="hanji-button"
          >
            시인 선택하기
          </button>
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
            }}>소재를 입력하세요</h1>
            <p style={{ fontSize: '1.25rem', color: '#495057' }}>
              {poet.name}의 스타일로 어떤 소재에 대한 시를 생성하시겠습니까?
            </p>
          </motion.div>

          <motion.div
            style={{
              backgroundColor: '#f5f2ed',
              border: '1px solid #e8dcc8',
              borderRadius: '0.5rem',
              padding: '2rem',
              marginBottom: '2rem',
              boxShadow: '0 8px 20px -5px rgba(139, 69, 19, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1)'
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{
                width: '4rem',
                height: '4rem',
                background: 'linear-gradient(to bottom right, #495057, #212529)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ color: '#f5f2ed', fontWeight: 'bold', fontSize: '1.25rem' }}>
                  {poet.name.charAt(0)}
                </span>
              </div>
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2c1810' }}>{poet.name}</h2>
                <p style={{ color: '#495057' }}>{poet.description}</p>
              </div>
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div>
              <label htmlFor="subject" style={{ display: 'block', fontSize: '1.125rem', fontWeight: '600', color: '#2c1810', marginBottom: '0.75rem' }}>
                시의 소재 *
              </label>
              <textarea
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="예: 봄비, 고향, 사랑, 바다, 가을 낙엽..."
                style={{
                  width: '100%',
                  height: '8rem',
                  resize: 'none',
                  backgroundColor: '#f5f2ed',
                  border: '1px solid #e8dcc8',
                  borderRadius: '0.5rem',
                  padding: '1rem',
                  fontSize: '1rem',
                  color: '#2c1810',
                  outline: 'none'
                }}
                required
              />
              <p style={{ fontSize: '0.875rem', color: '#495057', marginTop: '0.5rem' }}>
                시의 주제나 소재를 자유롭게 입력해주세요.
              </p>
            </div>

            <div>
              <label htmlFor="style" style={{ display: 'block', fontSize: '1.125rem', fontWeight: '600', color: '#2c1810', marginBottom: '0.75rem' }}>
                시의 분위기 (선택사항)
              </label>
              <select
                id="style"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                style={{
                  width: '100%',
                  backgroundColor: '#f5f2ed',
                  border: '1px solid #e8dcc8',
                  borderRadius: '0.5rem',
                  padding: '1rem',
                  fontSize: '1rem',
                  color: '#2c1810',
                  outline: 'none'
                }}
              >
                <option value="">분위기를 선택하세요</option>
                <option value="melancholic">우울하고 서정적인</option>
                <option value="joyful">기쁘고 밝은</option>
                <option value="nostalgic">그리움과 향수를 담은</option>
                <option value="romantic">사랑과 로맨틱한</option>
                <option value="nature">자연을 노래하는</option>
              </select>
            </div>

            <motion.button
              type="submit"
              disabled={!subject.trim() || isGenerating}
              style={{
                width: '100%',
                padding: '1rem 2rem',
                borderRadius: '0.5rem',
                fontWeight: '600',
                fontSize: '1.125rem',
                transition: 'all 0.3s ease',
                backgroundColor: !subject.trim() || isGenerating ? '#d1d5db' : '#2c1810',
                color: !subject.trim() || isGenerating ? '#6b7280' : '#f5f2ed',
                cursor: !subject.trim() || isGenerating ? 'not-allowed' : 'pointer',
                border: 'none'
              }}
              whileHover={!subject.trim() || isGenerating ? {} : { scale: 1.02 }}
              whileTap={!subject.trim() || isGenerating ? {} : { scale: 0.98 }}
            >
              {isGenerating ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '1.25rem', height: '1.25rem', border: '2px solid #f5f2ed', borderTop: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                  <span>시를 생성하고 있습니다...</span>
                </div>
              ) : (
                '시 생성하기'
              )}
            </motion.button>
          </motion.form>

          {isGenerating && (
            <motion.div
              style={{ textAlign: 'center', marginTop: '2rem' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div style={{
                backgroundColor: '#f5f2ed',
                border: '1px solid #e8dcc8',
                borderRadius: '0.5rem',
                padding: '1.5rem',
                boxShadow: '0 8px 20px -5px rgba(139, 69, 19, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1)'
              }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#2c1810', marginBottom: '1rem' }}>
                  {poet.name}의 스타일로 시를 생성하고 있습니다
                </h3>
                <p style={{ color: '#495057' }}>
                  AI가 {poet.name}의 문체와 어조를 분석하여<br />
                  "{subject}"에 대한 아름다운 시를 만들어가고 있습니다...
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function GeneratePage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', backgroundColor: '#f8f6f3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '3rem', height: '3rem', border: '3px solid #e8dcc8', borderTop: '3px solid #2c1810', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 1rem' }}></div>
          <p style={{ color: '#495057' }}>페이지를 로딩하고 있습니다...</p>
        </div>
      </div>
    }>
      <GenerateContent />
    </Suspense>
  );
} 