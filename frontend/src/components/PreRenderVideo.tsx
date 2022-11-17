import React from 'react'
import YouTube, { YouTubeEvent } from 'react-youtube'
type PreRenderVideoProps = {
    videoId: string
    getVideoStatsFunction: (videoStats: YouTubeEvent) => void
}

export default function PreRenderVideo(props: PreRenderVideoProps) {

  return (
            <YouTube
            className='visually-hidden'
                videoId={props.videoId}
                onReady={(e) => props.getVideoStatsFunction(e)}
            />
  )
}
