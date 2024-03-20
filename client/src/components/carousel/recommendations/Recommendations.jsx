import Carousel from "../Carousel"
import useFetch from "../../hooks/useFetch"
import ColumnWrapper from "../../columnWrapper/ColumnWrapper"

const Recommendations = ({ type, id }) => {
  const { loading, data } = useFetch(`/${type}/${id}/recommendations`)

  return (
    <ColumnWrapper>
      <h2 className="recommend-title">Recommendations</h2>
      <Carousel
        data={data}
        type={type}
        loading={loading}
        section="Recommendations"
      />
    </ColumnWrapper>
  )
}

export default Recommendations
