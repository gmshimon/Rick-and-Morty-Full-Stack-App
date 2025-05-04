'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

const EditCharacterModal = ({ character, isOpen, onClose, onSave }) => {
  const [editedCharacter, setEditedCharacter] = useState(character)

  useEffect(() => {
    setEditedCharacter(character)
  }, [character])

  const handleInputChange = e => {
    const { name, value } = e.target
    setEditedCharacter(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = () => {
    onSave(editedCharacter)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Character</DialogTitle>
        </DialogHeader>
        <div className='space-y-2 py-2'>
          <div className='grid grid-cols-2 gap-2'>
            <div className='space-y-2'>
              <Label htmlFor='edit-name'>Name</Label>
              <Input
                id='edit-name'
                name='name'
                value={editedCharacter?.name}
                onChange={handleInputChange}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='edit-species'>Species</Label>
              <Input
                id='edit-species'
                name='species'
                value={editedCharacter?.species}
                onChange={handleInputChange}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='edit-status'>Status</Label>
              <Input
                id='edit-status'
                name='status'
                value={editedCharacter?.status}
                onChange={handleInputChange}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='edit-gender'>Gender</Label>
              <Input
                id='edit-gender'
                name='gender'
                value={editedCharacter?.gender}
                onChange={handleInputChange}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='edit-origin'>Origin</Label>
              <Input
                id='edit-origin'
                name='origin'
                value={editedCharacter?.origin}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className='space-y-2'>
            <Label htmlFor='edit-image'>Image (Emoji)</Label>
            <Input
              id='edit-image'
              name='image'
              value={editedCharacter?.image}
              onChange={handleInputChange}
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='edit-backstory'>Backstory</Label>
            <Textarea
              id='edit-backstory'
              name='backstory'
              value={editedCharacter?.backstory}
              onChange={handleInputChange}
              className='min-h-[100px] resize-y'
              placeholder='Enter character backstory...'
            />
          </div>
          <Button className='w-full mt-4' onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EditCharacterModal