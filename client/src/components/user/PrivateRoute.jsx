import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
    const userToken = useSelector(state => state.auth.userToken)
    console.log(userToken, "USER TOKEN")


  return userToken ? <Outlet/> : <Navigate to='/' replace/>
}

export default PrivateRoute