import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import "./castSkeleton.scss"

const CastSkeleton = ({ cards }) => {
  return (
    <div className="cast-sk">
      {Array(cards)
        .fill(0)
        .map((_, i) => (
          <div
            className="sk-cast-card"
            key={i}
          >
            <Skeleton className="character-sk" />
          </div>
        ))}
    </div>
  )
}

export default CastSkeleton
