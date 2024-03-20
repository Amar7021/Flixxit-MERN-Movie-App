import { useState } from "react"
import SwitchTabs from "../../../components/switchTabs/SwitchTabs"
import useFetch from "../../../components/hooks/useFetch"
import CardSlider from "../../../components/cardSlider/CardSlider"
import "./topRated.scss"

const TopRated = () => {
  const [endpoint, setEndpoint] = useState("movie")
  const { data, loading } = useFetch(`/${endpoint}/top_rated`)

  const onTabChange = (tab) => {
    setEndpoint(tab === "Movies" ? "movie" : "tv")
  }

  return (
    <div className="top-rated">
      <div className="top-wrapper">
        <h2 className="top-title">Top Rated</h2>
        <SwitchTabs
          data={["Movies", "TV Shows"]}
          onTabChange={onTabChange}
        />
      </div>
      <CardSlider
        data={data?.results}
        loading={loading}
        endpoint={endpoint}
      />
    </div>
  )
}

export default TopRated
