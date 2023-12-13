import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { LoginOutlined } from "@mui/icons-material";
import { loginSchema } from "../../utils/authSchemas/authSchema";
import flixxitLogo from "../../assets/flixxitLogo.png";
import axios from "../../services/helper";
import { useDispatch, useSelector } from "react-redux";
import {
  authStarted,
  authFailed,
  authSuccessful,
} from "../../redux/features/userSlice";
import LoadingSVG from "../../components/AnimatedSVGs/LoadingSVG";
import toast from "react-hot-toast";
import { useState } from "react";
import "./login.scss";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowpassword] = useState(false);
  const [isError, setIsError] = useState(null);
  const { loading } = useSelector(state => state.user);

  const onSubmit = async values => {
    dispatch(authStarted());
    try {
      const response = await axios.post("/auth/login", values);
      setTimeout(() => {
        dispatch(authSuccessful(response.data));
        navigate("/");
        toast.success("Login Successful!");
      }, 1000);
    } catch (error) {
      setTimeout(() => {
        setIsError(error.response?.data?.Error || "An error occurred");
        dispatch(authFailed(error.message));
      }, 1000);
    }
  };

  const { errors, touched, getFieldProps, handleSubmit, isValid } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit,
  });

  //Toggle password
  const togglePassword = () => {
    setShowpassword(p => !p);
  };

  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <Link to="/">
            <img className="logo" src={flixxitLogo} alt="Flixxit logo" />
          </Link>
        </div>
      </div>
      <div className="container">
        <form onSubmit={handleSubmit} className="auth-form">
          <h1>Sign In</h1>
          <div className="email-input">
            <input
              type="email"
              placeholder="Email"
              {...getFieldProps("email")}
              className={errors.email && touched.email ? "input-error" : ""}
            />
            <div className="emailError">
              {errors.email && touched.email ? (
                <p className="error">{errors.email}</p>
              ) : null}
            </div>
          </div>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              maxLength={21}
              {...getFieldProps("password")}
              className={
                errors.password && touched.password ? "input-error" : ""
              }
            />
            <span className="toggle-password" onClick={togglePassword}>
              {showPassword ? "Hide" : "Show"}
            </span>
            <div className="passwordError">
              {errors.password && touched.password ? (
                <p className="error">{errors.password}</p>
              ) : null}
            </div>
          </div>
          <button className="loginButton" type="submit" disabled={!isValid}>
            <div className="loadingBtn">
              {loading ? (
                <LoadingSVG width={24} height={24} />
              ) : (
                <>
                  <LoginOutlined fontSize="small" className="loginIcon" />
                  <span className="signIn">Sign In</span>
                </>
              )}
            </div>
          </button>
          {isError && <p className="apiError">{isError}</p>}
          <span className="newTxtFlixxit">
            New to Flixxit?{" "}
            <Link to="/register" className="signUpLink">
              Sign up now
            </Link>
            .
          </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot.{" "}
            <a
              href="https://www.google.com/recaptcha/about/"
              target="_blank"
              rel="noreferrer"
            >
              Learn more.
            </a>
          </small>
        </form>
      </div>
    </div>
  );
};

export default Login;
