import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Skill Forge',
  description: 'A platform for skill development and learning. Join us to enhance your skills and knowledge.'  
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
