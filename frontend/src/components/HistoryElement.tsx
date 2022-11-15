import React, { useState } from 'react'
import { Video } from '../models/Video'
import { LoadVideo } from '../models/LoadVideo'
import "./HistoryElement.css"

type HistoryElementProps = {
    video: Video
    removeById: (videoId: string) => void
    updateVideo: (newVideo: Video) => void
    loadVideoOptions: (videoOptions: LoadVideo) => void
}

export default function HistoryElement(props: HistoryElementProps) {

    const [renderEdit, setRenderEdit] = useState(false)
    const [newTitle, setNewTitle] = useState(props.video.title)

    function handleLoadMark() {
        props.loadVideoOptions({
            videoId: props.video.videoId,
            startTime: 0,
            autoplay: false
        })
    }
    function editField() {

        function submitHandler(action: React.FormEvent<HTMLFormElement>) {

            action.preventDefault();
            props.updateVideo({
                videoId: props.video.videoId,
                title: newTitle
            })
            setRenderEdit(false)
        }

        

        if (!renderEdit) return null;
        return (
            <>
                <form onSubmit={(submitHandler)}>
                    <div className='form-floating my-1' >
                        <textarea
                            className={"form-control my-2 w-100"}
                            id='title'
                            placeholder="Title"
                            value={newTitle}
                            onChange={(action) => setNewTitle(action.target.value)}
                            rows={1}
                            style={{ height: '5em' }}
                            required={true}
                        />
                        <label htmlFor='title'>Title</label>
                    </div>
                    <button className='btn btn-danger w-50' type='submit'>Update Title</button>
                    <button className='btn btn-light w-50' onClick={() => setRenderEdit(false)}>Cancel</button>
                </form>
            </>
        )
    }

    return (


        <>
        <span className='history-element'>
            <div className='overflow-scroll mark-text' onClick={() => handleLoadMark()}>
                <p className='m-0'>{props.video.title}</p>
            </div>
            <p className='symbol'>
                <input type="checkbox" className="btn-check " id={"edit"+ props.video.videoId} autoComplete="off" checked={false} onClick={() => setRenderEdit(true)} readOnly />
                <label className="btn btn-outline-secondary button-label" htmlFor={"edit"+ props.video.videoId} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16" >
                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                    </svg>
                </label>
            </p>
            <p className='symbol'>
                <input type="checkbox" className="btn-check " id={"delete"+ props.video.videoId} autoComplete="off" checked={false} onClick={() => props.removeById(props.video.videoId)} readOnly />
                <label className="btn btn-outline-secondary button-label" htmlFor={"delete"+ props.video.videoId} >
                <svg  xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16" >
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                </svg>
                </label>
            </p>
        </span>
        {editField()}
    </>
    )

}