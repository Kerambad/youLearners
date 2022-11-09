import { useState } from 'react'

export default function useActiveComponent() {
    const [activeComponent, setActiveComponent] = useState<number>(0)

    const setRenderedComponent = (status: number) => {
        setActiveComponent(status)
    }
    return { setRenderedComponent, activeComponent }
}
