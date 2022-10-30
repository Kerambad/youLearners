import { Video } from '../models/Video'
import HistoryElement from './HistoryElement'

type HistoryProps = {
    loadVideo: (videoId: string) => void
    isActive: number
    allVideos: Video[]
    removeById: (videoId: string) => void
}
export default function History(props: HistoryProps) {

    const createHistoryElement = (singleVideo: Video) => {
        return (
        <div onClick={() => props.loadVideo(singleVideo.videoId)} className='border border-dark m-1' key={singleVideo.videoId}>
            <HistoryElement video={singleVideo} removeById={props.removeById}/>
        </div>)
    }

    if (props.isActive !== 2) return null;
    return (
        <div className={"container text-center"}>
            {props.allVideos.map((singleVideo: Video) => { return createHistoryElement(singleVideo) })}
        </div>
    )
}
