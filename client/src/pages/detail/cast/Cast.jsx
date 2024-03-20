import Img from "../../../components/lazyLoadingImage/Img"
import Avatar from "../../../components/avatar/Avatar"
import CastSkeleton from "../../../components/skeleton/castSkeleton/CastSkeleton"
import ColumnWrapper from "../../../components/columnWrapper/ColumnWrapper"
import "./cast.scss"

const Cast = ({ loading, data }) => {
  return (
    <ColumnWrapper>
      <h2 className="cast-heading">Top Cast</h2>
      {data?.length > 0 && <div className="gradient-layer" />}
      {loading ? (
        <CastSkeleton cards={8} />
      ) : data?.length > 0 ? (
        <div className="cast-info">
          {data?.map((item) => {
            const castImage = item.profile_path ? (
              <Img
                src={`https://image.tmdb.org/t/p/original/${item.profile_path}`}
                alt={item.name}
                className="charcters-img"
              />
            ) : (
              <Avatar />
            )
            return (
              <div
                key={item.id}
                className="cast-wrapper"
              >
                {castImage}
                <div className="overlay">
                  <span className="cast-name">
                    {item.name || item.original_name}
                  </span>
                  <span className="character">{item.character || ""}</span>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <span className="no-info">Cast Info Not Available</span>
      )}
    </ColumnWrapper>
  )
}

export default Cast
