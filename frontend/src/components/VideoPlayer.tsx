import React from 'react'
import YouTube, { YouTubeEvent, YouTubeProps } from 'react-youtube'
import { CurrentVideoStats } from '../models/CurrentVideoStats';
import { LoadVideo } from '../models/LoadVideo';

type VideoPlayerProps = {
    videoPlayOptions: LoadVideo
    setCurentVideoStats: (videoStats: CurrentVideoStats) => void
    player: any
    setPlayer: React.Dispatch<any>
}

export default function VideoPlayer(props: VideoPlayerProps) {


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
        props.setPlayer(e.target);
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
        if (props.player) {
            props.player.playVideo()
            props.player.seekTo(time, "seconds");
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
