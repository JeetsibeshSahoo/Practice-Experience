import { useState } from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, User, Settings, LogOut, Menu } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { menuConfig } from "../config/menuConfig";


const Sidebar = () => {

    const [isOpen, setIsOpen] = useState(() => {
        return localStorage.getItem("sidebar") !== "closed"
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout()).then(() => {
            navigate("/login");
        });
    };

    const filteredMenu = user
  ? menuConfig.filter((item) => item.roles.includes(user.role))
  : [];

    const menuItemClass =
        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300";

    const activeClass =
        "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg";

    const inactiveClass =
        "text-gray-400 hover:text-white hover:bg-white/10";

    return (
        <motion.div
            animate={{ width: isOpen ? 260 : 80 }}
            className="h-screen bg-[#0f0f0f] border-r border-white/10 p-3 flex flex-col justify-between"
        >

            <div>
                <button
                    onClick={() => {
                        setIsOpen(!isOpen);
                        localStorage.setItem("sidebar", !isOpen ? "open" : "closed");
                    }}
                    className="mb-6 p-2 hover:bg-white/10 rounded-lg"
                >
                    <Menu />
                </button>

                {isOpen && (
                    <h2 className="text-2xl font-bold mb-10 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
                        Admin
                    </h2>
                )}

                <nav className="space-y-2">
                    {
                        filterMenu.map((item, idx) => {
                            const Icon = item.icon;

                            return (
                                <NavLink
                                key={idx}
                                to={item.path}
                                className={({ isActive }) => `${menuItemClass} ${isActive ? activeClass : inactiveClass}`}
                                >
                                    <Icon size={20}/>
                                    {isOpen && item.name}
                                </NavLink>
                            );
                        })
                    }
                </nav>
            </div>

            <div className="space-y-4">

                {isOpen && (
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                        <p className="text-sm font-semibold">{user?.name || "User"}</p>
                        <p className="text-xs text-gray-400">{user?.email}</p>
                    </div>
                )}

                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/20 transition"
                >
                    <LogOut size={20} />
                    {isOpen && "Logout"}
                </button>
            </div>
        </motion.div>
    );
};

export default Sidebar;