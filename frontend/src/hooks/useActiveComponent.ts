import { useState } from 'react'

export default function useActiveComponent() {

    // Rendering States:

    // VideoMarksGallery = 0
    // VideoInsert = 1
    // History = 2
    // AllMarksGallery = 3
    // NoRendering = -1

    const [activeComponent, setActiveComponent] = useState<number>(0)

    const setRenderedComponent = (status: number) => {
        setActiveComponent(status)
    }
    return { setRenderedComponent, activeComponent }
}
