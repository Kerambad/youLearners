import React, { useState } from 'react'
import { Mark } from '../models/Mark'
import { VideoPlayOptions } from '../models/VideoPlayOptions'
import CreateNewMark from './CreateNewMark'
import MarkElement from './MarkElement'

type VideoMarksGalleryProps = {
    marks: Mark[]
    activeComponent: number
    loadVideo: (videoId: string) => void
    loadVideoOptions: (videoOptions: VideoPlayOptions) => void
}

export default function VideoMarksGallery(props: VideoMarksGalleryProps) {

    const [filterText, setFilterText] = useState("")
    const [renderAddComponent, setRenderAddComponent] = useState(false)

    function filterMarks() {
        return (
            props.marks.filter((mark) => mark.name.toLowerCase()
                .includes(filterText.toLowerCase())))
    }

    if (props.activeComponent !== 0) return null;
    if (renderAddComponent) return <CreateNewMark setRenderAddComponent={setRenderAddComponent}/>;
    return (
        <div>
            <div className='row'>
                <div className='col-6 form-floating my-1'>
                    <input
                        className={"form-control my-2 w-100"}
                        id='filterTextInsert'
                        type={"text"}
                        placeholder="Filter"
                        value={filterText}
                        onChange={(action) => setFilterText(action.target.value)}
                    />
                    <label htmlFor='filterTextInsert'>Filter</label>
                    <button className='col-6 btn btn-danger w-50' onClick={() => setRenderAddComponent(true)}>Add Video</button>
                </div>
            </div>
            {filterMarks().map((mark, key) => <MarkElement mark={mark} key={key} loadVideo={props.loadVideo} loadVideoOptions={props.loadVideoOptions} />)}
        </div>
    )
}
