import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import "./movieCardSkeleton.scss"

const MovieCardSkeleton = ({ cards = 1 }) => {
  return (
    <div className="sk-movie-card">
      {Array(cards)
        .fill(0)
        .map((_, i) => (
          <div
            className="sk-card-wrapper"
            key={i}
          >
            <Skeleton className="sk-movie" />
          </div>
        ))}
    </div>
  )
}

export default MovieCardSkeleton
