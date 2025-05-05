// useCurrentUser.js
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'
import auth from '@/Firebase/firebase'
import { fetchUser, startLoading } from '@/lib/Features/userSlice'

// **Rename** to start with “use” so React knows it’s a hook
export default function useCurrentUser() {
  const dispatch = useDispatch()

  useEffect(() => {
    // mark loading true immediately
    dispatch(startLoading(true))

    // subscribe to Firebase auth changes
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      if (currentUser?.email) {
        dispatch(fetchUser(currentUser.email))
      } else {
        localStorage.removeItem('userToken')
        // no user → stop loading
        dispatch(startLoading(false))
      }
    })

    // cleanup on unmount
    return () => unsubscribe()
  }, [dispatch])
}
