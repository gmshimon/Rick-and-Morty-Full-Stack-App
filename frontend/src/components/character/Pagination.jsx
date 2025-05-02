'use client'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          variant={currentPage === i ? 'default' : 'outline'}
          size='sm'
          onClick={() => onPageChange(i)}
          className='min-w-[2.5rem]'
        >
          {i}
        </Button>
      )
    }

    return pages
  }

  return (
    <div className='flex justify-center items-center gap-2 mt-6'>
      <Button
        variant='outline'
        size='sm'
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </Button>

      <div className='flex items-center gap-1'>
        {renderPageNumbers()}
      </div>

      <Button
        variant='outline'
        size='sm'
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  )
}

export default Pagination