import { useState } from "react"
import SwitchTabs from "../../../components/switchTabs/SwitchTabs"
import useFetch from "../../../components/hooks/useFetch"
import CardSlider from "../../../components/cardSlider/CardSlider"
import "./discover.scss"

const Discover = () => {
  const [endpoint, setEndpoint] = useState("movie")
  const { data, loading } = useFetch(`/discover/${endpoint}`)

  const onTabChange = (tab) => {
    setEndpoint(tab === "Movies" ? "movie" : "tv")
  }

  return (
    <div className="discover">
      <div className="discover-wrapper">
        <h2 className="discover-title">Discover</h2>
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

export default Discover
