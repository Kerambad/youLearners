import Navbar from './components/Navbar';
import VideoInsert from './components/VideoInsert';
import History from './components/History';
import VideoPlayer, { RefObject } from './components/VideoPlayer';
import useActiveComponent from './hooks/useActiveComponent';
import useManageVideos from './hooks/useManageVideos';
import AllMarksGallery from './components/AllMarksGallery';
import useManageMarks from './hooks/useManageMarks';
import useLoadVideo from './hooks/useLoadVideo';
import VideoMarksGallery from './components/VideoMarksGallery';
import { useRef } from 'react';

function App() {

  const {addNewVideo, videos, removeVideoById, updateVideo} = useManageVideos();
  const {marks, addNewMark, removeMarkById, updateMark} = useManageMarks();
  const {setRenderedComponent, activeComponent} = useActiveComponent();
  const {videoPlayOptions, setVideoPlayOptions, curentVideoStats, setCurentVideoStats} = useLoadVideo();
  const childRef = useRef<RefObject>(null)

    const testFunction = childRef.current.getTime && childRef.current

  return (
    <div className="vh-100">
      <VideoPlayer videoPlayOptions={videoPlayOptions} setCurentVideoStats={setCurentVideoStats} ref={childRef}/>
      <VideoMarksGallery getTime={tes} marks={marks} activeComponent={activeComponent} loadVideoOptions={setVideoPlayOptions} currentVideoStats={curentVideoStats} addNewMark={addNewMark} removeMarkById={removeMarkById} editMark={updateMark} />
      <VideoInsert setVideoIdFunction={addNewVideo} isActive={activeComponent} loadVideoOptions={setVideoPlayOptions} />
      <History isActive={activeComponent} allVideos={videos} removeById={removeVideoById} updateVideo={updateVideo} loadVideoOptions={setVideoPlayOptions} />
      <AllMarksGallery marks={marks} activeComponent={activeComponent} loadVideoOptions={setVideoPlayOptions} removeMarkById={removeMarkById} editMark={updateMark} />
      <Navbar setRenderComponentFunction={setRenderedComponent} />
    </div>
  );
}

export default App;
