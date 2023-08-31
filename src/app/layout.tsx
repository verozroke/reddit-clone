import Navbar from '@/components/Navbar'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/Toaster'
import React from 'react'
import Providers from './../components/Providers';

export const metadata = {
  title: 'Breadit',
  description: 'A Reddit clone built with Next.js and TypeScript.',
}


const inter = Inter({
  subsets: ['cyrillic-ext']
})

export default function RootLayout({
  children,
  authModal,
}: {
  children: React.ReactNode
  authModal: React.ReactNode
}) {
  return (
    <html lang='en' className={cn('bg-white text-slate-900 antialiased light', inter.className)}>
      <body className='min-h-screen bg-slate-50 antialiased'>
        <Providers>
          {/* @ts-expect-error server component */}
          <Navbar />
          {authModal}
          <div className="container max-w-7xl mx-auto h-full pt-24">
            {children}
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
