import React from 'react'
import { Video } from '../models/Video'
type HistoryElementProps = {
    video: Video
    removeById: (videoId: string) => void
}

export default function HistoryElement(props: HistoryElementProps) {
  return (
    <>
        <div className='col'>
            <p>{props.video.title}</p>
            <button className='btn btn-secondary' onClick={() => props.removeById(props.video.videoId)}>X</button>
        </div>
    </>
  )
}
