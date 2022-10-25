import React, { } from 'react'
import YouTube, { YouTubeProps } from 'react-youtube'

type VideoPlayerProps = {
    currentVideoId: string;
}

export default function VideoPlayer(props: VideoPlayerProps) {
    const playOptions: YouTubeProps['opts'] = {
        width: window.screen.width,
        height: (window.screen.width / 16) * 9,
        playerVars: {
          autoplay: 0,
          fs: 0
        },
      };
    return (
        <div className='ratio ratio-16x9'>
            <YouTube
                videoId={props.currentVideoId}
                opts={playOptions}
            />

        </div>
    )

}
