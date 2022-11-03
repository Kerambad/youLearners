import React, { useState } from 'react'
import YouTube, { YouTubeProps } from 'react-youtube'
import { videoPlayOptions } from '../models/VideoPlayOptions';

type VideoPlayerProps = {
    currentVideoId: string;
    videoPlayOptions: videoPlayOptions
}

export default function VideoPlayer(props: VideoPlayerProps) {

    const [toggleplayFunction, setTogglePlayFunction] = useState(false)

    function getAutoplay(): number {
        if (props.videoPlayOptions.autoplay) {
            return 1;
        }
        return 0;
    }

    const playOptions: YouTubeProps['opts'] = {
        playerVars: {
            autoplay: getAutoplay(),
            fs: 0
        },
    };

    const onReady: YouTubeProps['onReady'] = (event) => {
        if (props.videoPlayOptions.startTime !== 0) {
            event.target.pauseVideo()
            console.log(event.target);

        }
    }

    const onPlay: YouTubeProps['onPlay'] = (event) => {
        event.target.seekTo(props.videoPlayOptions.startTime, false)
    }

console.log(toggleplayFunction);

    return (
        <>
            <YouTube
                className='ratio ratio-16x9'
                videoId={props.currentVideoId}
                onStateChange={(e) => console.log(e.target)}
                opts={playOptions}
                onReady={onReady}
                onPlay={onPlay}
            />

        </>
    )

}
