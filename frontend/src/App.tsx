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
  const {currentVideoId, loadVideoById, videoPlayOptions} = useLoadVideo();

  return (

    <div className="vh-100">
      <VideoPlayer currentVideoId={currentVideoId} videoPlayOptions={videoPlayOptions}/>
      <VideoMarksGallery marks={marks} activeComponent={activeComponent} loadVideo={loadVideoById}/>
      <VideoInsert setVideoIdFunction={addNewVideo} isActive={activeComponent} loadVideo={loadVideoById } />
      <History isActive={activeComponent} allVideos={videos} loadVideo={loadVideoById } removeById={removeVideoById} updateVideo={updateVideo}/>
      <AllMarksGallery marks={marks} activeComponent={activeComponent} loadVideo={loadVideoById}/>
      <Navbar setRenderComponentFunction={setRenderedComponent}/>
    </div>
  );
}

export default App;
