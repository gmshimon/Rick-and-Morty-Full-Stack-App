// src/Utils/useCurrentUser.js
'use client'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'
import auth from '@/Firebase/firebase'
import { fetchUser, startLoading } from '@/lib/Features/userSlice'

export default function useCurrentUser() {
  const dispatch = useDispatch()

  useEffect(() => {
    // kick off the spinner immediately
    dispatch(startLoading(true))

    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user?.email) {
        // fetch your full profile & clear `isLoading` in extraReducers
        dispatch(fetchUser(user.email))
      } else {
        // no Firebase user → stop loading so PrivateRoute can redirect
        dispatch(startLoading(false))
      }
    })

    return unsubscribe
  }, [dispatch])
}
