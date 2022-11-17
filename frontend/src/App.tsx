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
import CloseField from './components/CloseField';

function App() {

  const { addNewVideo, videos, removeVideoById, updateVideo } = useManageVideos();
  const { marks, addNewMark, removeMarkById, updateMark, errorMessages, setErrorMessages } = useManageMarks();
  const { setRenderedComponent, activeComponent } = useActiveComponent();
  const { videoPlayOptions, setVideoPlayOptions, curentVideoStats, setCurentVideoStats } = useLoadVideo();
  const isMobile = useIsMobile()
  const [player, setPlayer] = useState<any>();

  console.log(isMobile);

  return (
    <div className="app-style">
      <div className='video'>
        <div className='video-player'>
          <VideoPlayer videoPlayOptions={videoPlayOptions} setCurentVideoStats={setCurentVideoStats} player={player} setPlayer={setPlayer} />
        </div>
      </div>
      <div className='option-section'>
        <CloseField isMobile={isMobile} setRenderedComponent={setRenderedComponent} activeComponent={activeComponent}/>
        <div className='left-0'>
          <VideoMarksGallery errorMessages={errorMessages} setErrorMessages={setErrorMessages} player={player} marks={marks} activeComponent={activeComponent} loadVideoOptions={setVideoPlayOptions} currentVideoStats={curentVideoStats} addNewMark={addNewMark} removeMarkById={removeMarkById} editMark={updateMark} />
        </div>
        <div className='left-15'>
          <VideoInsert setVideoIdFunction={addNewVideo} isActive={activeComponent} loadVideoOptions={setVideoPlayOptions} />
        </div>
        <div className='left-38'>
          <AllMarksGallery errorMessages={errorMessages} setErrorMessages={setErrorMessages} marks={marks} activeComponent={activeComponent} loadVideoOptions={setVideoPlayOptions} removeMarkById={removeMarkById} editMark={updateMark} currentVideoStats={curentVideoStats} player={player} />
        </div>
        <div className='left-100'>
          <History isActive={activeComponent} allVideos={videos} removeById={removeVideoById} updateVideo={updateVideo} loadVideoOptions={setVideoPlayOptions} />
        </div>
        <Navbar setRenderComponentFunction={setRenderedComponent} />
      </div>
    </div>
  );
}

export default App;
