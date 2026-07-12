import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, error } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await dispatch(login(formData));

        if (res.meta.requestStatus === "fulfilled") {
            navigate("/dashboard");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800">
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700">
                
                <h2 className="text-3xl font-bold text-center text-white mb-6">
                    🔐 Welcome Back
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600"
                    />

                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600"
                    />

                    <div className="space-y-3 mt-4">
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-lg"
                        >
                            {isLoading ? "Logging in..." : "Login"}
                        </button>

                        {error && (
                            <div className="bg-red-500/20 text-red-400 text-sm p-2 rounded text-center">
                                {error}
                            </div>
                        )}
                    </div>
                </form>

                <p className="text-gray-400 text-sm text-center mt-6">
                    Don’t have an account?{" "}
                    <span
                        className="text-purple-400 cursor-pointer"
                        onClick={() => navigate("/register")}
                    >
                        Register
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;