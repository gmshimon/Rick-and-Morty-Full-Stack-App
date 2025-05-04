'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog'
import {
  getMyCharacter,
  getSingleCharacter
} from '@/lib/Features/characterSlice'
import Loading from '@/components/Loading/Loading'
import {
  getRelation,
  predictRelation,
  reset
} from '@/lib/Features/relationSlice'

const CharacterRelationshipPage = () => {
  const {
    getSingleCharacterLoading,
    singleCharacter,
    myCharacters,
    getCharacterLoading,
    getRelationLoading,
    createRelationError,
    createRelationSuccess
  } = useSelector(state => state.character)
  const { createRelationLoading, relations } = useSelector(
    state => state.relation
  )
  const { id } = useParams()
  const dispatch = useDispatch()

  const [currentCharacter, setCurrentCharacter] = useState(null)
  const [selectedCharacter, setSelectedCharacter] = useState(null)
  const [isAddingRelation, setIsAddingRelation] = useState(false)

  useEffect(() => {
    dispatch(getMyCharacter())
    dispatch(getSingleCharacter(id))
    dispatch(getRelation(id))
  }, [dispatch, id])

  useEffect(() => {
    if (createRelationError) {
      toast.error('Failed to predict relations', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark'
      })
      dispatch(reset())
    }
    if (createRelationSuccess) {
      toast.success('Relation has been predicted', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark'
      })
      dispatch(reset())
    }
  }, [dispatch, createRelationSuccess, createRelationError])

  useEffect(() => {
    if (myCharacters && id) {
      const character = myCharacters.find(char => char._id === id)
      setCurrentCharacter(character)
    }
  }, [myCharacters, id])

  const handleAddRelationship = () => {
    if (!selectedCharacter) return
    const data = {
      charAId: id,
      charBId: selectedCharacter?._id
    }
    dispatch(predictRelation(data))
    setSelectedCharacter(null)
    setIsAddingRelation(false)
  }

  if (
    getCharacterLoading ||
    getSingleCharacterLoading ||
    createRelationLoading ||
    getRelationLoading
  ) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Loading />
      </div>
    )
  }

  if (!singleCharacter) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Card className='p-6'>
          <h2 className='text-xl font-semibold'>Character not found</h2>
        </Card>
      </div>
    )
  }
  return (
    <div className='p-6 space-y-6'>
      <ToastContainer />

      {/* Character Profile */}
      <Card className='p-6'>
        <div className='flex items-center gap-6'>
          <motion.img
            src={singleCharacter.image}
            alt={singleCharacter.name}
            className='w-32 h-32 rounded-full object-cover'
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring' }}
          />
          <div>
            <h1 className='text-3xl font-bold'>{singleCharacter.name}</h1>
            <p className='text-muted-foreground'>
              {singleCharacter.species} - {singleCharacter.status}
            </p>
            <p className='text-muted-foreground'>
              Origin: {singleCharacter.origin}
            </p>
          </div>
        </div>
      </Card>

      {/* Backstory Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className='p-6'>
          <h2 className='text-2xl font-bold mb-4'>Character Backstory</h2>
          <div className='prose prose-lg max-w-none'>
            <p className='text-lg leading-relaxed text-muted-foreground'>
              {singleCharacter.backstory ||
                'No backstory available for this character yet.'}
            </p>
          </div>
        </Card>
      </motion.div>

      {/* Relationships Section */}
      <Card className='p-6'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-2xl font-bold'>Relationships</h2>
          <Dialog open={isAddingRelation} onOpenChange={setIsAddingRelation}>
            <DialogTrigger asChild>
              <Button>Add Relationship</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Relationship</DialogTitle>
              </DialogHeader>
              <div className='space-y-4 py-4'>
                <div className='space-y-2'>
                  <label className='font-medium'>Select Character</label>
                  <div className='grid grid-cols-2 gap-2 max-h-60 overflow-y-auto'>
                    {myCharacters
                      .filter(char => char?._id !== currentCharacter?._id)
                      .map(char => (
                        <motion.div
                          key={char._id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`p-2 rounded-lg cursor-pointer border transition-colors ${
                            selectedCharacter?._id === char._id
                              ? 'border-primary bg-primary/10'
                              : 'border-muted hover:border-primary'
                          }`}
                          onClick={() => setSelectedCharacter(char)}
                        >
                          <div className='flex items-center gap-2'>
                            <img
                              src={char.image}
                              alt={char.name}
                              className='w-10 h-10 rounded-full object-cover'
                            />
                            <span className='font-medium truncate'>
                              {char.name}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                  </div>
                </div>
                <DialogClose asChild>
                  <Button
                    className='w-full'
                    onClick={handleAddRelationship}
                    disabled={!selectedCharacter || createRelationLoading}
                  >
                    Add Relationship
                  </Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Relationship Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {relations?.map(relation => (
            <motion.div
              key={relation._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              whileHover={{ scale: 1.02 }}
              className='group'
            >
              <Card className='p-6 hover:shadow-lg transition-all duration-300 group-hover:border-primary'>
                <div className='space-y-4'>
                  <div className='flex justify-center gap-4 items-center'>
                    <div className='relative'>
                      <img
                        src={relation.charA.image}
                        alt={relation.charA.name}
                        className='w-16 h-16 rounded-full object-cover border-2 border-primary'
                      />
                      <span className='absolute bottom-0 right-0 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full'>
                        A
                      </span>
                    </div>
                    <div className='flex flex-col items-center'>
                      <div className='text-2xl font-bold text-primary'>⟷</div>
                      <div className='text-sm font-medium text-muted-foreground'>
                        {relation.type}
                      </div>
                    </div>
                    <div className='relative'>
                      <img
                        src={relation.charB.image}
                        alt={relation.charB.name}
                        className='w-16 h-16 rounded-full object-cover border-2 border-secondary'
                      />
                      <span className='absolute bottom-0 right-0 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full'>
                        B
                      </span>
                    </div>
                  </div>
                  <div className='text-center space-y-2'>
                    <div className='flex justify-center items-center gap-2'>
                      <h3 className='font-semibold text-primary'>
                        {relation.charA.name}
                      </h3>
                      <span className='text-muted-foreground'>with</span>
                      <h3 className='font-semibold text-blue-800'>
                        {relation.charB.name}
                      </h3>
                    </div>
                    <div className='space-y-1'>
                      <p className='text-sm text-muted-foreground'>
                        Similarity Score
                      </p>
                      <div className='h-2 bg-muted rounded-full overflow-hidden'>
                        <motion.div
                          className='h-full bg-gradient-to-r from-primary to-secondary'
                          style={{ width: `${relation.similarity * 100}%` }}
                          initial={{ width: 0 }}
                          animate={{ width: `${relation.similarity * 100}%` }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                        />
                      </div>
                      <p className='text-xs text-muted-foreground text-right'>
                        {(relation.similarity * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {(relations?.length === 0 || !relations) && (
          <div className='text-center py-12 text-muted-foreground'>
            No relationships yet. Add some using the button above!
          </div>
        )}
      </Card>
    </div>
  )
}

export default CharacterRelationshipPage
