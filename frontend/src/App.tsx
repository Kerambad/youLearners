import Navbar from './components/Navbar';
import VideoInsert from './components/VideoInsert';
import History from './components/History';
import VideoPlayer from './components/VideoPlayer';
import useActiveComponent from './hooks/useActiveComponent';
import useManageVideos from './hooks/useManageVideos';
import Home from './components/Home';

function App() {

  const {addNewVideo, currentVideo, videos, fetchSingleVideo, removeVideoById, updateVideo} = useManageVideos();
  const {setRenderedComponent, activeComponent} = useActiveComponent();

  return (

    <div className="vh-100">
      <VideoPlayer currentVideoId={currentVideo.videoId}/>
      <Home isActive={activeComponent} />
      <VideoInsert setVideoIdFunction={addNewVideo} isActive={activeComponent} loadVideo={fetchSingleVideo } />
      <History isActive={activeComponent} allVideos={videos} loadVideo={fetchSingleVideo } removeById={removeVideoById} updateVideo={updateVideo}/>
      <Navbar setRenderComponentFunction={setRenderedComponent}/>
    </div>
  );
}

export default App;
