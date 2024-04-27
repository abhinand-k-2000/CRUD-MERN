import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutesAdmin = () => {

    const adminToken = useSelector(state => state.auth.adminToken)

  return adminToken ? <Outlet/> : <Navigate to='/admin' replace />
}

export default PrivateRoutesAdmin