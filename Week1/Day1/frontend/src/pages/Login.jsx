import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { register } from '../features/auth/authSlice';

const Register = () => {

    const dispatch = useDispatch();
    const { isLoading, error } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        name : "",
        email : "",
        password : "",
        age : ""
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await dispatch(register(formData));
        if(result.meta.requestStatus === "fulfilled") {
            navigate("/login");
        }
    };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900'>
        <div className='bg-gray-200 p-8 rounded-2xl justify-center shadow-lg w-full max-w-md '>
            <h2 className='text-4xl font-bold mb-6 text-center p-2'>
                Register Here
            </h2>

            <form onSubmit={handleSubmit}>
                <label className='text-md font-semibold'>Name</label>
                <input 
                name='name'
                placeholder='Enter your name...'
                type="text" 
                onChange={handleChange}
                className='w-full p-3 border border-white/20 shadow-lg rounded-lg mb-2'
                />
                <label className='text-md font-semibold'>Email</label>
                <input 
                name='email'
                placeholder='Enter your email...'
                type="email" 
                onChange={handleChange}
                className='w-full p-3 border border-white/20 rounded-lg shadow-lg mb-2'
                />
                <label className='text-md font-semibold'>Password</label>
                <input 
                name='password'
                placeholder='Enter your password...'
                type="password" 
                onChange={handleChange}
                className='w-full p-3 border border-white/20 rounded-lg shadow-lg mb-2'
                />
                <label className='text-md font-semibold'>Age</label>
                <input 
                name='age'
                placeholder='Enter your age...'
                type="number" 
                onChange={handleChange}
                className='w-full p-3 border border-white/20 rounded-lg shadow-lg'
                />

                <div className='mt-5'>
                    <button type='submit' className='w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-lg hover:scale-95 transition cursor-pointer text-lg'>
                        {isLoading ? "Creating..." : "Register"}
                    </button>
                    {
                        error && (
                            <p className='text-red-500 text-sm mt-4 text-center'>
                                {error}
                            </p>
                        )
                    }
                </div>
            </form>

            <p className="text-center m-3 text-sm">
                    Already have an account?{" "}
                    <span
                        className="text-blue-600 hover:text-blue-800 cursor-pointer"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </span>
                </p>

        </div>
    </div>
  )
}

export default Register