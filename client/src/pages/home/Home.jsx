import Navbar from "../../components/common/navbar/Navbar"
import Featured from "../../components/featured/Featured"
import Footer from "../../components/common/footer/Footer"
import useFetch from "../../components/hooks/useFetch"
import Trending from "./trending/Trending"
import Popular from "./popular/Popular"
import TopRated from "./topRated/TopRated"
import Discover from "./discover/Discover"
import ColumnWrapper from "../../components/columnWrapper/ColumnWrapper"
import "./home.scss"

const Home = () => {
  const { loading, data } = useFetch(`/trending/all/week`)

  return (
    <>
      <div className="home">
        <Navbar />
        <Featured
          data={data}
          loading={loading}
        />
        <ColumnWrapper>
          <Trending />
          <Popular />
          <TopRated />
          <Discover />
        </ColumnWrapper>
        <Footer />
      </div>
    </>
  )
}

export default Home
