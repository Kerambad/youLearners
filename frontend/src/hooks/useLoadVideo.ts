import { useState } from "react";
import { videoPlayOptions } from "../models/VideoPlayOptions";

export default function useLoadVideo() {
    const [currentVideoId, setCurrentVideoId] = useState("");

    function loadVideoById(videoId:string) {
        setCurrentVideoId(videoId);
    }
    let videoPlayOptions:videoPlayOptions = {
        startTime: 30,
        autoplay: true
    } 

    return {currentVideoId, loadVideoById, videoPlayOptions}
}