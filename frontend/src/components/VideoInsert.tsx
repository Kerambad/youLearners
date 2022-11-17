import React, { useState } from 'react'
import { LoadVideo } from '../models/LoadVideo'
import { Video } from '../models/Video'
import CloseField from './CloseField'
import PreRenderVideo from './PreRenderVideo'
import "./VideoInsert.css"
import "../App.css"


type VideoInsertProps = {
    setVideoIdFunction: (video: Video) => void
    activeComponent: number
    loadVideoOptions: (videoOptions: LoadVideo) => void
    isMobile: boolean
    setRenderedComponent: (status: number) => void
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

    function handleFormSubmit(action: React.FormEvent<HTMLFormElement>) {
        action.preventDefault();
        createNewVideo();
        setFormDefault()
    }
    function handlePlayVideo() {
        const videoPlay: LoadVideo = {
            videoId: videoId,
            startTime: 0,
            autoplay: true
        }
        props.loadVideoOptions(videoPlay)
        setFormDefault()
    }

    function setFormDefault() {
        setVideoLink("")
        setVideoId("")
        setVideoTitle("")
    }

    if (props.activeComponent !== 1) return null;
    return (
        <div className='left-3705 option-section'>
            <CloseField isMobile={props.isMobile} setRenderedComponent={props.setRenderedComponent} activeComponent={props.activeComponent}/>
            <PreRenderVideo videoId={videoId} getVideoStatsFunction={(action) => setVideoTitle(action.target.videoTitle)} />
            <form onSubmit={handleFormSubmit}  className={"insert-form"}>
                <div className='form-floating '>
                    <input
                        className={"form-control"}
                        id='linkInsert'
                        type={"text"}
                        placeholder="Video-Link"
                        value={videoLink}
                        onChange={(action) => handleLink(action)}
                    />
                    <label htmlFor='linkInsert'>Video-Link</label>
                </div>
                <div className='form-floating' >
                    <input
                        className={"form-control"}
                        id='idInsert'
                        type={"text"}
                        placeholder="Video-ID"
                        value={videoId}
                        onChange={(action) => setVideoId(action.target.value)}
                        required={true}
                    />
                    <label htmlFor='idInsert'>Video-ID</label>
                </div>
                <div className='form-floating' >
                    <textarea
                        className={"form-control"}
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
                <span className='buttons'>
                    <button className='btn btn-danger w-50' name='playVideo' id='play' type='button' onClick={handlePlayVideo}>Play Video</button>
                    <button className='btn btn-light w-50' name='submit' id='submit' type='submit'>Add to Favorites</button>
                </span>
            </form>
        </div>
    )
}
