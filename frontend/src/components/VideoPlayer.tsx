import React, { Ref, useImperativeHandle, useState } from 'react'
import YouTube, { YouTubeEvent, YouTubeProps } from 'react-youtube'
import { CurrentVideoStats } from '../models/CurrentVideoStats';
import { LoadVideo } from '../models/LoadVideo';

export interface RefObject {
    getTime: () => number
}

type VideoPlayerProps = {
    videoPlayOptions: LoadVideo
    setCurentVideoStats: (videoStats: CurrentVideoStats) => void
    ref: Ref<RefObject>
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

    function loadVideoStats(action: YouTubeEvent) {
        if (action) {
            props.setCurentVideoStats({
                videoId: props.videoPlayOptions.videoId,
                currentTime: 0,
                title: action.target.videoTitle
            })
        }
    }

    useImperativeHandle(props.ref, () => ({ getTime }));


    const getTime = (): number => {
        return player.getCurrentTime()
    }



    return (
        <>
            <YouTube
                className='ratio ratio-16x9'
                videoId={props.videoPlayOptions.videoId}
                onStateChange={(e) => actionHandler(e)}
                onReady={(action) => loadVideoStats(action)}
                opts={playOptions}
            />
        </>
    )

}
