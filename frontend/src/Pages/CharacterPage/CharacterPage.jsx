'use client'
import { useState, useEffect } from 'react'

import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import SearchForm from '@/components/character/SearchForm'
import CharacterCard from '@/components/character/CharacterCard'
import Pagination from '@/components/character/Pagination'

const CharacterPage = () => {
  const [searchParams, setSearchParams] = useState({
    name: '',
    species: ''
  })
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  const fetchCharacters = async () => {
    setLoading(true)
    setError(null)
    try {
      const queryParams = new URLSearchParams({
        page: currentPage,
        ...searchParams
      })
      const response = await fetch(
        `https://rickandmortyapi.com/api/character?${queryParams}`
      )
      const data = await response.json()
      setCharacters(data.results || [])
      setTotalPages(data.info?.pages || 0)
    } catch (err) {
      setError('Failed to fetch characters')
      setCharacters([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCharacters()
  }, [currentPage, searchParams])

  const handleSearch = (params) => {
    setSearchParams(params)
    setCurrentPage(1)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  return (
    <div className='space-y-6'>
      <Card className='p-6'>
        <div className='space-y-4'>
          <h2 className='text-2xl font-bold'>Character Search</h2>
          <SearchForm onSearch={handleSearch} />

          {loading && (
            <div className='flex justify-center py-8'>
              <div className='size-8 border-4 border-primary border-t-transparent rounded-full animate-spin' />
            </div>
          )}

          {error && (
            <div className='text-center py-8 text-red-500'>
              {error}
            </div>
          )}

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {characters.map(character => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>

          {!loading && !error && characters.length === 0 && (
            <div className='text-center py-8 text-muted-foreground'>
              No characters found
            </div>
          )}

          {totalPages > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </Card>
    </div>
  )
}

export default CharacterPage