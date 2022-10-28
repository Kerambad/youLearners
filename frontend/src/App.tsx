import Navbar from './components/Navbar';
import VideoInsert from './components/VideoInsert';
import VideoPlayer from './components/VideoPlayer';
import useActiveComponent from './hooks/useActiveComponent';
import useManageVideos from './hooks/useManageVideos';

function App() {

  const {addNewVideo, currentVideo} = useManageVideos();
  const {setRenderedComponent, activeComponent} = useActiveComponent();

  return (

    <div className="vh-100">
      <VideoPlayer currentVideoId={currentVideo.videoId}/>
      <VideoInsert setVideoIdFunction={addNewVideo} isActive={activeComponent}/>
      <Navbar setRenderComponentFunction={setRenderedComponent}/>
    </div>
  );
}

export default App;
