'use client'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent
} from '@/components/ui/hover-card'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Loading from '@/components/Loading/Loading'

const HomePage = () => {
  const { user, isGetUserDataLoading } = useSelector(state => state.user)

  const [typedText, setTypedText] = useState('')
  const welcomeText = `Welcome ${user?.name}`

  useEffect(() => {
    let currentIndex = 0
    const typingInterval = setInterval(() => {
      if (currentIndex < welcomeText.length) {
        setTypedText(welcomeText.slice(0, currentIndex + 1))
        currentIndex++
      } else {
        clearInterval(typingInterval)
      }
    }, 100)

    return () => clearInterval(typingInterval)
  }, [])

  const menuItems = [
    { title: 'Dashboard', href: '/', icon: '🏠' },
    { title: 'My Characters', href: '/character-list', icon: '👥' },
    { title: 'Character Search', href: '/character', icon: '🔍' },
    { title: 'Episodes', href: '/episodes', icon: '📺' },
    { title: 'Locations', href: '/locations', icon: '🌍' },
    { title: 'Chat with Character', href: '/chat', icon: '💬' }
  ]

  return (
    <>
      {isGetUserDataLoading ? (
        <Loading />
      ) : (
        <div>
          <Card className='mb-6 p-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900'>
            <motion.h2
              className='text-2xl font-bold mb-2'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {typedText}
            </motion.h2>
            <motion.p
              className='text-muted-foreground'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Explore the infinite dimensions of the Rick and Morty universe.
            </motion.p>
          </Card>

          {/* Content Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {menuItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Link href={item.href}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Card className='p-6 hover:shadow-xl transition-all duration-300 cursor-pointer bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-800'>
                          <motion.div
                            className='text-3xl mb-4'
                            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                            transition={{ duration: 0.5 }}
                          >
                            {item.icon}
                          </motion.div>
                          <h3 className='text-xl font-semibold mb-2'>
                            {item.title}
                          </h3>
                          <p className='text-muted-foreground'>
                            Explore {item.title.toLowerCase()} from the
                            multiverse.
                          </p>
                        </Card>
                      </motion.div>
                    </Link>
                  </HoverCardTrigger>
                  <HoverCardContent className='w-80'>
                    <div className='space-y-2'>
                      <h4 className='text-sm font-semibold'>
                        {item.title} Portal
                      </h4>
                      <p className='text-sm text-muted-foreground'>
                        Click to dive into the {item.title.toLowerCase()}{' '}
                        dimension and discover amazing adventures!
                      </p>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default HomePage
