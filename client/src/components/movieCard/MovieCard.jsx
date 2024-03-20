import Img from "../lazyLoadingImage/Img"
import CircularRating from "../circularRating/CircularRating"
import dayjs from "dayjs"
import PosterFallback from "../../assets/poster-fallback.jpg"
import "./movieCard.scss"

const MovieCard = ({ movie }) => {
  const posterURL = movie?.poster_path
    ? `https://image.tmdb.org/t/p/original/${movie?.poster_path}`
    : PosterFallback

  return (
    <div className="movie-card-items">
      <div className="card-item">
        <div className="movie-poster">
          <Img
            src={posterURL}
            alt="movie"
            className="movie-image"
          />
        </div>
        <div className="movie-overlay">
          <div className="overlay-content">
            <CircularRating rating={movie?.vote_average?.toFixed(1)} />
            <span className="movie-title">
              {movie?.original_title || movie?.title || movie?.name}
            </span>
            <span className="movie-date">
              {dayjs(movie?.release_date).format("MMM D, YYYY") || "NA"}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
