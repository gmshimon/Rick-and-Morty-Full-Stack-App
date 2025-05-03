'use client'
import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import {
  getMyCharacter,
} from '@/lib/Features/characterSlice'
import Loading from '@/components/Loading/Loading'
import ChatWindow from '@/components/ChatWindow/ChatWindow'

export default function CharacterSelectionPage() {
  const { myCharacters, getCharacterLoading } = useSelector(state => state.character)
  const [selectedCharacter, setSelectedCharacter] = useState(null)
  const [showChatWindow, setShowChatWindow] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMyCharacter())
  }, [dispatch])

  const handleCharacterSelect = (character) => {
    setSelectedCharacter(character)
    setShowChatWindow(true)
  }

  return (
    <div className="p-6">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">Select a Character</h1>
        
        {/* <div className="mb-6">
          <Input 
            placeholder="Search characters..." 
            className="w-full"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div> */}
        
        {getCharacterLoading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {myCharacters?.map((character, index) => (
              <motion.div
                key={character.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card 
                  className={`p-4 cursor-pointer transition-all duration-300 ${selectedCharacter?.id === character.id ? 'bg-secondary border-primary border-2' : 'hover:border-primary hover:border'}`}
                  onClick={() => handleCharacterSelect(character)}
                >
                  <div className="flex items-center gap-4">
                    <motion.img 
                      src={character.image} 
                      className="rounded-full w-12 h-12 object-cover"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 1 }}
                    />
                    <div>
                      <h3 className="font-semibold">{character.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className={`size-2 rounded-full ${
                          character.status === 'Alive'
                            ? 'bg-green-500'
                            : character.status === 'Dead'
                            ? 'bg-red-500'
                            : 'bg-gray-500'
                        }`} />
                        <p className="text-sm text-muted-foreground">
                          {character.status} - {character.species}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Gender:</span> {character.gender}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Origin:</span> {character.origin?.name}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
        
       
      </Card>
      {showChatWindow && selectedCharacter && (
        <ChatWindow 
          character={selectedCharacter} 
          onClose={() => setShowChatWindow(false)}
        />
      )}
    </div>
  )
}