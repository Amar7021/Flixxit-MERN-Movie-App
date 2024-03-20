import "./loadingBars.scss"

const LoadinBars = ({ width, height, initial }) => {
  return (
    <div className={`loadingSpinner ${initial ? "initial" : ""}`}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <style>
          {`
          .spinner_hzlK {
            fill: white;
            animation: spinner_vc4H 0.8s linear infinite;
            animation-delay: -0.8s;
          }
          .spinner_koGT {
            fill: white;
            animation-delay: -0.65s;
          }
          .spinner_YF1u {
            fill: white;
            animation-delay: -0.5s;
          }
          @keyframes spinner_vc4H {
            0% {
              y: 1px;
              height: 22px;
            }
            93.75% {
              y: 5px;
              height: 14px;
              opacity: 0.2;
            }
          }
        `}
        </style>
        <rect
          className="spinner_hzlK"
          x="1"
          y="1"
          width="6"
          height="22"
        />
        <rect
          className="spinner_hzlK spinner_koGT"
          x="9"
          y="1"
          width="6"
          height="22"
        />
        <rect
          className="spinner_hzlK spinner_YF1u"
          x="17"
          y="1"
          width="6"
          height="22"
        />
      </svg>
    </div>
  )
}

export default LoadinBars
