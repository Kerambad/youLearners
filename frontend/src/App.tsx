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

function App() {

  const {addNewVideo, videos, removeVideoById, updateVideo} = useManageVideos();
  const {marks, addNewMark, removeMarkById, updateMark} = useManageMarks();
  const {setRenderedComponent, activeComponent} = useActiveComponent();
  const {videoPlayOptions, setVideoPlayOptions, curentVideoStats, setCurentVideoStats} = useLoadVideo();

  const [player, setPlayer] = useState<any>();

  return (
    <div className="vh-100">
      <VideoPlayer videoPlayOptions={videoPlayOptions} setCurentVideoStats={setCurentVideoStats} player={player} setPlayer={setPlayer}/>
      <VideoMarksGallery player={player} marks={marks} activeComponent={activeComponent} loadVideoOptions={setVideoPlayOptions} currentVideoStats={curentVideoStats} addNewMark={addNewMark} removeMarkById={removeMarkById} editMark={updateMark} />
      <VideoInsert setVideoIdFunction={addNewVideo} isActive={activeComponent} loadVideoOptions={setVideoPlayOptions} />
      <History isActive={activeComponent} allVideos={videos} removeById={removeVideoById} updateVideo={updateVideo} loadVideoOptions={setVideoPlayOptions} />
      <AllMarksGallery marks={marks} activeComponent={activeComponent} loadVideoOptions={setVideoPlayOptions} removeMarkById={removeMarkById} editMark={updateMark} currentVideoStats={curentVideoStats} player={player}/>
      <Navbar setRenderComponentFunction={setRenderedComponent} />
    </div>
  );
}

export default App;
