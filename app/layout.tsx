import { ClientOnly, Navbar } from '@/components'
import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import RegisterModal from '@/components/modals/RegisterModal'
import Modal from '@/components/modals/Modal'
import LoginModal from '@/components/modals/LoginModal'
import getCurrentUser from './actions/getCurrentUser';
import RentModal from '@/components/modals/RentModal'


const inter = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Air BNB clone',
  description: 'Air BNB Clone',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const currentUser = await getCurrentUser();
  return (
    <html lang="en"> 
      <body className={inter.className}>
        <ClientOnly> 
          <RentModal/>
          <LoginModal/>
          <RegisterModal/>
          <Navbar currentUser={currentUser}/>
        </ClientOnly>
        <div className='pb-20 pt-28'>
          {children}
        </div>
      </body>
    </html>
  )
}
