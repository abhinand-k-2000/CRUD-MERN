import React, { useState } from "react";
import { API_URL } from "../../utils/constants";
import { Link } from "react-router-dom";

const UserList = ({ user, onDelete }) => {
  const { email, mobile, name, image, _id } = user;

  const handleDelete = async (userId) => {
    console.log(userId);
    const result = window.confirm("Are you sure you want to delete ?");

    if (result) {
      const response = await fetch(
        `http://localhost:4000/api/deleteUser/${userId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      const content = await response.json();
      if (content.success) {
        onDelete(userId);
      }
      console.log("content", content);
    }
  };
  return (
    <>
      <tr>
        <td className="p-2 whitespace-nowrap">
          <div className="flex items-center">
            <div className=" flex-shrink-0 mr-2  sm:mr-3">
              <img
                // className="rounded-full"
                src={image}
                className="w-20 rounded-md"
                alt="Alex Shatov"
              />
            </div>
            <div className="font-medium text-gray-800">{name}</div>
          </div>
        </td>
        <td className="p-2 whitespace-nowrap">
          <div className="text-left">{email}</div>
        </td>
        <td className="p-2 whitespace-nowrap">
          <div className="text-left font-medium text-green-500">{mobile}</div>
        </td>
        <td className="p-2 whitespace-nowrap">
          <div className="text-lg text-center space-x-3">
            <Link to={`/admin/editUser/${_id}`}>
              <button className="bg-black text-white text-base py-1 px-2 rounded-md">
                Edit
              </button>
            </Link>
            <button
              onClick={() => handleDelete(_id)}
              className="bg-red-600 px-2 rounded-md text-base py-1 text-white"
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default UserList;
