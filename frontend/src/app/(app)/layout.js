import MainLayout from '@/components/layout/MainLayout'
import PrivateRoute from '@/components/PrivateRoute/PrivateRoute'

export default function AppLayout ({ children }) {

  
  return (
    <MainLayout>
      <PrivateRoute>{children}</PrivateRoute>
    </MainLayout>
  )
}
