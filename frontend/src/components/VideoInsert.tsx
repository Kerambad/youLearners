import React, { useState } from 'react'
import { Video } from '../models/Video'
import PreRenderVideo from './PreRenderVideo'


type VideoInsertProps = {
    setVideoIdFunction: (video: Video) => void
    loadVideo: (videoId: string) => void
    isActive: number
}
export default function VideoInsert(props: VideoInsertProps) {

    const [videoLink, setVideoLink] = useState("")
    const [videoId, setVideoId] = useState("")
    const [videoTitle, setVideoTitle] = useState("")

    function createNewVideo() {
        props.setVideoIdFunction({
            videoId: videoId,
            title: videoTitle
        })
    }

    function handleLink(action: React.ChangeEvent<HTMLInputElement>) {
        setVideoLink(action.target.value)
        setVideoId(trimLinkToVideoId(action.target.value))
    }

    function trimLinkToVideoId(link: string): string {
        return link.split("v=")[1]
    }

    function handleFormSubmitt(action: React.FormEvent<HTMLFormElement>) {
        action.preventDefault();
        createNewVideo();
        setVideoId("");
        setVideoTitle("");
    }

    if (props.isActive !== 1) return null;
    return (
        <div className={"container text-center"}>
            <PreRenderVideo videoId={videoId} getVideoStatsFunction={(action) => setVideoTitle(action.target.videoTitle)} />
            <form onSubmit={handleFormSubmitt}>
                <div className='form-floating my-1'>
                    <input
                        className={"form-control my-2 w-100"}
                        id='linkInsert'
                        type={"text"}
                        placeholder="Video-Link"
                        value={videoLink}
                        onChange={(action) => handleLink(action)}
                    />
                    <label htmlFor='linkInsert'>Video-Link</label>
                </div>
                <div className='form-floating my-1' >
                    <input
                        className={"form-control my-2 w-100"}
                        id='idInsert'
                        type={"text"}
                        placeholder="Video-ID"
                        value={videoId}
                        onChange={(action) => setVideoId(action.target.value)}
                        required={true}
                    />
                    <label htmlFor='idInsert'>Video-ID</label>
                </div>
                <div className='form-floating my-1' >
                    <textarea
                        className={"form-control my-2 w-100"}
                        id='title'
                        placeholder="Title"
                        value={videoTitle}
                        onChange={(action) => setVideoTitle(action.target.value)}
                        rows={1}
                        style={{ height: '7em' }}
                        required={true}
                    />
                    <label htmlFor='title'>Title</label>
                </div>
                <button className='btn btn-danger w-50 ' type='submit'>Add Video</button>
            </form>
        </div>
    )
}
