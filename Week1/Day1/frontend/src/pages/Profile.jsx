import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProfile } from '../features/auth/authSlice';
import DashboardLayout from '../components/DashboardLayout';

const Profile = () => {

  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector((state) => state.auth)

  useEffect(() => {
    if(!user) {
      dispatch(fetchProfile());
    }
  },[dispatch, user]);

  if(isLoading) return <p>Loading...</p>
  if(error) return <p className='text-red-500'>{error}</p>

  return (
    <DashboardLayout>
      <div className="h-full w-full p-6 text-white">

        <h1 className="text-4xl font-extrabold mb-8 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
          My Profile 👤
        </h1>

        <div className="max-w-xl bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">

          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-xl font-bold">
              {user?.name?.charAt(0)}
            </div>

            <div>
              <h2 className="text-xl font-semibold">{user?.name}</h2>
              <p className="text-gray-400 text-sm">{user?.email}</p>
            </div>
          </div>

          <div className="space-y-4">

            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-gray-400">User ID</span>
              <span className="text-sm">{user?._id}</span>
            </div>

            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-gray-400">Email</span>
              <span className="text-sm">{user?.email}</span>
            </div>

            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-gray-400">Role</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                user?.role === "admin"
                  ? "bg-purple-500/20 text-purple-400"
                  : "bg-blue-500/20 text-blue-400"
              }`}>
                {user?.role}
              </span>
            </div>

          </div>

          <div className="mt-6 flex gap-3">
            <button className="px-5 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
              Edit Profile
            </button>

            <button className="px-5 py-2 rounded-full border border-white/20 hover:bg-white/10 transition">
              Change Password
            </button>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default Profile