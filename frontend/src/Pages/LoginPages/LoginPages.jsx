'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, reset } from '@/lib/Features/userSlice'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'
const MotionLink = motion.create(Link)

const LoginPages = () => {
  const { isLoginSuccess, isCreateUserLoading, isLoginError } =
    useSelector(state => state.user)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    if (isLoginError) {
      toast.error('Login Failed', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })
      dispatch(reset())
    }
    if (isLoginSuccess) {
      toast.success('Login successful', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })
      dispatch(reset())
      router.replace(`/`)
    }
  }, [dispatch, isLoginError, isLoginSuccess])

  const handleLogin = async e => {
    e.preventDefault()
    dispatch(loginUser({ email, password }))
  }

  return (
    <div className='min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 p-4'>
      <ToastContainer/>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className='w-[480px] p-8 space-y-6 shadow-lg'>
          <div className='space-y-2 text-center'>
            <h1 className='text-3xl font-bold tracking-tight'>Welcome Back!</h1>
            <p className='text-muted-foreground'>
              Enter your credentials to access your account
            </p>
          </div>

          <form onSubmit={handleLogin} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='rick.sanchez@example.com'
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className='w-full'
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                type='password'
                placeholder='••••••••'
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className='w-full'
              />
            </div>

            <div className='flex items-center justify-end'>
              <motion.a
                href='#'
                className='text-sm font-medium text-primary hover:underline'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Forgot password?
              </motion.a>
            </div>

            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
              <Button
                type='submit'
                className='w-full relative'
                disabled={isCreateUserLoading}
              >
                {isCreateUserLoading ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className='absolute inset-0 flex items-center justify-center'
                  >
                    <div className='size-5 border-2 border-white border-t-transparent rounded-full animate-spin' />
                  </motion.div>
                ) : (
                  'Sign In'
                )}
              </Button>
            </motion.div>

            <motion.p
              className='text-center text-sm text-muted-foreground'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Don't have an account? {/* <Link href={"/registration"}> */}
              <MotionLink
                href='/registration'
                className='font-medium text-primary hover:underline'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign up
              </MotionLink>
              {/* </Link> */}
            </motion.p>
          </form>
        </Card>
      </motion.div>
    </div>
  )
}

export default LoginPages
