'use client'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { onAuthStateChanged } from 'firebase/auth'
import auth from '@/Firebase/firebase'
import { fetchUser, logOut, startLoading } from '@/lib/Features/userSlice'

export default function useCurrentUser() {
  const dispatch = useDispatch()
  const router = useRouter()
  useEffect(() => {
    dispatch(startLoading(true))

    // 1) Firebase listener
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      if (currentUser?.email) {
        dispatch(fetchUser(currentUser.email))
      } else {
        localStorage.removeItem('userToken')
        dispatch(startLoading(false))
      }
    })

    // 2) Token-expiration checker
    const checkTokenExpiration = () => {
      console.log("Checking ")
      const stored = localStorage.getItem('userToken')
      if (!stored) return router.replace('/login')

      const { expiration } = JSON.parse(stored)
      if (Date.now() > expiration) {
        localStorage.removeItem('userToken')
        dispatch(logOut())
        router.replace('/login')
      }
    }
    const intervalId = setInterval(checkTokenExpiration, 1000)

    // cleanup both the auth listener and the interval
    return () => {
      unsubscribe()
      clearInterval(intervalId)
    }
  }, [dispatch])
}
