import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";

const Dashboard = () => {
    const { user } = useSelector((state) => state.auth);
    console.log("USER STATE:", user);

    return (
        <div className="min-h-screen flex flex-col bg-black">
            
            <Navbar />

            {/* Background Glow */}
            <div className="flex-1 relative flex items-center justify-center overflow-hidden">

                {/* Gradient Blobs */}
                <div className="absolute w-72 h-72 bg-purple-600 rounded-full blur-3xl opacity-30 top-10 left-10 animate-pulse"></div>
                <div className="absolute w-72 h-72 bg-pink-500 rounded-full blur-3xl opacity-30 bottom-10 right-10 animate-pulse"></div>

                {/* Glass Card */}
                <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-10 shadow-2xl text-center max-w-md w-full">

                    <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
                        Welcome {user?.name} 👋
                    </h1>

                    <p className="text-gray-300 mb-6">
                        You are successfully logged in 🚀
                    </p>

                    {/* Fancy Button */}
                    <button className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition-transform duration-300 shadow-lg">
                        Explore 🚀
                    </button>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;