import { useEffect } from "react";

function useOutsideClick(userMenuRef: React.RefObject<HTMLDivElement | null>, callback: () => void) {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                callback();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [])
}

export default useOutsideClick;