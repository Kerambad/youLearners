import { useEffect, useState } from 'react';
import axios from 'axios';
import { Video } from '../models/Video';

export default function useManageVideos() {
  const [videos, setVideos] = useState([])
  const [currentVideo,setCurrentVideo] = useState<Video>({
    videoId:"",
    title: ""
  })

    useEffect(() => {
        fetchAllVideos();
      }, [])
    
      const fetchAllVideos = () => {
        axios.get("/api/videos")
          .then((response) => response.data)
          .then((data) => setVideos(data))
          .catch((error) => console.log(error))
      }

      const addNewVideo = (newVideo: Video) => {
        axios.post("/api/videos", newVideo)
        .then((response) => response.data)
        .then((data) => setCurrentVideo(data))
        .then(() => fetchAllVideos())
        .catch(() => fetchSingleVideo(newVideo.videoId));
      }

      const fetchSingleVideo = (videoId:string) => { 
        axios.get("/api/videos/" + videoId)
        .then((responde) => responde.data)
        .then((data) => setCurrentVideo(data))
        .catch((error) => console.log(error))
       }

       const removeVideoById = (videoId:string) => { 
        axios.delete("/api/videos/" + videoId)
        .then(() => fetchAllVideos())
        .catch((error) => console.log(error))
        }

      return{videos, addNewVideo, currentVideo, fetchSingleVideo, removeVideoById}
}
