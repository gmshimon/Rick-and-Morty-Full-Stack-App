'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import CurrentUser from '@/Utils/CurrentUser'

const MainLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const menuItems = [
    { title: 'Dashboard', href: '/', icon: '🏠' },
    { title: 'My Characters', href: '/character-list', icon: '👥' },
    { title: 'Episodes', href: '/episodes', icon: '📺' },
    { title: 'Locations', href: '/locations', icon: '🌍' },
    { title: 'Profile', href: '/profile', icon: '👤' },
  ]

  const sidebarVariants = {
    open: {
      width: '240px',
      transition: { duration: 0.3, ease: 'easeOut' }
    },
    closed: {
      width: '60px',
      transition: { duration: 0.3, ease: 'easeIn' }
    }
  }

  const textVariants = {
    open: { opacity: 1, x: 0, display: 'block' },
    closed: { opacity: 0, x: -10, display: 'none' }
  }
CurrentUser()
  return (
    <div className='flex min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5'>
      {/* Sidebar */}
      <motion.div
        variants={sidebarVariants}
        initial='open'
        animate={isSidebarOpen ? 'open' : 'closed'}
        className='fixed left-0 top-0 h-full bg-card shadow-lg z-50 overflow-hidden'
      >
        <div className='p-4 flex items-center justify-between'>
          <motion.h1
            variants={textVariants}
            initial='open'
            animate={isSidebarOpen ? 'open' : 'closed'}
            className='font-bold text-xl'
          >
            Rick & Morty
          </motion.h1>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className='rounded-full'
          >
            {isSidebarOpen ? '◀' : '▶'}
          </Button>
        </div>

        <nav className='mt-4'>
          {menuItems.map((item, index) => (
            <Link
              key={item.title}
              href={item.href}
              className='flex items-center px-4 py-2 hover:bg-accent transition-colors'
            >
              <span className='text-xl'>{item.icon}</span>
              <motion.span
                variants={textVariants}
                initial='open'
                animate={isSidebarOpen ? 'open' : 'closed'}
                className='ml-2'
              >
                {item.title}
              </motion.span>
            </Link>
          ))}
        </nav>
      </motion.div>

      {/* Main Content */}
      <main className={`flex-1 p-6 ${isSidebarOpen ? 'ml-[240px]' : 'ml-[60px]'} transition-all duration-300`}>
        <div className='max-w-7xl mx-auto'>
          {children}
        </div>
      </main>
    </div>
  )
}

export default MainLayout