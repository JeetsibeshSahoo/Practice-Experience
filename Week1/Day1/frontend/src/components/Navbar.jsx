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
        <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
            
            <h1 className="font-bold text-lg">MyApp 🚀</h1>

            <div className="flex items-center gap-4">
                <span className="text-sm text-gray-300">
                    {user?.name}
                </span>

                <button
                    onClick={handleLogout}
                    className="bg-red-500 px-3 py-1 rounded-lg text-sm"
                >
                    Logout
                </button>
            </div>

        </div>
    );
};

export default Navbar;