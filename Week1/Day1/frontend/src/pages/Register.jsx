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
    <div>
        <h2>Register</h2>

        <form onSubmit={handleSubmit}>
            <input 
            name='name' 
            placeholder='Your name...' 
            type="text"
            onChange={handleChange} 
            />
            <input 
            name='email' 
            placeholder='Your Email...' 
            type="email"
            onChange={handleChange} 
            />
            <input 
            name='password' 
            placeholder='Your password...' 
            type="password"
            onChange={handleChange} 
            />
            <input 
            name='age' 
            placeholder='Your age...' 
            type="number"
            onChange={handleChange} 
            />
            <button type='submit'>
                {isLoading ? "Loading..." : "Register"}
            </button>
        </form>
        {error && <p style={{color : "red"}}>{error}</p>}
    </div>
  )
}

export default Register