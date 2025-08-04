import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '시 생성 AI 플랫폼',
  description: '한국의 대표 시인들의 스타일로 시를 생성하는 AI 플랫폼',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  )
} 