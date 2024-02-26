import { useState } from "react"
import video from "../../assets/video.mp4"
import { Link } from "react-router-dom"
import {
  Add,
  Check,
  PlayArrow,
  ThumbDownOutlined,
  ThumbUpAltOutlined,
} from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import axios from "../../services/helper"
import toast from "react-hot-toast"
import { fetchMyList } from "../../redux/features/myListSlice"
import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"
import "./card.scss"

const Card = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false)
  const favMovies = useSelector((state) => state.myLists.movies)
  const { currentUser } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  // Add to My List
  const handleAddToList = async (movie) => {
    try {
      await axios.post("/user/addmovie", {
        email: currentUser.email,
        data: movie,
      })
      dispatch(fetchMyList(currentUser.email))
      toast.success("Movie added to My List.")
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.Error || "An error occurred")
    }
  }

  // Remove from My List
  const handleRemoveFromList = async () => {
    try {
      await axios.put(`/user/removemovie`, {
        email: currentUser.email,
        movieId: movie.id,
      })
      dispatch(fetchMyList(currentUser.email))
      toast.success("Movie removed from My List")
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.Error || "An error occurred")
    }
  }

  return (
    <div
      className="card-container"
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
              {favMovies?.some((favMovie) => favMovie.id === movie.id) ? (
                <div className="remove">
                  <Check
                    className="removeIcon"
                    onClick={() => handleRemoveFromList(movie)}
                  />
                  <p className="removeFromList">Remove from My List</p>
                </div>
              ) : (
                <div className="add">
                  <Add
                    className="addIcon"
                    onClick={() => handleAddToList(movie)}
                  />
                  <p className="addtoList">Add to My List</p>
                </div>
              )}
              <ThumbUpAltOutlined className="icon" />
              <ThumbDownOutlined className="icon" />
            </div>
            <div className="itemInfoTop">
              <span>{movie?.name}</span>
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

export default Card
