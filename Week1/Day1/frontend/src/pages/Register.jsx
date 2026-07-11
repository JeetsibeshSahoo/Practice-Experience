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
            alert ("Registered Successfully");
            navigate("/login");
        }
    };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
        <div className='bg-white p-8 rounded-2xl justify-center shadow-md w-full max-w-md'>
            <h2 className='text-2xl font-bold mb-6 text-center'>
                Create Account
            </h2>

            <form>
                <input 
                name='name'
                placeholder='Enter your name...'
                type="text" 
                onChange={handleChange}
                className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
                />
                <input 
                name='email'
                placeholder='Enter your email...'
                type="email" 
                onChange={handleChange}
                className='w-full p-3 border rounded-lg'
                />
                <input 
                name='password'
                placeholder='Enter your password...'
                type="password" 
                onChange={handleChange}
                className='w-full p-3 border rounded-lg'
                />
                <input 
                name='age'
                placeholder='Enter your age...'
                type="number" 
                onChange={handleChange}
                className='w-full p-3 border rounded-lg'
                />

                <div className='mt-5'>
                    <button type='submit' className='w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition'>
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
        </div>
    </div>
  )
}

export default Register