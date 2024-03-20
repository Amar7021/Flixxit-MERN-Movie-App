import { useState } from "react"
import SwitchTabs from "../../../components/switchTabs/SwitchTabs"
import useFetch from "../../../components/hooks/useFetch"
import CardSlider from "../../../components/cardSlider/CardSlider"
import "./trending.scss"

const Trending = () => {
  const [endpoint, setEndpoint] = useState("day")
  const { data, loading } = useFetch(`/trending/all/${endpoint}`)

  const onTabChange = (tab) => {
    setEndpoint(tab === "Today" ? "day" : "week")
  }

  return (
    <div className="trending">
      <div className="trending-wrapper">
        <h2 className="trending-title">Trending</h2>
        <SwitchTabs
          data={["Today", "This Week"]}
          onTabChange={onTabChange}
        />
      </div>
      <CardSlider
        data={data?.results}
        loading={loading}
      />
    </div>
  )
}

export default Trending
