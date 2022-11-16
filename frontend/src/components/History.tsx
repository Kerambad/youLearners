import { Video } from '../models/Video'
import { LoadVideo } from '../models/LoadVideo'
import HistoryElement from './HistoryElement'
import "./History.css"

type HistoryProps = {
    isActive: number
    allVideos: Video[]
    removeById: (videoId: string) => void
    updateVideo: (newVideo: Video) => void
    loadVideoOptions: (videoOptions: LoadVideo) => void
}
export default function History(props: HistoryProps) {

    const createHistoryElement = (singleVideo: Video) => {
        return (
            <HistoryElement video={singleVideo} removeById={props.removeById} key={singleVideo.videoId} updateVideo={props.updateVideo} loadVideoOptions={props.loadVideoOptions}/>
        )
    }

    if (props.isActive !== 2) return null;
    return (
            <span className='history-gallery' >
                {props.allVideos.map((singleVideo: Video) => { return createHistoryElement(singleVideo) })}
            </span>
    )
}
