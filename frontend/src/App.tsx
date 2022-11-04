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

function App() {

  const {addNewVideo, videos, fetchSingleVideo, removeVideoById, updateVideo} = useManageVideos();
  const {marks} = useManageMarks();
  const {setRenderedComponent, activeComponent} = useActiveComponent();
  const {videoPlayOptions, setVideoPlayOptions, curentVideoStats, setCurentVideoStats} = useLoadVideo();

  return (

    <div className="vh-100">
      <VideoPlayer videoPlayOptions={videoPlayOptions} setCurentVideoStats={setCurentVideoStats}/>
      <VideoMarksGallery marks={marks} activeComponent={activeComponent} loadVideoOptions={setVideoPlayOptions} currentVideoStats={curentVideoStats}/>
      <VideoInsert setVideoIdFunction={addNewVideo} isActive={activeComponent} loadVideoOptions={setVideoPlayOptions}/>
      <History isActive={activeComponent} allVideos={videos} removeById={removeVideoById} updateVideo={updateVideo} loadVideoOptions={setVideoPlayOptions}/>
      <AllMarksGallery marks={marks} activeComponent={activeComponent} loadVideoOptions={setVideoPlayOptions}/>
      <Navbar setRenderComponentFunction={setRenderedComponent}/>
    </div>
  );
}

export default App;
