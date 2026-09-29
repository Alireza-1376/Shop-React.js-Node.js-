import { useLocation } from "react-router-dom";
import { useUser } from "./useUser";

export default function useAuthorize() {
    const { user, isLoading } = useUser();
    const location = useLocation();

    let authentication = false;
    if (user) {
        authentication = true
    }

    let authorized = false;
    if (location.pathname.includes("admin")) {
        if (user && user.role == "admin") {
            authorized = true
        }
    }


    return { user, isLoading, authentication, authorized }
}