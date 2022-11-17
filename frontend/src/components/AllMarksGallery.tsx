import React, { useState } from 'react'
import { Mark } from '../models/Mark'
import { LoadVideo } from '../models/LoadVideo'
import MarkElement from './MarkElement'
import { CurrentVideoStats } from '../models/CurrentVideoStats'
import "./AllMarksGallery.css"
import CloseField from './CloseField'
import "../App.css"


type AllMarksGalleryProps = {
    marks: Mark[]
    activeComponent: number
    loadVideoOptions: (videoOptions: LoadVideo) => void
    removeMarkById: (videoId: string, isSection: boolean) => void
    editMark: (markId: string, markToEdit: Mark) => void
    player: any
    currentVideoStats: CurrentVideoStats
    errorMessages: string[]
    setErrorMessages: React.Dispatch<React.SetStateAction<string[]>>
    isMobile: boolean
    setRenderedComponent: (status: number) => void
}

export default function AllMarksGallery(props: AllMarksGalleryProps) {

    const [filterText, setFilterText] = useState("")

    function filterMarks() {
        return (
            props.marks.filter((mark) => mark.name.toLowerCase()
                .includes(filterText.toLowerCase())))
    }

    if (props.activeComponent !== 3) return null;
    return (
        <div className='left-6205 option-section'>
            <CloseField isMobile={props.isMobile} setRenderedComponent={props.setRenderedComponent} activeComponent={props.activeComponent} />
            <span className='marks-gallery left-50'>
                <div className='form-floating'>
                    <input
                        className="form-control"
                        id='filterTextInsert'
                        type={"text"}
                        placeholder="Filter"
                        value={filterText}
                        onChange={(action) => setFilterText(action.target.value)}
                    />
                    <label htmlFor='filterTextInsert'>Filter</label>
                </div>
                {filterMarks().map((mark, key) => <MarkElement errorMessages={props.errorMessages} setErrorMessages={props.setErrorMessages} mark={mark} key={key} loadVideoOptions={props.loadVideoOptions} removeById={props.removeMarkById} editMark={props.editMark} player={props.player} currentVideoStats={props.currentVideoStats} />)}
            </span>
        </div>
    )
}
