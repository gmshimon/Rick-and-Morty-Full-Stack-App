'use client'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'

const EpisodeCard = ({ episode}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02 }}
      className='group'
    >
      <Card className='p-6 hover:shadow-lg transition-all duration-300 group-hover:border-primary h-[28rem] flex flex-col'>
        <div className='relative space-y-4 flex-1'>
          {/* Episode Header */}
          <div className='flex justify-between items-start'>
            <div>
              <h3 className='text-xl font-bold text-primary'>{episode.title}</h3>
              <p className='text-sm text-muted-foreground'>
                Episode {episode.code}
              </p>
            </div>
            <Badge variant='outline' className='text-sm'>
              Season {episode.season}
            </Badge>
          </div>

          {/* Episode Details */}
          <div className='space-y-2'>
            <p className='text-muted-foreground'>{episode.description}</p>
            <div className='flex items-center gap-2 text-sm text-muted-foreground'>
              <span className='font-medium'>Air Date:</span>
              {episode.airDate && (
                <span>
                  {format(new Date(episode.airDate), 'MMMM dd, yyyy')}
                </span>
              )}
            </div>
          </div>

          {/* Tags */}
          {episode.tags && episode.tags.length > 0 && (
            <div className='flex flex-wrap gap-2'>
              {episode.tags.map((tag, index) => (
                <Badge key={index} variant='secondary' className='text-xs'>
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Thumbnail */}
          {episode.thumbnail && (
            <motion.img
              src={'https://pyxis.nymag.com/v1/imgs/dcb/698/eea6b585943cfb9f9ce6048e514f174dbc-The-Old-Man-and-the-Seat.rhorizontal.w700.jpg'}
              alt={`${episode.title} thumbnail`}
              className='w-full h-28 object-cover rounded-md absolute bottom-0'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            />
          )}
        </div>
   
      </Card>

      
    </motion.div>
  )
}

export default EpisodeCard