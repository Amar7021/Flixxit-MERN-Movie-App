import { useState } from "react"
import Img from "../../../components/lazyLoadingImage/Img"
import VideoPopup from "../../../components/videoPopup/VideoPopup"
import { PlayArrow } from "@mui/icons-material"
import VideoSectionSkeleton from "../../../components/skeleton/videoSectionSkeleton/VideoSectionSkeleton"
import ColumnWrapper from "../../../components/columnWrapper/ColumnWrapper"
import "./videosSection.scss"

const VideosSection = ({ videos, loading }) => {
  const [show, setShow] = useState(false)
  const [videoId, setVideoId] = useState(null)

  return (
    <div className="videosSection">
      <ColumnWrapper>
        <h2 className="video-heading">Official Videos</h2>
        {videos?.results?.length > 0 && <div className="gradient-layer" />}
        {loading ? (
          <VideoSectionSkeleton cards={6} />
        ) : videos?.results?.length > 0 ? (
          <div className="videos">
            {videos?.results?.map((video) => (
              <div
                key={video.id}
                className="videoItem"
                onClick={() => {
                  setVideoId(video.key)
                  setShow(true)
                }}
              >
                <div className="videoThumbnail">
                  <Img
                    src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                  />

                  <PlayArrow className="play-icon" />
                </div>
                <p className="video-title">{video.name}</p>
              </div>
            ))}
          </div>
        ) : (
          <span className="no-videos">No Videos Available</span>
        )}
        <VideoPopup
          show={show}
          setShow={setShow}
          videoId={videoId}
          setVideoId={setVideoId}
        />
      </ColumnWrapper>
    </div>
  )
}

export default VideosSection
