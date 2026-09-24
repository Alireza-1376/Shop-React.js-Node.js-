import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import Header from "../components/admin/Header";


function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div dir="rtl" className="min-h-screen bg-slate-50">
            <Header setSidebarOpen={setSidebarOpen}/>
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <main className="min-h-screen pt-16 lg:pr-64">
                <div className="p-4 sm:p-6 lg:p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

export default AdminLayout;