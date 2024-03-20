import { useState } from "react"
import "./switchTabs.scss"

const SwitchTabs = ({ data, onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState(0)
  const [left, setLeft] = useState(0)

  const activeTab = (tab, index) => {
    setLeft(index * 100)
    setTimeout(() => {
      setSelectedTab(index)
    }, 300)
    onTabChange(tab, index)
  }

  return (
    <div className="switchTabs">
      <div className="tab-items">
        {data.map((tab, index) => (
          <span
            key={index}
            className={`tab-item ${selectedTab === index ? "active" : ""}`}
            onClick={() => activeTab(tab, index)}
          >
            {tab}
          </span>
        ))}
        <span
          className="moving-bg"
          style={{ left }}
        />
      </div>
    </div>
  )
}

export default SwitchTabs
