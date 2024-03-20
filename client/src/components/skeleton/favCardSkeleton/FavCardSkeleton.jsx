import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import "./favCardSkeleton.scss"

const FavCardSkeleton = ({ cards = 1 }) => {
  return (
    <div className="sk-fav-card">
      {Array(cards)
        .fill(0)
        .map((_, i) => (
          <div
            className="sk-card-wrapper"
            key={i}
          >
            <Skeleton className="sk-fav-movie" />
            <Skeleton className="sk-fav-toggle" />
          </div>
        ))}
    </div>
  )
}

export default FavCardSkeleton
