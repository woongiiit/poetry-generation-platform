'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/Header';

export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Header />
      
      <main style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Hero Section */}
        <section style={{ 
          position: 'relative', 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          padding: '0 1rem',
          backgroundColor: '#f8f6f3'
        }}>
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(245, 242, 237, 0.5)' }}></div>
          
                      <motion.div 
              style={{ 
                position: 'relative', 
                zIndex: 10, 
                textAlign: 'center', 
                maxWidth: '64rem', 
                margin: '0 auto' 
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1 
                style={{ 
                  fontSize: 'clamp(3rem, 8vw, 6rem)', 
                  fontWeight: 'bold', 
                  marginBottom: '2rem',
                  background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 50%, #CD853F 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                七步成詩
              </motion.h1>
              
              <motion.p 
                style={{ 
                  fontSize: 'clamp(1.25rem, 2vw, 1.5rem)', 
                  color: '#495057', 
                  marginBottom: '3rem', 
                  lineHeight: '1.6' 
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                시인들과 함께 시를 만들어보세요,
              </motion.p>
            
            <motion.div 
              style={{ display: 'flex', justifyContent: 'center' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link href="/poets">
                <motion.button 
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
                  시인 선택하기
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section style={{ 
          padding: '5rem 1rem', 
          backgroundColor: 'rgba(245, 242, 237, 0.5)' 
        }}>
          <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
            <motion.h2 
              style={{ 
                fontSize: '2.25rem', 
                fontWeight: 'bold', 
                textAlign: 'center', 
                marginBottom: '4rem',
                background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 50%, #CD853F 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              서비스 특징
            </motion.h2>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '2rem' 
            }}>
              {[
                {
                  title: "다양한 시인",
                  description: "김소월, 윤동주, 백석 등 한국의 대표 시인들의 스타일을 학습했습니다.",
                  icon: "🎭"
                },
                {
                  title: "개인화된 시",
                  description: "입력하신 소재를 바탕으로 개인만의 특별한 시를 생성합니다.",
                  icon: "✨"
                },
                {
                  title: "고품질 결과",
                  description: "AI 기술을 활용하여 자연스럽고 아름다운 시를 제공합니다.",
                  icon: "🌟"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  style={{
                    backgroundColor: '#f5f2ed',
                    border: '1px solid #e8dcc8',
                    borderRadius: '0.5rem',
                    padding: '2rem',
                    textAlign: 'center',
                    boxShadow: '0 8px 20px -5px rgba(139, 69, 19, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1)'
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div style={{ fontSize: '2.25rem', marginBottom: '1rem' }}>{feature.icon}</div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#2c1810' }}>{feature.title}</h3>
                  <p style={{ color: '#495057', lineHeight: '1.6' }}>{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{ padding: '5rem 1rem' }}>
          <div style={{ maxWidth: '64rem', margin: '0 auto', textAlign: 'center' }}>
            <motion.h2 
              style={{ 
                fontSize: '2.25rem', 
                fontWeight: 'bold', 
                marginBottom: '2rem',
                background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 50%, #CD853F 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              지금 시작해보세요
            </motion.h2>
            
            <motion.p 
              style={{ fontSize: '1.25rem', color: '#495057', marginBottom: '3rem' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              당신만의 특별한 시를 만들어보세요
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link href="/poets">
                <motion.button 
                  style={{
                    backgroundColor: '#f0ebe0',
                    color: '#2c1810',
                    border: '1px solid #d4c4a8',
                    borderRadius: '0.5rem',
                    padding: '1.25rem 2.5rem',
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    boxShadow: '0 4px 6px -1px rgba(139, 69, 19, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    transition: 'all 0.3s ease'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  시인 선택하기
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
} 