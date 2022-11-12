import React, { useState } from 'react'
import { Mark } from '../models/Mark'
import { LoadVideo } from '../models/LoadVideo'
import CreateNewMark from './CreateNewMark'
import MarkElement from './MarkElement'
import { CurrentVideoStats } from '../models/CurrentVideoStats'

type VideoMarksGalleryProps = {
    marks: Mark[]
    activeComponent: number
    loadVideoOptions: (videoOptions: LoadVideo) => void
    currentVideoStats: CurrentVideoStats
    addNewMark: (newMark: Mark) => void
    removeMarkById: (markId: string, isSection: boolean) => void
    editMark: (markId: string, markToEdit: Mark) => void
    player: any
    errorMessages: string[]
    setErrorMessages: React.Dispatch<React.SetStateAction<string[]>>
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
        <>
            <div style={{ display: "flex" }}>
                <div className='col-8 form-floating'>
                    <input
                        className={"form-control my-2"}
                        id='filterTextInsert'
                        type={"text"}
                        placeholder="Filter"
                        value={filterText}
                        onChange={(action) => setFilterText(action.target.value)}
                    />
                    <label htmlFor='filterTextInsert'>Filter</label>
                </div>
                <button className='col-4 btn btn-danger p-0 my-2' onClick={() => setRenderAddComponent(true)}>Add Mark</button>
            </div>
            {filterMarks().map((mark, key) => <MarkElement errorMessages={props.errorMessages} setErrorMessages={props.setErrorMessages} mark={mark} key={key} loadVideoOptions={props.loadVideoOptions} removeById={props.removeMarkById} editMark={props.editMark} player={props.player} currentVideoStats={props.currentVideoStats} />)}
        </>
    )
}
