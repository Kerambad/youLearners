import Navbar from './components/Navbar';
import VideoInsert from './components/VideoInsert';
import History from './components/History';
import VideoPlayer from './components/VideoPlayer';
import useActiveComponent from './hooks/useActiveComponent';
import useManageVideos from './hooks/useManageVideos';
import AllMarksGallery from './components/AllMarksGallery';
import useManageMarks from './hooks/useManageMarks';
import useLoadVideo from './hooks/useLoadVideo';
import VideoMarksGallery from './components/VideoMarksGallery';
import { CurrentVideoStats } from './models/CurrentVideoStats';
import { useState } from 'react';

function App() {

  const {addNewVideo, videos, fetchSingleVideo, removeVideoById, updateVideo} = useManageVideos();
  const {marks} = useManageMarks();
  const {setRenderedComponent, activeComponent} = useActiveComponent();
  const {currentVideoId, loadVideoById, videoPlayOptions, setVideoPlayOptions} = useLoadVideo();

  const [currentVideoStats,setCurrentVideoStats] = useState<CurrentVideoStats>({
    videoId: "",
    currentTime: 0
}
)

  return (

    <div className="vh-100">
      <VideoPlayer currentVideoId={currentVideoId} videoPlayOptions={videoPlayOptions}/>
      <VideoMarksGallery marks={marks} activeComponent={activeComponent} loadVideo={loadVideoById} loadVideoOptions={setVideoPlayOptions}/>
      <VideoInsert setVideoIdFunction={addNewVideo} isActive={activeComponent} loadVideo={loadVideoById } />
      <History isActive={activeComponent} allVideos={videos} loadVideo={loadVideoById } removeById={removeVideoById} updateVideo={updateVideo} loadVideoOptions={setVideoPlayOptions}/>
      <AllMarksGallery marks={marks} activeComponent={activeComponent} loadVideo={loadVideoById} loadVideoOptions={setVideoPlayOptions}/>
      <Navbar setRenderComponentFunction={setRenderedComponent}/>
    </div>
  );
}

export default App;
