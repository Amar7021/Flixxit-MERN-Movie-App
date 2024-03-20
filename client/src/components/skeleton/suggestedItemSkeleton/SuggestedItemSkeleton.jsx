import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import "./suggestedItemSkeleton.scss"

const SuggestedItemSkeleton = ({ cards }) => {
  return (
    <div className="sk-suggested-item">
      {Array(cards)
        .fill(0)
        .map((_, i) => (
          <div
            className="sk-suggested-card"
            key={i}
          >
            <Skeleton className="sk-card-item" />
          </div>
        ))}
    </div>
  )
}

export default SuggestedItemSkeleton
