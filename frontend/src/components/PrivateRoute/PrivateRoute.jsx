'use client'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import Loading from '../Loading/Loading'
import useCurrentUser from '@/Utils/useCurrentUser'

export default function PrivateRoute ({ children }) {
  const router = useRouter()
  const { user, isGetUserDataLoading } = useSelector(state => state.user)

  useCurrentUser()
  // While loading or redirecting, show spinner
  if (isGetUserDataLoading ) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Loading />
      </div>
    )
  }

  if (!user?.email) {
    return router.replace('/Login')
  }

  return <>{children}</>
}
