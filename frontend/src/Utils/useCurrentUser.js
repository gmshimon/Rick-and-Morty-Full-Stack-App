'use client'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter, usePathname } from 'next/navigation'
import { onAuthStateChanged } from 'firebase/auth'
import auth from '@/Firebase/firebase'
import { fetchUser, startLoading } from '@/lib/Features/userSlice'

export default function useCurrentUser() {
  const dispatch = useDispatch()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      dispatch(startLoading(true))

      if (user?.email) {
        dispatch(fetchUser(user.email))
      } else {
        // only redirect if we’re *not* already on /login
        if (pathname !== '/Login') {
          localStorage.removeItem('userToken')
          dispatch(startLoading(false))
          router.replace('/Login')
        } else {
          dispatch(startLoading(false))
        }
      }
    })

    return unsubscribe
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, pathname])
}
