import  { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function PrivateRoute(): JSX.Element {
  const [authenticated, ] = useState(false);
  const getToken = () =>{
    return sessionStorage.getItem('token')
  }
  const token = getToken()
  if (authenticated || token) return <Outlet />
  return <Navigate to={'/'} />
}
PrivateRoute.displayName = 'PrivateRoute'
export default PrivateRoute