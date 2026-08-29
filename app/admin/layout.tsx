import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Panel - TQMS',
  description: 'Admin paneli',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="az">
      <body>
        {children}
      </body>
    </html>
  )
}
