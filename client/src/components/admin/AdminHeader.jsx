import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setAdminLogout } from '../../reduxStore/authSlice'
import { toast } from 'react-toastify'

const AdminHeader = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("adminToken")
        dispatch(setAdminLogout())
        toast.success("Admin Logout Successful!")
        navigate('/admin')
        
    }
  return (
    <>
     <header className="bg-blue-500 text-white py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl ml-12 font-bold">Admin Dashboard</h1>
          <nav className='mr-4'>
            <ul className="flex space-x-4">
              <li>
                <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                 Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  )
}

export default AdminHeader