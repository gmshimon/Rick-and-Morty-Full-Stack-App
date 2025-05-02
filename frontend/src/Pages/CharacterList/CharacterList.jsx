'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import MainLayout from '@/components/layout/MainLayout'
import EditCharacterModal from '@/components/modals/EditCharacterModal'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

const CharacterList = () => {
  const [characters, setCharacters] = useState([
    {
      id: 1,
      name: 'Rick Sanchez',
      species: 'Human',
      status: 'Alive',
      gender: 'Male',
      origin: 'Earth (C-137)',
      image: '👨‍🔬',
      backstory: 'A genius scientist who drags his grandson on crazy adventures'
    },
    {
      id: 2,
      name: 'Morty Smith',
      species: 'Human',
      status: 'Alive',
      gender: 'Male',
      origin: 'Earth (C-137)',
      image: '👦',
      backstory: 'Rick\'s good-hearted but easily distressed grandson'
    },
    {
      id: 3,
      name: 'Summer Smith',
      species: 'Human',
      status: 'Alive',
      gender: 'Female',
      origin: 'Earth (C-137)',
      image: '👱‍♀️',
      backstory: 'Morty\'s older sister, intelligent and rebellious'
    },
    {
      id: 4,
      name: 'Beth Smith',
      species: 'Human',
      status: 'Alive',
      gender: 'Female',
      origin: 'Earth (C-137)',
      image: '👩‍⚕️',
      backstory: 'Rick\'s daughter, a horse surgeon with daddy issues'
    },
    {
      id: 5,
      name: 'Jerry Smith',
      species: 'Human',
      status: 'Alive',
      gender: 'Male',
      origin: 'Earth (C-137)',
      image: '🤵',
      backstory: 'Morty\'s father, often the butt of Rick\'s jokes'
    },
    {
      id: 6,
      name: 'Birdperson',
      species: 'Bird-Person',
      status: 'Alive',
      gender: 'Male',
      origin: 'Bird World',
      image: '🦅',
      backstory: 'Rick\'s best friend, a stoic warrior from Bird World'
    },
    {
      id: 7,
      name: 'Mr. Meeseeks',
      species: 'Meeseeks',
      status: 'Unknown',
      gender: 'Male',
      origin: 'Mr. Meeseeks Box',
      image: '💙',
      backstory: 'Creatures created to serve a single purpose before ceasing to exist'
    },
    {
      id: 8,
      name: 'Evil Morty',
      species: 'Human',
      status: 'Alive',
      gender: 'Male',
      origin: 'Unknown',
      image: '😈',
      backstory: 'A mysterious evil version of Morty with sinister plans'
    }
  ])

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedCharacter, setSelectedCharacter] = useState(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [characterToDelete, setCharacterToDelete] = useState(null)

  const [newCharacter, setNewCharacter] = useState({
    name: '',
    species: '',
    status: '',
    gender: '',
    origin: '',
    image: '',
    backstory: ''
  })

  const handleInputChange = e => {
    const { name, value } = e.target
    setNewCharacter(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAddCharacter = () => {
    setCharacters(prev => [...prev, { ...newCharacter, id: prev.length + 1 }])
    setNewCharacter({
      name: '',
      species: '',
      status: '',
      gender: '',
      origin: '',
      image: '',
      backstory: ''
    })
  }

  const handleEditCharacter = (character) => {
    setSelectedCharacter(character)
    setEditModalOpen(true)
  }

  const handleSaveEdit = (editedCharacter) => {
    setCharacters(prev =>
      prev.map(char =>
        char.id === editedCharacter.id ? editedCharacter : char
      )
    )
  }

  const handleDeleteClick = (character) => {
    setCharacterToDelete(character)
    setDeleteDialogOpen(true)
  }

  const handleConfirmDelete = () => {
    setCharacters(prev => prev.filter(char => char.id !== characterToDelete.id))
    setDeleteDialogOpen(false)
    setCharacterToDelete(null)
  }

  return (
    <div className='space-y-6'>
      <Card className='p-6'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-2xl font-bold'>Character List</h2>
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
                  <Input
                    id='status'
                    name='status'
                    value={newCharacter.status}
                    onChange={handleInputChange}
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='gender'>Gender</Label>
                  <Input
                    id='gender'
                    name='gender'
                    value={newCharacter.gender}
                    onChange={handleInputChange}
                  />
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
                  <Label htmlFor='image'>Image (Emoji)</Label>
                  <Input
                    id='image'
                    name='image'
                    value={newCharacter.image}
                    onChange={handleInputChange}
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='backstory'>Backstory</Label>
                  <Input
                    id='backstory'
                    name='backstory'
                    value={newCharacter.backstory}
                    onChange={handleInputChange}
                  />
                </div>
                <Button className='w-full mt-4' onClick={handleAddCharacter}>
                  Add Character
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className='space-y-4'>
          <div className='flex items-center justify-end space-x-2'>
            <Label htmlFor='items-per-page'>Items per page:</Label>
            <select
              id='items-per-page'
              className='border rounded p-1'
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </div>

          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Species</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Origin</TableHead>
                  <TableHead>Backstory</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {characters
                  .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                  .map(character => (
                    <TableRow 
                      key={character.id}
                      className='hover:bg-muted/50 transition-colors'
                    >
                      <TableCell className='text-2xl'>{character.image}</TableCell>
                      <TableCell>{character.name}</TableCell>
                      <TableCell>{character.species}</TableCell>
                      <TableCell>{character.status}</TableCell>
                      <TableCell>{character.gender}</TableCell>
                      <TableCell>{character.origin}</TableCell>
                      <TableCell className='max-w-xs truncate'>
                        {character.backstory}
                      </TableCell>
                      <TableCell>
                        <div className='flex gap-2'>
                          <Button
                            variant='outline'
                            size='sm'
                            onClick={() => handleEditCharacter(character)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant='destructive'
                            size='sm'
                            onClick={() => handleDeleteClick(character)}
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>

          <div className='flex items-center justify-between'>
            <div className='text-sm text-muted-foreground'>
              Showing {Math.min((currentPage - 1) * itemsPerPage + 1, characters.length)} to{' '}
              {Math.min(currentPage * itemsPerPage, characters.length)} of {characters.length} entries
            </div>
            <div className='flex items-center space-x-2'>
              <Button
                variant='outline'
                size='sm'
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <div className='flex items-center justify-center min-w-[2rem]'>
                {currentPage}
              </div>
              <Button
                variant='outline'
                size='sm'
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(characters.length / itemsPerPage)))}
                disabled={currentPage >= Math.ceil(characters.length / itemsPerPage)}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Edit Modal */}
      <EditCharacterModal
        character={selectedCharacter}
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSave={handleSaveEdit}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {characterToDelete?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className='flex justify-end gap-2 mt-4'>
            <Button variant='outline' onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant='destructive' onClick={handleConfirmDelete}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CharacterList
