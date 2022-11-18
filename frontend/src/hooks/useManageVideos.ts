import { useEffect, useState } from 'react';
import axios from 'axios';
import { Video } from '../models/Video';
import { toast } from 'react-toastify';

export default function useManageVideos() {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    fetchAllVideos();
  }, [])

  const fetchAllVideos = () => {
    axios.get("/api/videos")
      .then((response) => response.data)
      .then((data) => setVideos(data))
      .catch((error) => toast.error(error.response.data))
  }

  const addNewVideo = (newVideo: Video) => {
    axios.post("/api/videos", newVideo)
      .then((response) => response.data)
      .then(() => fetchAllVideos())
      .catch(() => fetchSingleVideo(newVideo.videoId));
  }

  const fetchSingleVideo = (videoId: string) => {
    axios.get("/api/videos/" + videoId)
      .then((responde) => responde.data)
      .catch((error) => toast.error(error.response.data))
  }

  const removeVideoById = (videoId: string) => {
    axios.delete("/api/videos/" + videoId)
      .then(() => fetchAllVideos())
      .catch((error) => toast.error(error.response.data))
  }

  const updateVideo = (newVideo: Video) => {
    axios.put("/api/videos", newVideo)
      .then(() => fetchAllVideos())
      .catch((error) => toast.error(error.response.data))
  }

  return { videos, addNewVideo, fetchSingleVideo, removeVideoById, updateVideo}
}