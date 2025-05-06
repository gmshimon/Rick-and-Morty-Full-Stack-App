// src/components/PrivateRoute/PrivateRoute.jsx
'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import Loading from '../Loading/Loading'
import useCurrentUser from '@/Utils/useCurrentUser'

export default function PrivateRoute({ children }) {
  const router = useRouter()
  const { user, isGetUserDataLoading } = useSelector(state => state.user)


  useCurrentUser()

  useEffect(() => {
    // only run after we're done loading
    if (!isGetUserDataLoading) {
      const timer = setTimeout(() => {
        if (!user?.email) {
          router.replace('/Login')
        }
      }, 500) 

      return () => clearTimeout(timer)
    }
  }, [isGetUserDataLoading, user?.email, router])

  if (isGetUserDataLoading || !user?.email) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    )
  }

  // authenticated!
  return <>{children}</>
}
