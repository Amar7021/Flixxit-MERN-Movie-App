import { Link, useNavigate } from "react-router-dom";
import flixxitLogo from "../../assets/flixxitLogo.png";
import "./noMatch.scss";

const NoMatch = () => {
  const navigate = useNavigate();

  return (
    <div className="noMatch">
      <div className="wrapper">
        <Link to="/">
          <img
            className="logo"
            title="Flixxit Logo"
            src={flixxitLogo}
            alt="Flixxit logo"
          />
        </Link>
      </div>
      <div className="error-page">
        <h1>Lost your way?</h1>
        <p>
          Sorry, we can't find that page. You'll find lots to explore on the
          home page.
        </p>
        <button className="btn" onClick={() => navigate("/")}>
          Flixxit Home
        </button>
        <h3>
          Error Code - <b>404</b>
        </h3>
      </div>
    </div>
  );
};

export default NoMatch;
