import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Created with Reffect',
  description: 'Farham Abi',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en'>
      <body className={`${inter.className} px-[calc(100%*0.1)] my-10`}>
        <Navbar className='mb-10' />
        <main>{children}</main>
      </body>
    </html>
  )
}
