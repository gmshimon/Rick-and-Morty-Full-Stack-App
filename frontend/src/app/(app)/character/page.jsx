import PrivateRoute from '@/components/PrivateRoute/PrivateRoute'
import CharacterPage from '@/Pages/CharacterPage/CharacterPage'
import React from 'react'

const page = () => {
  return (
    <PrivateRoute>
      <div>
        <CharacterPage />
      </div>
    </PrivateRoute>
  )
}

export default page
