import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserLogout } from "../../reduxStore/authSlice";
import { toast } from "react-toastify";
import UsersHeader from "../../components/user/UsersHeader";

const Home = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setUserLogout());
    localStorage.removeItem("userToken");
    localStorage.removeItem("userId");
    toast.success("User Logged Out!");
    navigate("/");
  };

  const fetchUserData = async () => {
    const userId = localStorage.getItem("userId");
    const response = await fetch(`http://localhost:4000/api/getUser/${userId}`);
    const content = await response.json();
    setUserData(content.userData);

  };

  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <>
    <UsersHeader/>
      <div className="max-w-sm mx-auto overflow-hidden mt-16 bg-white rounded-lg shadow-lg hover:shadow-blue-400">
        <div className="relative">
          <img
            className="w-full h-48 object-contain"
            src={userData?.image}
            alt="Profile Image"
          />
        </div>
        <div className="px-6 py-4">
          <div className="text-xl font-semibold text-gray-800">
            {userData?.name}
          </div>
          <p className="text-gray-600">{userData?.email}</p>
          <p className="text-gray-600">{userData?.mobile}</p>
        </div>
        <div className="px-6 py-4">
          <span className="inline-block px-2 py-1 font-semibold text-teal-900 bg-teal-200 rounded-full">
            Web
          </span>
          <span className="inline-block px-2 py-1 font-semibold text-indigo-900 bg-indigo-200 rounded-full">
            UI/UX
          </span>
          <span className="inline-block px-2 py-1 font-semibold text-purple-900 bg-purple-200 rounded-full">
            Design
          </span>
        </div>
        <div className="px-6 py-4 flex justify-between">
          <Link to={`/updateUser/${userData?._id}`}  className="text-blue-500 hover:underline">
            Edit Profile
          </Link>
      
        </div>
      </div>
    </>
  );
};

export default Home;
