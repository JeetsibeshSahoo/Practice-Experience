import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const handleLogout = async () => {
        await dispatch(logout());
        navigate("/login");
    };

    return (
        <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10 shadow-lg">
            
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                {/* 🔥 Logo */}
                <h1 className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
                    MyApp 🚀
                </h1>

                {/* 👤 Right Section */}
                <div className="flex items-center gap-5">

                    {/* 🟢 User Info */}
                    <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>

                        <span className="text-sm text-gray-300">
                            {user?.name || "User"}
                        </span>
                    </div>

                    {/* 🔥 Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="px-4 py-1.5 rounded-full bg-gradient-to-r from-red-500 to-pink-500 hover:scale-105 transition-transform duration-300 shadow-md cursor-pointer"
                    >
                        Logout
                    </button>

                </div>
            </div>

        </div>
    );
};

export default Navbar;