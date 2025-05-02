'use client'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

const HomePage = () => {
  const menuItems = [
    { title: 'Dashboard', href: '/dashboard', icon: '🏠' },
    { title: 'My Characters', href: '/character-list', icon: '👥' },
    { title: 'Character Search', href: '/character', icon: '🔍' },
    { title: 'Episodes', href: '/episodes', icon: '📺' },
    { title: 'Locations', href: '/locations', icon: '🌍' }
  ]

  return (
    <div>
      <Card className='mb-6 p-6'>
        <h2 className='text-2xl font-bold mb-2'>Welcome Shimon</h2>
        <p className='text-muted-foreground'>
          Explore the infinite dimensions of the Rick and Morty universe.
        </p>
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
            <Link href={item.href}>
              <Card className='p-6 hover:shadow-lg transition-shadow cursor-pointer'>
                <div className='text-3xl mb-4'>{item.icon}</div>
                <h3 className='text-xl font-semibold mb-2'>{item.title}</h3>
                <p className='text-muted-foreground'>
                  Explore {item.title.toLowerCase()} from the multiverse.
                </p>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default HomePage
