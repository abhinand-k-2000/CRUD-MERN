import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserLogout } from '../../reduxStore/authSlice';
import { toast } from 'react-toastify';

const UsersHeader = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(setUserLogout());
        localStorage.removeItem("userToken");
        localStorage.removeItem("userId");
        toast.success("User Logged Out!");
        navigate("/");
      };
  return (
    <>
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4">
   <div className="container mx-auto flex justify-between items-center">
     <h1 className="text-2xl ml-5 font-bold">User Home</h1>
     <nav>
       <ul className="flex space-x-4 mr-5">
         {/* <li>
           <a href="#" className="hover:text-gray-300">Home</a>
         </li>
         <li>
           <a href="#" className="hover:text-gray-300">Profile</a>
         </li>
         <li>
           <a href="#" className="hover:text-gray-300">Settings</a>
         </li> */}
         <li>
           <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
             Sign Out
           </button>
         </li>
       </ul>
     </nav>
   </div>
</header>
   </>
  )
}

export default UsersHeader