import Carousel from "../Carousel"
import useFetch from "../../hooks/useFetch"
import ColumnWrapper from "../../columnWrapper/ColumnWrapper"

const Similar = ({ type, id }) => {
  const { loading, data } = useFetch(`/${type}/${id}/similar`)

  const title = type === "tv" ? "Similar TV Shows" : "Similar Movies"

  return (
    <ColumnWrapper>
      <h2 className="similar-title">{title}</h2>
      <Carousel
        data={data}
        type={type}
        loading={loading}
        section="Similar"
      />
    </ColumnWrapper>
  )
}

export default Similar
