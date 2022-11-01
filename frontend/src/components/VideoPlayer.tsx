import React, {} from 'react'
import YouTube, {YouTubeProps} from 'react-youtube'

type VideoPlayerProps = {
    currentVideoId: string;
}

export default function VideoPlayer(props: VideoPlayerProps) {
    const playOptions: YouTubeProps['opts'] = {
        playerVars: {
            autoplay: 0,
            fs: 0
        },
    };
    return (
        <>
            <YouTube
                className='ratio ratio-16x9'
                videoId={props.currentVideoId}
                onStateChange={(e) => console.log(e.target.videoTitle)}
                opts={playOptions}
            />

        </>
    )

}
