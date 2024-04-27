import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {useDispatch} from "react-redux";
import { setAdminLogin } from "../../reduxStore/authSlice";
 
const AdminLog = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  const dispatch = useDispatch()
  const navigate = useNavigate()


  const formSubmit = async (data) => {
    console.log("data", data);
    if (isValid) {
      const response = await fetch("http://localhost:4000/api/adminLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });
      const content = await response.json();
      console.log("content", content);
      if (!content.success) {
        return toast.error(content.message);
      }

      const {adminToken, adminId} = content
      dispatch(setAdminLogin(adminToken));
      console.log("token", adminToken)
      localStorage.setItem("adminToken", adminToken)
      toast.success("Admin Logged In!")
      navigate('/admin/dashboard')


    } else {
      console.log("Error from form submission");
    }
  };

  return (
    <>
      <div className="  items-center w-1/4 mx-auto mt-40">
        <h1 className="text-center font-bold text-3xl bg-slate-50 shadow-lg rounded-md  m-2 p-2">
          Admin Login
        </h1>
        <form
          onSubmit={handleSubmit(formSubmit)}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              value="admin@gmail.com"
              placeholder="Email"
              {...register("email", {
                required: "Enter email",
              })}
            />
            <p className="text-xs  m-2 text-red-600">
              {errors?.email?.message}
            </p>
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              value="admin"
              {...register("password", {
                required: "Enter the password",
              })}
            />
            <p className="text-xs  m-1 text-red-600">
              {errors?.password?.message}
            </p>
            {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AdminLog;
