import Img from "../lazyLoadingImage/Img"
import CircularRating from "../circularRating/CircularRating"
import dayjs from "dayjs"
import PosterFallback from "../../assets/poster-fallback.jpg"
import "./card.scss"

const Card = ({ movie }) => {
  const posterURL = movie?.poster_path
    ? `https://image.tmdb.org/t/p/original/${movie?.poster_path}`
    : PosterFallback

  return (
    <div className="card-container">
      <div className="card-items">
        <div
          key={movie.id}
          className="card-item"
        >
          <div className="movie-poster">
            <Img src={posterURL} />
          </div>
          <div className="movie-overlay">
            <div className="overlay-content">
              <CircularRating rating={movie.vote_average.toFixed(1)} />
              <span className="movie-title">{movie.title || movie.name}</span>
              <span className="movie-date">
                {dayjs(movie.release_date || movie.first_air_date).format(
                  "MMM D, YYYY"
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
