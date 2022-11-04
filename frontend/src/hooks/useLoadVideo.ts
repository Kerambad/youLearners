import { useState } from "react";
import { VideoPlayOptions } from "../models/VideoPlayOptions";

export default function useLoadVideo() {
    const [currentVideoId, setCurrentVideoId] = useState("");
    const [videoPlayOptions, setVideoPlayOptions] = useState<VideoPlayOptions>({
        startTime: 0,
        autoplay: false
    });

    function loadVideoById(videoId:string) {
        setCurrentVideoId(videoId);
    }

    return {currentVideoId, loadVideoById, setVideoPlayOptions, videoPlayOptions}
}