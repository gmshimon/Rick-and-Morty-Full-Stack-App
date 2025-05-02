'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

const SearchForm = ({ onSearch }) => {
  const [name, setName] = useState('')
  const [species, setSpecies] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch({ name, species })
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='space-y-2'>
          <Label htmlFor='name'>Name</Label>
          <Input
            id='name'
            placeholder='Search by name...'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='species'>Species</Label>
          <Input
            id='species'
            placeholder='Search by species...'
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
          />
        </div>
      </div>

      <div className='flex justify-end'>
        <Button type='submit'>
          Search Characters
        </Button>
      </div>
    </form>
  )
}

export default SearchForm