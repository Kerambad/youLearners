import { useState } from "react";
import { CurrentVideoStats } from "../models/CurrentVideoStats";
import { LoadVideo } from "../models/LoadVideo";

export default function useLoadVideo() {
    const [videoPlayOptions, setVideoPlayOptions] = useState<LoadVideo>({
        videoId: "",
        startTime: 0,
        autoplay: false
    });
const [curentVideoStats, setCurentVideoStats] = useState<CurrentVideoStats>({
    videoId: "",
    currentTime: 0,
    title: ""
})
    


    return {setVideoPlayOptions, videoPlayOptions, setCurentVideoStats,curentVideoStats}
}