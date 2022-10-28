import { useState } from 'react'

export default function useActiveComponent() {
    const [activeComponent, setActiveComponent] = useState<number>(0)

    const renderComponent = (status: number) => {
        setActiveComponent(status)
    }

    return { renderComponent, activeComponent }
}
