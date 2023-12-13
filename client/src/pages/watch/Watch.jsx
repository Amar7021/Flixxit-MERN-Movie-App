import "./watch.scss";
import ArrowBackOutlined from "@mui/icons-material/ArrowBackOutlined";
import { useNavigate } from "react-router-dom";
import video from "../../assets/video.mp4";

const Watch = () => {
  const navigate = useNavigate();

  return (
    <div className="watch">
      <div className="back">
        <ArrowBackOutlined onClick={() => navigate(-1)} />
      </div>
      <video className="video" autoPlay progress="true" controls src={video} />
    </div>
  );
};
export default Watch;
