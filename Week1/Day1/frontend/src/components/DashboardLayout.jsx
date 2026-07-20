import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const DashboardLayout = ({ children }) => {
    return (
        <div className="flex min-h-screen bg-[#0f0f0f] text-white">

            <div>
                <Sidebar />
            </div>

            <div className="flex-1 flex flex-col min-h-screen">
                <Navbar />

                <div className="flex-1 relative overflow-hidden">
                    {children}
                </div>
            </div>

        </div>
    );
};

export default DashboardLayout;