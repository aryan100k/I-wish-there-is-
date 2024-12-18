import '../styles/globals.css'
import type { Metadata } from 'next'
import { Providers } from '@/components/providers'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'I Wish There Is...',
  description: 'Share and discover innovative ideas',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <Providers>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
