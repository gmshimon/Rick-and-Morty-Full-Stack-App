'use client'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'

const CharacterCard = ({ character }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className='overflow-hidden hover:shadow-lg transition-shadow'>
        <div className='aspect-square relative'>
          <img
            src={character.image}
            alt={character.name}
            className='w-full h-full object-cover'
          />
          <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4'>
            <h3 className='text-xl font-bold text-white truncate'>
              {character.name}
            </h3>
          </div>
        </div>

        <div className='p-4 space-y-2'>
          <div className='flex items-center gap-2'>
            <span className={`size-2 rounded-full ${
              character.status === 'Alive'
                ? 'bg-green-500'
                : character.status === 'Dead'
                ? 'bg-red-500'
                : 'bg-gray-500'
            }`} />
            <span className='text-sm text-muted-foreground'>
              {character.status} - {character.species}
            </span>
          </div>

          <div className='space-y-1'>
            <p className='text-sm text-muted-foreground'>
              <span className='font-medium'>Gender:</span> {character.gender}
            </p>
            <p className='text-sm text-muted-foreground'>
              <span className='font-medium'>Origin:</span> {character.origin.name}
            </p>
            <p className='text-sm text-muted-foreground'>
              <span className='font-medium'>Location:</span> {character.location.name}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export default CharacterCard