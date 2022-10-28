import { Video } from '../models/Video'
import HistoryElement from './HistoryElement'

type HistoryProps = {
    loadVideo: (videoId: string) => void
    isActive: number
    allVideos: Video[]
}
export default function History(props: HistoryProps) {

    if (props.isActive !== 2) return null;
    return (
        <div className={"container text-center"}>
                {props.allVideos.map((singleVideo: Video) => {
            return <div onClick={() => props.loadVideo(singleVideo.videoId)} className='border border-dark m-1' key={singleVideo.videoId}><HistoryElement video={singleVideo}/></div>})}
        </div>
    )
}
