import { Navigate, useLocation } from "react-router-dom";
import useAuthorize from "../hooks/useAuthorize";
import Loading from "./Loading";

function LoginProtectRoute({ children }: { children: React.ReactElement }) {
  const { isLoading, authentication } = useAuthorize()
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Loading size={50} />
      </div>
    )
  }

  if ((location.pathname.includes("login") || location.pathname.includes("check-otp") || location.pathname.includes("/complete-profile")) && authentication) {
    return <Navigate to="/" replace />
  }

  return children;
}

export default LoginProtectRoute