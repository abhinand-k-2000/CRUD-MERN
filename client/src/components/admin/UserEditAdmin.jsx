import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../../utils/constants";
// import UsersHeader from "./UsersHeader";

const UserEditAdmin = () => {
    const [userData, setUserData] = useState(null)
    const [image, setImage] = useState(null);
  const { register, handleSubmit, formState: { errors, isValid }, watch, reset } = useForm({
    defaultValues: {
        username: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
        image: null,
    }
  });
 

  const { userId } = useParams();

  

  const navigate = useNavigate();

  const password = watch("password");

  const handleImage = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const onsubmit = async (data) => {
    if (isValid) {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("username", data.username);
      formData.append("email", data.email);
      formData.append("mobile", data.mobile);
      formData.append("password", data.password);
      try {
        const response = await fetch(`http://localhost:4000/api/updateUser/${userId}`, {
          method: "PUT",
          body: formData,
        });
        const content = await response.json();
        if (!content.message) {
          return toast.error(content.message);
        }
        toast.success("User Updated!");
        navigate("/admin/dashboard");
      } catch (error) {
        console.error("Error during form submission: ", error);
      }
    } else {
      console.log("Errors detected, form submission prevented");
      console.log("Errors", errors);
    }
  };


  const getUserData = async () => {
    const response = await fetch(API_URL + "getUser/" + userId);
    const content = await response.json();
    setUserData(content?.userData)

    // ================RESETING FORM VALUES FROM THE DATA FETCHED=====================
    reset({
        username: content?.userData?.name || "",
        email: content?.userData?.email || "",
        mobile: content?.userData?.mobile || "",
        password: content?.userData?.password || "",
        confirmPassword: content?.userData?.password || "",
        image: null,
    })
  };

  useEffect( ()=> {
    getUserData();
}, [userId, reset])
  return (
    <>
    {/* <UsersHeader /> */}
      <div className="  items-center w-1/4 mx-auto mt-4">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit(onsubmit)}
          encType="multipart/form-data"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"                
              {...register("username", {
                required: "Username should not be empty",
                minLength: {
                  value: 4,
                  message: "Minimum 4 letters",
                },
                pattern: {
                  value: /^[a-zA-Z ]{2,30}$/,
                  message: "Invalid name",
                },
              })}
            />
            <p className="text-xs  m-1 text-red-600">
              {errors?.username?.message}
            </p>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="Email"
              {...register("email", {
                required: "Email should not be empty",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            <p className="text-xs  m-1 text-red-600">
              {errors?.email?.message}
            </p>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="mobile"
            >
              Mobile
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="mobile"
              type="text"
              placeholder="Mobile"
              {...register("mobile", {
                required: "Mobile number should not be empty",
                pattern: {
                  value: /^[7-9][0-9]{9}$/,
                  message: "Invalid Mobile number",
                },
              })}
            />
            <p className="text-xs  m-1 text-red-600">
              {errors?.mobile?.message}
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
              {...register("password", {
                required: "Password should not be empty",
                pattern: {
                  value:
                    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                  message:
                    "Password must contain at least one uppercase letter, one specail character, one lowercase letter, and one number",
                },
              })}
            />
            <p className="text-xs  m-1 text-red-600">
              {errors?.password?.message}
            </p>
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Confirm Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmPassword"
              type="password"
              placeholder="******************"
              {...register("confirmPassword", {
                required: "Password should not be empty",
                validate: (value) =>
                  value === password || "The passwords do not match",
              })}
            />
            <p className="text-xs  m-1 text-red-600">
              {errors?.confirmPassword?.message}
            </p>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="image"
            >
              Profile Image
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="image"
              type="file"
              accept="image/*" // This restricts the file input to accept only image files
              {...register("image", {
                required: "Profile image is required",
              })}
              onChange={handleImage}
            />
            <p className="text-xs m-1 text-red-600">{errors?.image?.message}</p>
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Update
            </button>
           
          </div>
        </form>
      </div>
    </>
  )
}

export default UserEditAdmin