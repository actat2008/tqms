import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'TQMS - Tələbə Qeydiyyat Sistemi',
  description: 'Azərbaycan universitetinə yeni qəbul olunan tələbələr üçün məlumat toplama sistemi',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="az">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
