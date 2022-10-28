import React from 'react'
import { Video } from '../models/Video'
type HistoryElementProps = {
    video: Video
}

export default function HistoryElement(props: HistoryElementProps) {
  return (
    <>
        <p>{props.video.title}</p>
    </>
  )
}
