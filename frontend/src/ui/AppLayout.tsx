import { Outlet } from "react-router-dom"
import Navbar from "../components/navbar/Navbar"
import Footer from "./Footer";

function AppLayout() {
    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default AppLayout;