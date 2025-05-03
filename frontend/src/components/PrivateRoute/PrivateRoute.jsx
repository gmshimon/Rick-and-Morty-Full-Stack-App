"use client"
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import Loading from '../Loading/Loading'

export default function PrivateRoute({ children }) {
  const router = useRouter()
  const { user, isGetUserDataLoading } = useSelector(state => state.user)

  // While we’re loading, or if redirecting, render nothing (or a spinner)
  if (!isGetUserDataLoading ) {
    return <div className='flex justify-center items-center h-screen'>
        <Loading/>
    </div>
  }
  console.log(user?.email)
if(!user?.email){
    return router.replace({
        pathname: '/login',
        query: { from: router.asPath }
      })
}
  // Otherwise render the protected content
  return <>{children}</>
}
