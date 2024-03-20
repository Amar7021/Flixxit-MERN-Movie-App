import { PlayArrow, ErrorOutlineOutlined } from "@mui/icons-material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import CircularRating from "../../circularRating/CircularRating"
import "./featuredInfo.scss"

const FeaturedInfo = ({ movie, setShow, setVideoId }) => {
  const [videos, setVideos] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_TMDB_BASE_URL}/${movie?.media_type}/${movie?.id}/videos?api_key=${process.env.REACT_APP_API_KEY}`
        )
        setVideos(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchVideo()
  }, [movie?.media_type, movie?.id])

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string
  }

  return (
    <div className="featured-info">
      <h1 className="movie-title">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <CircularRating rating={movie?.vote_average?.toFixed(1)} />
      <span className="movie-desc">{truncate(movie?.overview, 140)}</span>
      <div className="buttons">
        <button
          className="play-btn"
          type="button"
          onClick={() => {
            setVideoId(videos?.results?.[0]?.key)
            setShow(true)
          }}
        >
          <PlayArrow className="btn-icon" />
          <span>Play</span>
        </button>
        <button
          type="button"
          className="more-info-btn"
          onClick={() => navigate(`/detail/${movie?.media_type}/${movie?.id}`)}
        >
          <ErrorOutlineOutlined className="btn-icon" />
          <span>More info</span>
        </button>
      </div>
    </div>
  )
}

export default FeaturedInfo
