import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import "./videoSectionSkeleton.scss"

const VideoSectionSkeleton = ({ cards }) => {
  return (
    <div className="sk-video-section">
      {Array(cards)
        .fill(0)
        .map((_, i) => (
          <div
            className="video-sk"
            key={i}
          >
            <Skeleton className="video-item-sk" />
            <Skeleton
              className="video-title-sk"
              count={3}
            />
          </div>
        ))}
    </div>
  )
}

export default VideoSectionSkeleton
