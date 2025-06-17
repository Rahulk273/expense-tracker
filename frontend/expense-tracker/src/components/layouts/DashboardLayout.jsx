



import React, { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import Navbar from './Navbar';
import SideMenu from './SideMenu';
import { Navigate } from 'react-router-dom'; // ✅ needed for redirect

const DashboardLayout = ({ children, activeMenu }) => {
    const { user, loading } = useContext(UserContext);

    if (loading) {
        return (
            <div className="h-screen flex justify-center items-center text-gray-600">
                Loading...
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" />; // 🔐 Block unauthenticated access
    }

    return (
        <div className="min-h-screen bg-gray-50 text-black">
            <Navbar activeMenu={activeMenu} />

            <div className="flex">
                {/* Sidebar */}
                <div className="max-[1080px]:hidden">
                    <SideMenu activeMenu={activeMenu} />
                </div>

                {/* Main Content */}
                <div className="grow mx-5 mt-4">{children}</div>
            </div>
        </div>
    );
};

export default DashboardLayout;

