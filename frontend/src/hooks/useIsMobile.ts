import { useEffect, useState } from "react";

export default function useIsMobile() {

    const [isMobile, setIsMoblie] = useState(false)

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth > 500) setIsMoblie(false)
            else setIsMoblie(true)
        }

        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return isMobile
}