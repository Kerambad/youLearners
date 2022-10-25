import VideoInsert from './components/VideoInsert';
import VideoPlayer from './components/VideoPlayer';
import useManageVideos from './hooks/useManageVideos';

function App() {

  const {addNewVideo, currentVideo} = useManageVideos();

  return (

    <div className="App">
      <VideoPlayer currentVideoId={currentVideo.videoId}/>
      <VideoInsert setVideoIdFunction={addNewVideo}/>
    </div>
  );
}

export default App;
