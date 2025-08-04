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
                일곱 걸음을 걷는 동안 시를 짓는다.
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
      </main>
    </div>
  );
} 