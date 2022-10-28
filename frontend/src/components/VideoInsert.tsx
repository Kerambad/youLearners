import React, { useState } from 'react'
import { Video } from '../models/Video'


type VideoInsertProps = {
    setVideoIdFunction: (video: Video) => void
    loadVideo: (videoId: string) => void
    isActive: number
}
export default function VideoInsert(props: VideoInsertProps) {

    const [idInput, setIdInput] = useState("")

    function createNewVideo() {
        props.setVideoIdFunction({
            videoId: idInput
        })
    }

    if (props.isActive !== 1) return null;
    return (
        <div className={"container text-center"}>
            <form onSubmit={(e) => {
                e.preventDefault(); 
                createNewVideo();
                setIdInput("");
                }}>
                <input  className={"form-control my-2 w-100"} type={"text"} placeholder="Video-ID" value={idInput} onChange={(action) => setIdInput(action.target.value)}></input>
                <button className='btn btn-danger w-50 ' type='submit'>Add Video</button>
            </form>
                
        </div>
    )
}
