import { Navigate, useLocation } from "react-router-dom";
import useAuthorize from "../hooks/useAuthorize";
import Loading from "./Loading";

function LoginProtectRoute({
  children,
}: {
  children: React.ReactElement;
}) {
  const { isLoading, user, authentication } = useAuthorize();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Loading size={50} />
      </div>
    );
  }

  
  if (location.pathname.includes("checkout") && !user) {
    return <Navigate to="/" replace />;
  }

  
  if (
    (location.pathname.includes("login") ||
      location.pathname.includes("check-otp")) &&
    authentication
  ) {
    return <Navigate to="/" replace />;
  }

  if (
    (location.pathname.includes("login") ||
      location.pathname.includes("check-otp") ||
      location.pathname.includes("complete-profile")) &&
    user &&
    user.isProfileCompleted
  ) {
    return <Navigate to="/" replace />;
  }


  return children;
}

export default LoginProtectRoute;
