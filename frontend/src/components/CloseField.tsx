import React from 'react'
import "./CloseField.css"

type CloseFieldProps = {
    isMobile: boolean
    setRenderedComponent: (status: number) => void
    activeComponent: number
}

export default function CloseField(props: CloseFieldProps) {
    function onClickCloseButton() {
        props.setRenderedComponent(-1)
    }

    if (props.isMobile || (props.activeComponent === -1)) {
        return null
    }
    return (
        <span className='close-tile'>
            <button 
            type="button" 
            className="btn-close btn-close-white" 
            aria-label="Close" 
            onClick={onClickCloseButton}
            >
            </button>
        </span>
    )
}
