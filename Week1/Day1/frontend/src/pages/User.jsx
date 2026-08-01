import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, removeUser } from "../features/users/userSlice.js";

const User = () => {

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers({ search, page }));
  }, [dispatch, search, page]);

  const handleDelete = (id) => {
    dispatch(removeUser(id));
  };

  return (
    <div>
      <div className="p-6 text-2xl font-semibold">
        User Page
      </div>

      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
        Prev
      </button>

      <button onClick={() => setPage((prev) => prev + 1)}>
        Next
      </button>

      {users?.map((user) => (
        <div key={user._id}>
          <p>{user.name}</p>

          <button onClick={() => handleDelete(user._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default User;