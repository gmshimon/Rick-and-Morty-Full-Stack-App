'use client'
import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { fetchMessages, reset, sendMessage } from '@/lib/Features/messageSlice'

export default function ChatWindow ({ character, onClose }) {
  const {
    messages,
    isFetchLoading,
    isSendMessageLoading,
    isSendMessageSuccess
  } = useSelector(state => state.messages)
  const dispatch = useDispatch()
  const [newMessage, setNewMessage] = useState('')
  const endRef = useRef()

  useEffect(() => {
    if (!character?._id) return
    dispatch(reset())
    dispatch(fetchMessages(character._id))
  }, [character, dispatch, isSendMessageSuccess])

  // On character change: clear history and show initial greeting
  useEffect(() => {
    dispatch(reset())
  }, [character, dispatch])

  // Always scroll to bottom when messages update
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    const text = newMessage.trim()
    if (!text) return
    dispatch(
      sendMessage({
        characterId: character._id || character.id,
        text
      })
    )
    setNewMessage('')
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // Combine an initial greeting with Redux-driven chat
  const combined = [
    {
      id: 'init',
      role: 'assistant',
      content: `Hi there! I'm ${character.name}. Ready for an adventure?`
    },
    ...messages
  ]

  return (
    <motion.div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Card className='w-full max-w-5xl h-[100vh] flex flex-col'>
        {/* Header */}
        <div className='p-4 border-b flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <Avatar>
              <AvatarImage src={character.image} />
              <AvatarFallback>{character.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className='font-semibold'>{character.name}</h3>
              <p className='text-sm text-muted-foreground'>
                {character.species}
              </p>
            </div>
          </div>
          <Button variant='ghost' size='sm' onClick={onClose}>
            ✕
          </Button>
        </div>

        {/* Messages */}
        <div className='flex-1 p-4 overflow-y-auto space-y-4'>
          {combined.map(msg => (
            <motion.div
              key={msg.id}
              className={`flex ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div
                className={`
                max-w-3xl rounded-lg px-4 py-2
                ${
                  msg.role === 'user'
                    ? 'bg-primary text-primary-foreground rounded-tr-none'
                    : 'bg-secondary text-secondary-foreground rounded-tl-none'
                }`}
              >
                {msg.content}
                <div className="text-xs text-muted-foreground mt-1">
                  {new Date(msg.createdAt || Date.now()).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </div>
            </motion.div>
          ))}
          <div ref={endRef} />
        </div>

        {/* Input */}
        <div className='p-4 border-t flex gap-2'>
          <Input
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder='Type your message...'
            className='flex-1'
            disabled={isSendMessageLoading || isFetchLoading}
          />
          <Button
            onClick={handleSend}
            disabled={isSendMessageLoading || isFetchLoading}
            className="relative"
          >
            {isSendMessageLoading || isFetchLoading ? (
              <>
                <span className="animate-pulse">…typing</span>
                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-primary/20 rounded-full overflow-hidden">
                  <span className="block h-full bg-primary animate-[progress_2s_linear_infinite] origin-left"></span>
                </span>
              </>
            ) : 'Send'}
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}
