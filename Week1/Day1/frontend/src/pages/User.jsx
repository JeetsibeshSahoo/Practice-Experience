import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, removeUser } from "../features/users/userSlice.js";
import DashboardLayout from "../components/DashboardLayout.jsx";

const User = () => {

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  const { users, isLoading, error, currentPage, totalPages } = useSelector((state) => state.user);
  const { user: loggedInUser } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUsers({ search, page }));
  }, [dispatch, search, page]);

  const handleDelete = (id) => {
    dispatch(removeUser(id));
  };

  return (
    <DashboardLayout>
      <div className="h-full w-full p-6 relative overflow-hidden text-white">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#ffffff10_1px,transparent_0)] bg-[size:40px_40px]"></div>

        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-600 opacity-20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500 opacity-20 blur-3xl rounded-full"></div>


        <div className="relative z-10">

          <h2 className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
            Users
          </h2>

          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-6 w-full md:w-1/3 px-4 py-2 rounded-full bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          {isLoading && <p className="text-gray-400">Loading users...</p>}
          {error && <p className="text-red-400">{error}</p>}
          {users.length === 0 && !isLoading && (
            <p className="text-gray-400">No users found</p>
          )}

          <div className="overflow-x-auto bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl">
            <table className="w-full text-left">
              
              <thead className="bg-white/10 text-gray-300">
                <tr>
                  <th className="px-5 py-3">Name</th>
                  <th className="px-5 py-3">Email</th>
                  <th className="px-5 py-3">Role</th>
                  <th className="px-5 py-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-t border-white/10 hover:bg-white/5 transition"
                  >
                    <td className="px-5 py-3">{user.name}</td>
                    <td className="px-5 py-3 text-gray-300">{user.email}</td>

                    <td className="px-5 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          user.role === "admin"
                            ? "bg-purple-500/20 text-purple-400"
                            : "bg-blue-500/20 text-blue-400"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td className="px-5 py-3">
                      {loggedInUser?.role === "admin" && (
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/40 transition"
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>

          <div className="flex items-center justify-between mt-6">
            <p className="text-gray-400 text-sm">
              Page {currentPage} of {totalPages}
            </p>

            <div className="flex gap-3">
              <button
                disabled={currentPage === 1}
                onClick={() => setPage((prev) => prev - 1)}
                className="px-4 py-1 rounded-full border border-white/20 disabled:opacity-50 hover:bg-white/10 transition"
              >
                Prev
              </button>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setPage((prev) => prev + 1)}
                className="px-4 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};

export default User;