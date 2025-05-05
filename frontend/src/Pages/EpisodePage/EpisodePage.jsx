'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loading from '@/components/Loading/Loading'

const EpisodePage = () => {
  const [episodes, setEpisodes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchTimeout, setSearchTimeout] = useState(null)

  const fetchEpisodes = async (page, search = '') => {
    setLoading(true)
    setError(null)
    try {
      const queryParams = new URLSearchParams({
        page,
        ...(search && { name: search })
      })
      const response = await fetch(
        `https://rickandmortyapi.com/api/episode?${queryParams}`
      )
      const data = await response.json()
      setEpisodes(data.results)
      setTotalPages(data.info.pages)
    } catch (err) {
      setError('Failed to fetch episodes')
      toast.error('Failed to fetch episodes', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark'
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEpisodes(currentPage)
  }, [currentPage])

  useEffect(() => {
    if (searchTimeout) clearTimeout(searchTimeout)
    const timeout = setTimeout(() => {
      if (searchQuery) {
        setCurrentPage(1)
        fetchEpisodes(1, searchQuery)
      } else {
        fetchEpisodes(1)
      }
    }, 500)
    setSearchTimeout(timeout)
    return () => clearTimeout(timeout)
  }, [searchQuery])

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Loading />
      </div>
    )
  }

  return (
    <div className='p-6 space-y-6'>
      <ToastContainer />

      {/* Search Bar */}
      <Card className='p-6'>
        <div className='flex flex-col gap-4'>
          <h1 className='text-3xl font-bold'>Episodes</h1>
          <Input
            placeholder='Search episodes...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='max-w-md'
          />
        </div>
      </Card>

      {/* Episodes Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {episodes.map((episode, index) => (
          <motion.div
            key={episode.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className='p-6 hover:shadow-lg transition-all duration-300 hover:border-primary cursor-pointer'>
              <div className='space-y-4'>
                <div>
                  <h2 className='text-2xl font-bold text-primary'>
                    {episode.name}
                  </h2>
                  <p className='text-muted-foreground'>{episode.episode}</p>
                </div>

                <div className='space-y-2'>
                  <div className='flex items-center gap-2'>
                    <span className='font-semibold'>Air Date:</span>
                    <span className='text-muted-foreground'>
                      {episode.air_date}
                    </span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='font-semibold'>Characters:</span>
                    <span className='text-muted-foreground'>
                      {episode.characters.length}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className='flex justify-center items-center gap-4 mt-8'>
        <Button
          variant='outline'
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className='text-muted-foreground'>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant='outline'
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default EpisodePage