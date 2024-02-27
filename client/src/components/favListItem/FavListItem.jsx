import {
  Check,
  PlayArrow,
  ThumbDownOutlined,
  ThumbUpAltOutlined,
} from "@mui/icons-material"
import { Link } from "react-router-dom"
import video from "../../assets/video.mp4"
import { useState } from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"
import "./favListItem.scss"

const FavListItem = ({ movie, removeFromList }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="favListItem"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <LazyLoadImage
        src={`https://image.tmdb.org/t/p/w500${movie.image}`}
        alt="movie"
        effect="blur"
        className="movie-image"
      />
      {isHovered && (
        <div className="hover">
          <div className="videoContainer">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.image}`}
              alt="movie"
            />
            <video
              src={video}
              autoPlay={true}
              loop
              muted
            />
          </div>
          <div className="itemInfo">
            <div className="icons">
              <Link
                to="/watch"
                state={{ movie }}
                className="playLink"
              >
                <div className="play">
                  <PlayArrow className="playIcon" />
                  <p className="playContent">Play</p>
                </div>
              </Link>
              <div className="remove">
                <Check
                  className="removeIcon"
                  onClick={removeFromList}
                />
                <p className="removeFromList">Remove from My List</p>
              </div>
              <ThumbUpAltOutlined className="icon" />
              <ThumbDownOutlined className="icon" />
            </div>
            <div className="itemInfoTop">
              <span className="movieName">{movie?.name}</span>
            </div>
            <div className="genre">
              <ul className="genreList">
                {movie.genres.map((genre) => (
                  <li key={genre}>{genre}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FavListItem
