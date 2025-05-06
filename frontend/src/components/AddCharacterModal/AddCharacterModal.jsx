'use client'

import { useDispatch, useSelector } from 'react-redux'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogClose
} from '@/components/ui/dialog'
import { useState } from 'react'
import { Button } from '../ui/button'
import { Label } from '../ui/label'

const AddCharacterModal = () => {
     const {
        createCharacterLoading,
      } = useSelector(state => state.character)
  const [backstoryToggle, setBackstoryToggle] = useState(false)
  const [newCharacter, setNewCharacter] = useState({
    name: '',
    species: '',
    status: '',
    gender: '',
    origin: '',
    image: '',
    backstory: ''
  })

  const dispatch = useDispatch()
  const handleInputChange = e => {
    const { name, value } = e.target
    setNewCharacter(prev => ({
      ...prev,
      [name]: value
    }))
  }
  const handleAddCharacter = () => {
    dispatch(createMyCharacter({ ...newCharacter, backstoryToggle }))
    setNewCharacter({
      name: '',
      species: '',
      status: '',
      gender: '',
      origin: '',
      image: '',
      backstory: ''
    })
    setDeleteDialogOpen(false)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add New Character</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Character</DialogTitle>
        </DialogHeader>
        <div className='space-y-4 py-4'>
          <div className='space-y-2'>
            <Label htmlFor='name'>Name</Label>
            <Input
              id='name'
              name='name'
              value={newCharacter.name}
              onChange={handleInputChange}
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='species'>Species</Label>
            <Input
              id='species'
              name='species'
              value={newCharacter.species}
              onChange={handleInputChange}
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='status'>Status</Label>
            <select
              id='status'
              name='status'
              value={newCharacter.status}
              onChange={handleInputChange}
              className='w-full border rounded p-2'
            >
              <option value=''>Select Status</option>
              <option value='Alive'>Alive</option>
              <option value='Dead'>Dead</option>
              <option value='unknown'>Unknown</option>
            </select>
          </div>
          <div className='space-y-2'>
            <Label htmlFor='gender'>Gender</Label>
            <select
              id='gender'
              name='gender'
              value={newCharacter.gender}
              onChange={handleInputChange}
              className='w-full border rounded p-2'
            >
              <option value=''>Select Gender</option>
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
              <option value='Genderless'>Genderless</option>
              <option value='unknown'>Unknown</option>
            </select>
          </div>
          <div className='space-y-2'>
            <Label htmlFor='origin'>Origin</Label>
            <Input
              id='origin'
              name='origin'
              value={newCharacter.origin}
              onChange={handleInputChange}
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='image'>Image (Link)</Label>
            <Input
              id='image'
              name='image'
              value={newCharacter.image}
              onChange={handleInputChange}
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='backstory'>Backstory</Label>
            <div className='flex items-center gap-2 mb-2'>
              <Label htmlFor='backstoryToggle'>Generate Backstory</Label>
              <input
                id='backstoryToggle'
                type='checkbox'
                checked={backstoryToggle}
                onChange={() => setBackstoryToggle(!backstoryToggle)}
                className='w-4 h-4'
              />
            </div>
            {!backstoryToggle && (
              <>
                <Label htmlFor='backstory'>Backstory</Label>
                <Input
                  id='backstory'
                  name='backstory'
                  value={newCharacter.backstory}
                  onChange={handleInputChange}
                />
              </>
            )}
          </div>
          <DialogClose asChild>
            <Button
              className='w-full mt-4'
              onClick={handleAddCharacter}
              disabled={createCharacterLoading}
            >
              {createCharacterLoading ? (
                <div className='flex items-center justify-center gap-2'>
                  <div className='size-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
                  Adding...
                </div>
              ) : (
                'Add Character'
              )}
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddCharacterModal
