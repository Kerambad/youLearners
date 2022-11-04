import React, { useState } from 'react'
import YouTube, { YouTubeProps } from 'react-youtube'
import { VideoPlayOptions } from '../models/VideoPlayOptions';

type VideoPlayerProps = {
    currentVideoId: string;
    videoPlayOptions: VideoPlayOptions
}

export default function VideoPlayer(props: VideoPlayerProps) {


    const [player, setPlayer] = useState<any>();
    let isAllreadyPlayed: boolean = false

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
    const actionHandler = (e: any) => {
        setPlayer(e.target);
        if (e.data === -1) {
            isAllreadyPlayed = false;
        }
        if ()
        if (e.data === 1 && !isAllreadyPlayed) {
            goToTime(props.videoPlayOptions.startTime);
            isAllreadyPlayed = true
        }
        console.log(e);
    };

    function goToTime(time: number) {
        if (player) {
            player.playVideo()
            player.seekTo(time, "seconds");
        }
    }


    return (
        <>
            <YouTube
                className='ratio ratio-16x9'
                videoId={props.currentVideoId}
                onStateChange={(e) => actionHandler(e)}
                opts={playOptions}
            />

        </>
    )

}
