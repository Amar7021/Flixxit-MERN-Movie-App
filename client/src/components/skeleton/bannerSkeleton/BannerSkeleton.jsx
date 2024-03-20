import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import "./bannerSkeleton.scss"

const BannerSkeleton = () => {
  return (
    <div className="banner-sk">
      <div className="skeleton-details">
        <div className="sk-left">
          <Skeleton className="image-sk" />
        </div>
        <div className="sk-right">
          <Skeleton className="sk-title" />
          <div className="sk-genres">
            <Skeleton className="genre-items" />
          </div>
          <div className="sk-rating-info">
            <Skeleton
              className="sk-rate"
              circle
              width={40}
              height={40}
            />
            <Skeleton
              className="sk-rate"
              circle
              width={40}
              height={40}
            />
            <Skeleton
              className="sk-rate fav-action"
              circle
              width={40}
              height={40}
            />
          </div>
          <Skeleton className="sk-tagline" />
          <Skeleton className="sk-overview-info" />
          <Skeleton
            className="sk-overview"
            count={3}
          />
          <Skeleton
            className="sk-movie-info"
            count={3}
          />
        </div>
      </div>
    </div>
  )
}

export default BannerSkeleton
