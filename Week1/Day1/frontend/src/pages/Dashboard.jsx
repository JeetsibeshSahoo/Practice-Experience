import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from "../components/Navbar";

const Dashboard = () => {

    const { user } = useSelector((state) => state.auth);

  return (
    <div className='min-h-screen flex flex-col bg-[#0f0f0f] text-white'>
        <Navbar />

        <div className='flex-1 p-6 relative overflow-hidden'>
            <div className='absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#ffffff10_1px,transparent_0)] bg-[size:40px_40px]'></div>

            <div className='absolute top-20 left-20 w-96 h-96 bg-purple-600 opacity-20 blur-3xl rounded-full animate-pulse'></div>
            <div className='absolute bottom-20 right-20 w-96 h-96 bg-pink-500 opacity-20 blur-3xl rounded-full animate-pulse'></div>

            <div className='relative z-10'>
                <h1 className='text-5xl font-extrabold mb-10 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text'>
                    Welcome {user?.name} 👋
                </h1>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    <div className='p-6 rounded-2xl bg-white/5 backdrop-blur-lg border-white/10 hover:scale-105 transition'>
                        <h2 className='text-xl font-semibold mb-2'>🔥 Activity</h2>
                        <p className='text-gray-400'>Logged in successfully</p>
                    </div>

                    <div className='p-6 rounded-2xl bg-white/5 backdrop-blur-lg border-white/10 hover:scale-105 transition'>
                        <h2 className='text-xl font-semibold mb-2'>⚡ Status</h2>
                        <p className='text-green-400'>Active</p>
                    </div>

                    <div className='p-6 rounded-2xl bg-white/5 backdrop-blur-lg border-white/10 hover:scale-105 transition'>
                        <h2 className='text-xl font-semibold mb-2'>🧠 Role</h2>
                        <p className='text-gray-400'>User</p>
                    </div>
                </div>

                <div className='mt-10 flex gap-4'>
                    <button className='px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition shadow-lg'>
                        Explore 🚀
                    </button>

                    <button className='px-6 py-2 rounded-full border border-white/20  hover:bg-white/10 transition'>
                        Settings ⚙️
                    </button>
                </div>

            </div>
        </div>
    </div>
  );
}

export default Dashboard;