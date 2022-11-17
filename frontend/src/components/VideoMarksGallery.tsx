import React, { useState } from 'react'
import { Mark } from '../models/Mark'
import { LoadVideo } from '../models/LoadVideo'
import CreateNewMark from './CreateNewMark'
import MarkElement from './MarkElement'
import { CurrentVideoStats } from '../models/CurrentVideoStats'
import "./VideoMarkGallery.css"
import CloseField from './CloseField'
import "../App.css"

type VideoMarksGalleryProps = {
    marks: Mark[]
    loadVideoOptions: (videoOptions: LoadVideo) => void
    currentVideoStats: CurrentVideoStats
    addNewMark: (newMark: Mark) => void
    removeMarkById: (markId: string, isSection: boolean) => void
    editMark: (markId: string, markToEdit: Mark) => void
    player: any
    errorMessages: string[]
    setErrorMessages: React.Dispatch<React.SetStateAction<string[]>>
    isMobile: boolean
    setRenderedComponent: (status: number) => void
    activeComponent: number
}

export default function VideoMarksGallery(props: VideoMarksGalleryProps) {

    const [filterText, setFilterText] = useState("")
    const [renderAddComponent, setRenderAddComponent] = useState(false)

    function filterMarks() {
        let tempList =
            props.marks.filter((mark) => mark.dedicatedVideoId === props.currentVideoStats.videoId).filter((mark) => mark.name.toLowerCase()
                .includes(filterText.toLowerCase()))
        tempList = tempList.sort((a, b) => a.time - b.time)
        return (tempList)
    }

    if (props.activeComponent !== 0) return null;
    if (renderAddComponent) return <CreateNewMark errorMessages={props.errorMessages} setErrorMessages={props.setErrorMessages} setRenderAddComponent={setRenderAddComponent} addNewMark={props.addNewMark} currentVideoStats={props.currentVideoStats} player={props.player} setCloseAddComponent={setRenderAddComponent} />;
    return (
        <div className='left-0 option-section'>
        <span className='marks-gallery'>
            <CloseField isMobile={props.isMobile} setRenderedComponent={props.setRenderedComponent} activeComponent={props.activeComponent}/>
            <span className='filter-add'>
                <div className='form-floating input-field'>
                    <input
                        className={"form-control"}
                        id='filterTextInsert'
                        type={"text"}
                        placeholder="Filter"
                        value={filterText}
                        onChange={(action) => setFilterText(action.target.value)}
                    />
                    <label htmlFor='filterTextInsert' className='input-field'>Filter</label>
                </div>
                <button className='btn btn-danger add-button' onClick={() => setRenderAddComponent(true)}>Add Mark</button>
            </span>
            {filterMarks().map((mark, key) => <MarkElement errorMessages={props.errorMessages} setErrorMessages={props.setErrorMessages} mark={mark} key={key} loadVideoOptions={props.loadVideoOptions} removeById={props.removeMarkById} editMark={props.editMark} player={props.player} currentVideoStats={props.currentVideoStats} />)}
        </span>
        </div>
    )
}
