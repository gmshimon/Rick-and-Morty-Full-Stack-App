'use client'
import { useRouter, usePathname } from 'next/navigation'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import Loading from '../Loading/Loading'

export default function PrivateRoute({ children }) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, isGetUserDataLoading } = useSelector((state) => state.user)

  // Redirect as a side-effect once we know loading is done
  useEffect(() => {
    if (!isGetUserDataLoading && !user?.email) {
      // build query string manually
      const from = encodeURIComponent(pathname)
      router.replace(`/login`)
    }
  }, [isGetUserDataLoading, user, pathname, router])

  // While loading or redirecting, show spinner
  if (isGetUserDataLoading || !user?.email) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    )
  }

  return <>{children}</>
}
