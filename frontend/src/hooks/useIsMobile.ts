import { useEffect, useState } from "react";

export default function useIsMobile() {

    const [isMobile, setIsMoblie] = useState(window.innerWidth < 500)

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth >= 500) setIsMoblie(false)
            else setIsMoblie(true)
        }

        window.addEventListener('resize', handleResize)
    })
console.log(isMobile);

    return isMobile
}