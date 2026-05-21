import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { BottomNav } from '@/components/layout/BottomNav'
import { RealtimeProvider } from '@/components/layout/RealtimeProvider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'WM 2026 Tippspiel',
  description: 'Gib deine Tipps ab und gewinne die WM 2026 Gruppenrangliste.',
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#1D4ED8',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className={inter.variable}>
      <body className="bg-gray-50 font-sans antialiased">
        <RealtimeProvider>
          <main className="min-h-screen safe-bottom">
            {children}
          </main>
          <BottomNav />
        </RealtimeProvider>
      </body>
    </html>
  )
}
