import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    User,
    Mail,
    Shield,
    LogOut,
    Lock,
    AlertTriangle,
} from "lucide-react";

import DashboardLayout from "../components/DashboardLayout";
import { logoutAll } from "../features/auth/authSlice";

const Settings = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, isLoading, error } = useSelector(
        (state) => state.auth
    );

    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleLogoutAll = async () => {

        const result = await dispatch(logoutAll());

        if (result.meta.requestStatus === "fulfilled") {
            navigate("/login");
        }
    };

    return (
        <DashboardLayout>

            <div className="min-h-full w-full p-6 relative text-white">

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#ffffff10_1px,transparent_0)] bg-[size:40px_40px]" />

                <div className="absolute top-20 left-20 w-96 h-96 bg-purple-600 opacity-20 blur-3xl rounded-full" />

                <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500 opacity-20 blur-3xl rounded-full" />


                <div className="relative z-10 max-w-5xl mx-auto">

                    <div className="mb-10">

                        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
                            Settings ⚙️
                        </h1>

                        <p className="text-gray-400 mt-2">
                            Manage your account and security settings.
                        </p>

                    </div>

                    <div className="mb-8">

                        <h2 className="text-xl font-semibold mb-4">
                            Account
                        </h2>

                        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">

                            <div className="flex items-center gap-4 py-4 border-b border-white/10">

                                <div className="p-3 rounded-xl bg-purple-500/20">
                                    <User size={20} className="text-purple-400" />
                                </div>

                                <div className="flex-1">

                                    <p className="text-sm text-gray-400">
                                        Name
                                    </p>

                                    <p className="font-medium">
                                        {user?.name || "Not available"}
                                    </p>

                                </div>

                            </div>

                            <div className="flex items-center gap-4 py-4 border-b border-white/10">

                                <div className="p-3 rounded-xl bg-blue-500/20">
                                    <Mail size={20} className="text-blue-400" />
                                </div>

                                <div className="flex-1">

                                    <p className="text-sm text-gray-400">
                                        Email
                                    </p>

                                    <p className="font-medium">
                                        {user?.email || "Not available"}
                                    </p>

                                </div>

                            </div>

                            <div className="flex items-center gap-4 py-4">

                                <div className="p-3 rounded-xl bg-green-500/20">
                                    <Shield size={20} className="text-green-400" />
                                </div>

                                <div className="flex-1">

                                    <p className="text-sm text-gray-400">
                                        Role
                                    </p>

                                    <span
                                        className={`inline-block mt-1 px-3 py-1 rounded-full text-xs ${
                                            user?.role === "admin"
                                                ? "bg-purple-500/20 text-purple-400"
                                                : "bg-blue-500/20 text-blue-400"
                                        }`}
                                    >
                                        {user?.role}
                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="mb-8">

                        <h2 className="text-xl font-semibold mb-4">
                            Security
                        </h2>

                        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden">

                            <button
                                className="w-full flex items-center gap-4 p-6 text-left hover:bg-white/5 transition"
                            >

                                <div className="p-3 rounded-xl bg-yellow-500/20">
                                    <Lock
                                        size={20}
                                        className="text-yellow-400"
                                    />
                                </div>

                                <div className="flex-1">

                                    <p className="font-medium">
                                        Change Password
                                    </p>

                                    <p className="text-sm text-gray-400">
                                        Update your account password.
                                    </p>

                                </div>

                                <span className="text-gray-500">
                                    →
                                </span>

                            </button>


                            <div className="border-t border-white/10" />

                            <button
                                onClick={() => setShowLogoutModal(true)}
                                className="w-full flex items-center gap-4 p-6 text-left hover:bg-red-500/10 transition"
                            >

                                <div className="p-3 rounded-xl bg-red-500/20">
                                    <LogOut
                                        size={20}
                                        className="text-red-400"
                                    />
                                </div>

                                <div className="flex-1">

                                    <p className="font-medium text-red-400">
                                        Logout from all devices
                                    </p>

                                    <p className="text-sm text-gray-400">
                                        Sign out from every active session.
                                    </p>

                                </div>

                                <span className="text-gray-500">
                                    →
                                </span>

                            </button>

                        </div>

                    </div>

                    {error && (
                        <p className="text-red-400 text-sm mb-4">
                            {error}
                        </p>
                    )}

                    <div>

                        <h2 className="text-xl font-semibold mb-4 text-red-400">
                            Danger Zone
                        </h2>

                        <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6">

                            <div className="flex items-center gap-4">

                                <div className="p-3 rounded-xl bg-red-500/20">
                                    <AlertTriangle
                                        size={20}
                                        className="text-red-400"
                                    />
                                </div>

                                <div>

                                    <p className="font-medium">
                                        Delete Account
                                    </p>

                                    <p className="text-sm text-gray-400">
                                        Permanently delete your account and
                                        associated data.
                                    </p>

                                </div>

                            </div>

                            <button
                                disabled
                                className="mt-5 px-5 py-2 rounded-full border border-red-500/30 text-red-400 opacity-50 cursor-not-allowed"
                            >
                                Delete Account
                            </button>

                        </div>

                    </div>

                </div>

                {showLogoutModal && (

                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">

                        <div className="w-full max-w-md bg-[#181818] border border-white/10 rounded-2xl p-6 shadow-2xl">

                            <div className="flex items-center gap-3 mb-4">

                                <div className="p-3 rounded-xl bg-red-500/20">
                                    <LogOut
                                        size={22}
                                        className="text-red-400"
                                    />
                                </div>

                                <h3 className="text-xl font-semibold">
                                    Logout from all devices?
                                </h3>

                            </div>

                            <p className="text-gray-400 mb-6">
                                This will sign you out from all active
                                sessions, including this device.
                            </p>

                            <div className="flex justify-end gap-3">

                                <button
                                    onClick={() =>
                                        setShowLogoutModal(false)
                                    }
                                    className="px-5 py-2 rounded-full border border-white/20 hover:bg-white/10 transition"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={handleLogoutAll}
                                    disabled={isLoading}
                                    className="px-5 py-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500 hover:opacity-90 transition disabled:opacity-50"
                                >
                                    {isLoading
                                        ? "Logging out..."
                                        : "Logout All"}
                                </button>

                            </div>

                        </div>

                    </div>

                )}

            </div>

        </DashboardLayout>
    );
};

export default Settings;