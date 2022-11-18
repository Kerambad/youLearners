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
import { useState } from 'react';
import "./App.css"
import useIsMobile from './hooks/useIsMobile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const { addNewVideo, videos, removeVideoById, updateVideo } = useManageVideos();
  const { marks, addNewMark, removeMarkById, updateMark, errorMessages, setErrorMessages } = useManageMarks();
  const { setRenderedComponent, activeComponent } = useActiveComponent();
  const { videoPlayOptions, setVideoPlayOptions, curentVideoStats, setCurentVideoStats } = useLoadVideo();
  const isMobile = useIsMobile()
  const [player, setPlayer] = useState<any>();


  return (

    <div className="app-style">
      <ToastContainer />
      <div className='video'>
        <div className='video-player'>
          <VideoPlayer videoPlayOptions={videoPlayOptions} setCurentVideoStats={setCurentVideoStats} player={player} setPlayer={setPlayer} />
        </div>
      </div>
      <VideoMarksGallery isMobile={isMobile} setRenderedComponent={setRenderedComponent} errorMessages={errorMessages} setErrorMessages={setErrorMessages} player={player} marks={marks} activeComponent={activeComponent} loadVideoOptions={setVideoPlayOptions} currentVideoStats={curentVideoStats} addNewMark={addNewMark} removeMarkById={removeMarkById} editMark={updateMark} />
      <VideoInsert isMobile={isMobile} setRenderedComponent={setRenderedComponent} setVideoIdFunction={addNewVideo} activeComponent={activeComponent} loadVideoOptions={setVideoPlayOptions} />
      <AllMarksGallery isMobile={isMobile} setRenderedComponent={setRenderedComponent} errorMessages={errorMessages} setErrorMessages={setErrorMessages} marks={marks} activeComponent={activeComponent} loadVideoOptions={setVideoPlayOptions} removeMarkById={removeMarkById} editMark={updateMark} currentVideoStats={curentVideoStats} player={player} />
      <History isMobile={isMobile} setRenderedComponent={setRenderedComponent} activeComponent={activeComponent} allVideos={videos} removeById={removeVideoById} updateVideo={updateVideo} loadVideoOptions={setVideoPlayOptions} />
      <Navbar setRenderComponentFunction={setRenderedComponent} activeComponent={activeComponent} />
    </div>
  );
}

export default App;
