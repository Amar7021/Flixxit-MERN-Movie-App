import Navbar from "../../components/common/navbar/Navbar"
import Footer from "../../components/common/footer/Footer"
import DetailBanner from "./detailBanner/DetailBanner"
import { useParams } from "react-router-dom"
import Cast from "./cast/Cast"
import VideosSection from "./videosSection/VideosSection"
import Similar from "../../components/carousel/similar/Similar"
import Recommendations from "../../components/carousel/recommendations/Recommendations"
import useFetch from "../../components/hooks/useFetch"
import "./detail.scss"

const Detail = () => {
  const { type, id } = useParams()
  const { data, loading } = useFetch(`/${type}/${id}/videos`)
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${type}/${id}/credits`
  )

  return (
    <div className="detail-page">
      <Navbar />
      <DetailBanner
        video={data?.results?.[0]}
        crew={credits?.crew}
      />
      <Cast
        loading={creditsLoading}
        data={credits?.cast}
      />
      <VideosSection
        videos={data}
        loading={loading}
      />
      <Similar
        type={type}
        id={id}
      />
      <Recommendations
        type={type}
        id={id}
      />
      <Footer />
    </div>
  )
}

export default Detail
