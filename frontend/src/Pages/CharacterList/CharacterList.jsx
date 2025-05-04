'use client'
import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import EditCharacterModal from '@/components/modals/EditCharacterModal'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogClose
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { useDispatch, useSelector } from 'react-redux'
import {
  createMyCharacter,
  deleteMyCharacter,
  getMyCharacter,
  reGenerateBackstory,
  reset,
  updateMyCharacter
} from '@/lib/Features/characterSlice'
import Loading from '@/components/Loading/Loading'

const CharacterList = () => {
  const {
    myCharacters,
    createCharacterLoading,
    createCharacterSuccess,
    createCharacterError,
    getCharacterLoading,
    deleteCharacterLoading,
    deleteCharacterSuccess,
    deleteCharacterError,
    updateCharacterLoading,
    updateCharacterSuccess,
    updateCharacterError,
    reGenBackstoryLoading,
    reGenBackstorySuccess,
    reGenBackstoryError
  } = useSelector(state => state.character)
  // const [characters, setCharacters] = useState([
  //   {
  //     id: 1,
  //     name: 'Rick Sanchez',
  //     species: 'Human',
  //     status: 'Alive',
  //     gender: 'Male',
  //     origin: 'Earth (C-137)',
  //     image: '👨‍🔬',
  //     backstory: 'A genius scientist who drags his grandson on crazy adventures'
  //   },
  //   {
  //     id: 2,
  //     name: 'Morty Smith',
  //     species: 'Human',
  //     status: 'Alive',
  //     gender: 'Male',
  //     origin: 'Earth (C-137)',
  //     image: '👦',
  //     backstory: "Rick's good-hearted but easily distressed grandson"
  //   },
  //   {
  //     id: 3,
  //     name: 'Summer Smith',
  //     species: 'Human',
  //     status: 'Alive',
  //     gender: 'Female',
  //     origin: 'Earth (C-137)',
  //     image: '👱‍♀️',
  //     backstory: "Morty's older sister, intelligent and rebellious"
  //   },
  //   {
  //     id: 4,
  //     name: 'Beth Smith',
  //     species: 'Human',
  //     status: 'Alive',
  //     gender: 'Female',
  //     origin: 'Earth (C-137)',
  //     image: '👩‍⚕️',
  //     backstory: "Rick's daughter, a horse surgeon with daddy issues"
  //   },
  //   {
  //     id: 5,
  //     name: 'Jerry Smith',
  //     species: 'Human',
  //     status: 'Alive',
  //     gender: 'Male',
  //     origin: 'Earth (C-137)',
  //     image: '🤵',
  //     backstory: "Morty's father, often the butt of Rick's jokes"
  //   },
  //   {
  //     id: 6,
  //     name: 'Birdperson',
  //     species: 'Bird-Person',
  //     status: 'Alive',
  //     gender: 'Male',
  //     origin: 'Bird World',
  //     image: '🦅',
  //     backstory: "Rick's best friend, a stoic warrior from Bird World"
  //   },
  //   {
  //     id: 7,
  //     name: 'Mr. Meeseeks',
  //     species: 'Meeseeks',
  //     status: 'Unknown',
  //     gender: 'Male',
  //     origin: 'Mr. Meeseeks Box',
  //     image: '💙',
  //     backstory:
  //       'Creatures created to serve a single purpose before ceasing to exist'
  //   },
  //   {
  //     id: 8,
  //     name: 'Evil Morty',
  //     species: 'Human',
  //     status: 'Alive',
  //     gender: 'Male',
  //     origin: 'Unknown',
  //     image: '😈',
  //     backstory: 'A mysterious evil version of Morty with sinister plans'
  //   }
  // ])

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedCharacter, setSelectedCharacter] = useState(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [characterToDelete, setCharacterToDelete] = useState(null)

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

  useEffect(() => {
    dispatch(getMyCharacter())
  }, [dispatch, updateCharacterSuccess, createCharacterSuccess])

  useEffect(() => {
    if (createCharacterSuccess) {
      toast.success('Character added successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })
      dispatch(reset())
    }
    if (createCharacterError) {
      toast.error('Failed to add character', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })
      dispatch(reset())
    }
    if (deleteCharacterError) {
      toast.error('Failed to delete character', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })
      dispatch(reset())
    }
    if (deleteCharacterSuccess) {
      toast.success('Character deleted successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })
      dispatch(reset())
    }
    if (updateCharacterSuccess) {
      toast.success('Character updated successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })
      dispatch(reset())
    }
    if (updateCharacterError) {
      toast.error('Failed to update character', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })
      dispatch(reset())
    }
    if (reGenBackstorySuccess) {
      toast.success('Backstory re-generated successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })
      dispatch(reset())
    }
    if (reGenBackstoryError) {
      toast.error('Failed to re-generate', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })
      dispatch(reset())
    }
  }, [
    dispatch,
    createCharacterSuccess,
    createCharacterError,
    deleteCharacterSuccess,
    deleteCharacterError,
    updateCharacterSuccess,
    updateCharacterError,
    reGenBackstoryError,
    reGenBackstorySuccess
  ])

  const handleInputChange = e => {
    const { name, value } = e.target
    setNewCharacter(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAddCharacter = () => {
    dispatch(createMyCharacter({ ...newCharacter, backstoryToggle }))
    // setCharacters(prev => [...prev, { ...newCharacter, id: prev.length + 1 }])
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

  const handleEditCharacter = character => {
    setSelectedCharacter(character)
    setEditModalOpen(true)
  }

  const handleSaveEdit = editedCharacter => {
    dispatch(
      updateMyCharacter({ id: editedCharacter._id, updates: editedCharacter })
    )
    setEditModalOpen(false)
  }

  const handleDeleteClick = id => {
    setCharacterToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleGenerate = character => {
    dispatch(reGenerateBackstory(character?._id))
  }

  const handleConfirmDelete = () => {
    dispatch(deleteMyCharacter(characterToDelete))
    setDeleteDialogOpen(false)
    setCharacterToDelete(null)
  }

  return (
    <div className='space-y-6'>
      <ToastContainer />
      {getCharacterLoading ||
      deleteCharacterLoading ||
      updateCharacterLoading ||
      createCharacterLoading ? (
        <div className='flex justify-center items-center h-screen'>
          <Loading />
        </div>
      ) : (
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
                      <Label htmlFor='backstoryToggle'>
                        Generate Backstory
                      </Label>
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
          </div>

          <div className='space-y-4'>
            <div className='flex items-center justify-end space-x-2'>
              <Label htmlFor='items-per-page'>Items per page:</Label>
              <select
                id='items-per-page'
                className='border rounded p-1'
                value={itemsPerPage}
                onChange={e => setItemsPerPage(Number(e.target.value))}
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
                  {myCharacters
                    ?.slice(
                      (currentPage - 1) * itemsPerPage,
                      currentPage * itemsPerPage
                    )
                    .map(character => (
                      <TableRow
                        key={character._id}
                        className='hover:bg-muted/50 transition-colors'
                      >
                        <TableCell className='text-2xl'>
                          <img
                            src={character.image}
                            alt={`${character.name} avatar`}
                            className='w-12 h-12 rounded-full object-cover'
                          />
                        </TableCell>
                        <TableCell>{character.name}</TableCell>
                        <TableCell>{character.species}</TableCell>
                        <TableCell>{character.status}</TableCell>
                        <TableCell>{character.gender}</TableCell>
                        <TableCell>{character.origin}</TableCell>
                        <TableCell
                          title={character.backstory}
                          className='max-w-xs truncate'
                        >
                          {character.backstory}
                        </TableCell>
                        <TableCell>
                          <div className='flex gap-2'>
                            <Button
                              variant='secondary'
                              size='sm'
                              onClick={() => handleEditCharacter(character)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant='default'
                              size='sm'
                              disabled={reGenBackstoryLoading}
                              className='bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white'
                              onClick={() => handleGenerate(character)}
                            >
                              {reGenBackstoryLoading
                                ? 'Generating...'
                                : 'Generate Backstory'}
                            </Button>
                            <Button
                              variant='destructive'
                              size='sm'
                              onClick={() => handleDeleteClick(character?._id)}
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
                Showing{' '}
                {Math.min(
                  (currentPage - 1) * itemsPerPage + 1,
                  myCharacters?.length
                )}{' '}
                to {Math.min(currentPage * itemsPerPage, myCharacters?.length)}{' '}
                of {myCharacters?.length} entries
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
                  onClick={() =>
                    setCurrentPage(prev =>
                      Math.min(
                        prev + 1,
                        Math.ceil(myCharacters?.length / itemsPerPage)
                      )
                    )
                  }
                  disabled={
                    currentPage >=
                    Math.ceil(myCharacters?.length / itemsPerPage)
                  }
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}

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
              Are you sure you want to delete {characterToDelete?.name}? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className='flex justify-end gap-2 mt-4'>
            <Button
              variant='outline'
              onClick={() => setDeleteDialogOpen(false)}
            >
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
