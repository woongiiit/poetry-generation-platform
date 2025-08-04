'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Header() {
  return (
    <motion.header 
      style={{
        width: '100%',
        padding: '1.5rem 1rem',
        backgroundColor: 'rgba(245, 242, 237, 0.8)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid #e8dcc8'
      }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div style={{ maxWidth: '72rem', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <motion.div 
            style={{
              width: '2.5rem',
              height: '2.5rem',
              background: 'linear-gradient(to bottom right, #495057, #212529)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span style={{ color: '#f5f2ed', fontWeight: 'bold', fontSize: '1.125rem' }}>詩</span>
          </motion.div>
          <div>
            <h1 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 50%, #CD853F 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>시 생성 AI</h1>
            <p style={{ fontSize: '0.875rem', color: '#495057' }}>Poetry Generation Platform</p>
          </div>
        </Link>
        
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <Link href="/" style={{ color: '#495057', textDecoration: 'none', transition: 'color 0.3s ease' }}>
            홈
          </Link>
          <Link href="/poets" style={{ color: '#495057', textDecoration: 'none', transition: 'color 0.3s ease' }}>
            시인 선택
          </Link>
        </nav>
      </div>
    </motion.header>
  );
} 