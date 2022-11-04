import { Video } from '../models/Video'
import { VideoPlayOptions } from '../models/VideoPlayOptions'
import HistoryElement from './HistoryElement'

type HistoryProps = {
    loadVideo: (videoId: string) => void
    isActive: number
    allVideos: Video[]
    removeById: (videoId: string) => void
    updateVideo: (newVideo: Video) => void
    loadVideoOptions: (videoOptions: VideoPlayOptions) => void
}
export default function History(props: HistoryProps) {

    const createHistoryElement = (singleVideo: Video) => {
        return (
            <HistoryElement video={singleVideo} removeById={props.removeById} loadVideo={props.loadVideo} key={singleVideo.videoId} updateVideo={props.updateVideo} loadVideoOptions={props.loadVideoOptions}/>
        )
    }

    if (props.isActive !== 2) return null;
    return (
            <div className='container p-0 m-0' >
                {props.allVideos.map((singleVideo: Video) => { return createHistoryElement(singleVideo) })}
            </div>
    )
}
