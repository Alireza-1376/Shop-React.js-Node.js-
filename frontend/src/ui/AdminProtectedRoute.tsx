import { Navigate, useLocation } from "react-router-dom"
import useAuthorize from "../hooks/useAuthorize"
import Loading from "./Loading"

function ProtectedRoute({ children }: { children: React.ReactElement }) {
    const { isLoading, authentication, authorized } = useAuthorize()
    const location = useLocation();

    if (isLoading) {
        return (
            <div className="h-screen w-screen flex items-center justify-center">
                <Loading size={50} />
            </div>
        )
    }

    if (!authentication) {
        return <Navigate to="/" replace />
    }

    if (location.pathname.includes("admin") && !authorized) {
        return <Navigate to="/" replace />
    }

    if (authentication && authorized) {
        return children;
    }

}

export default ProtectedRoute