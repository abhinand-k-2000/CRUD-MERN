import React, { useEffect, useState } from "react";
import UserList from "../../components/admin/UserList";
import AdminHeader from "../../components/admin/AdminHeader";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [usersList, setUsersList] = useState([]);
  const [searchUser, setSearchUser] = useState('')

  const removeUser = (id) => {
    setUsersList(usersList.filter(user => user._id != id))
  }

  const handleSearchUser = (e) => {
    setSearchUser(e.target.value)
  }



  const fetchUsers = async () => {
    const response = await fetch("http://localhost:4000/api/getUsers");
    const content = await response.json();
    setUsersList(content.usersList);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = usersList.filter((user) => user.name.toLowerCase().includes(searchUser.toLowerCase()))
  console.log("filte", filteredUsers)

  return (
    <>
      <div>
        <AdminHeader />

        <section className="antialiased bg-gray-100 text-gray-600 h-screen px-4">
          <div className="flex flex-col justify-center h-full">
            <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">

            <header className="px-5 py-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-800">Customers</h2>
                <div className="flex items-center justify-between">
                 <input
                    type="text"
                    placeholder="Search users"
                    value={searchUser}
                    // onChange={(e) => setSearchUsers(e.target.value)}
                    onChange={handleSearchUser}
                    className="border rounded-md p-2 mt-2"
                 />
                 <Link to="/admin/createUser">
                 <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
                 >
                    Add New User
                 </button></Link>
                </div>
              </header>

              <div className="p-3">
                <div className="overflow-x-auto">
                  <table className="table-auto w-full">
                    <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                      <tr>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">Name</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">Email</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">Mobile</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-center">
                            Actions
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-gray-100">

                      {filteredUsers.length > 0 ? filteredUsers.map((user) => (
                        <UserList key={user._id} user={user} onDelete={removeUser} />
                      )) : <p className="text-red-500 m-5 font-semibold ">No user Found!!</p>}

                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Dashboard;
