import Navbar from './components/Navbar';
import VideoInsert from './components/VideoInsert';
import VideoPlayer from './components/VideoPlayer';
import useManageVideos from './hooks/useManageVideos';

function App() {

  const {addNewVideo, currentVideo} = useManageVideos();

  return (

    <div className="vh-100">
      <VideoPlayer currentVideoId={currentVideo.videoId}/>
      <VideoInsert setVideoIdFunction={addNewVideo}/>
      <Navbar/>
    </div>
  );
}

export default App;
