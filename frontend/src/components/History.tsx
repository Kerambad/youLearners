import { Video } from '../models/Video'
import { LoadVideo } from '../models/LoadVideo'
import HistoryElement from './HistoryElement'
import "./History.css"
import CloseField from './CloseField'
import "../App.css"

type HistoryProps = {
    activeComponent: number
    allVideos: Video[]
    removeById: (videoId: string) => void
    updateVideo: (newVideo: Video) => void
    loadVideoOptions: (videoOptions: LoadVideo) => void
    isMobile: boolean
    setRenderedComponent: (status: number) => void
}
export default function History(props: HistoryProps) {

    const createHistoryElement = (singleVideo: Video) => {
        return (
            <HistoryElement video={singleVideo} removeById={props.removeById} key={singleVideo.videoId} updateVideo={props.updateVideo} loadVideoOptions={props.loadVideoOptions} />
        )
    }

    if (props.activeComponent !== 2) return null;
    return (
        <div className='left-100 option-section'>
            <span className='history-gallery'>
                <CloseField isMobile={props.isMobile} setRenderedComponent={props.setRenderedComponent} activeComponent={props.activeComponent} />
                {props.allVideos.map((singleVideo: Video) => { return createHistoryElement(singleVideo) })}
            </span>
        </div>
    )
}
