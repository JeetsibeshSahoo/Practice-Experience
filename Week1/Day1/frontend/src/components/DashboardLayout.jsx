// import Sidebar from "./Sidebar";
// import Navbar from "./Navbar";

// const DashboardLayout = ({ children }) => {
//     return (
//         <div className="flex min-h-screen bg-[#0f0f0f] text-white">
//             <div>
//                 <Sidebar />
//             </div>
//             <div className="flex-1 flex flex-col min-h-screen">
//                 <Navbar />
//                 <div className="flex-1 relative overflow-hidden">
//                     {children}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DashboardLayout;
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const DashboardLayout = ({ children }) => {
    return (
        <div className="flex h-screen overflow-hidden bg-[#0f0f0f] text-white">

            {/* Sidebar */}
            <div className="h-screen shrink-0">
                <Sidebar />
            </div>

            {/* Right Side */}
            <div className="flex-1 flex flex-col h-screen min-w-0">

                {/* Navbar */}
                <div className="shrink-0">
                    <Navbar />
                </div>

                {/* ONLY THIS AREA SCROLLS */}
                <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
                    {children}
                </main>

            </div>

        </div>
    );
};

export default DashboardLayout;