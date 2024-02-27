import LoadingSVG from "./LoadingSVG"

const LoadingPage = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#141414",
      }}
    >
      <div
        style={{
          width: "100px",
          height: "100px",
          backgroundColor: "rgb(40, 40, 40)",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LoadingSVG
          width={64}
          height={64}
        />
      </div>
    </div>
  )
}

export default LoadingPage
