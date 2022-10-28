import React from 'react'
import { Video } from '../models/Video'
type HistoryElementProps = {
    video: Video
}

export default function HistoryElement(props: HistoryElementProps) {
  return (
    <div>
        <p>{props.video.videoId}</p>
    </div>
  )
}
