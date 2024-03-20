import { Link, useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import { LoginOutlined } from "@mui/icons-material"
import { loginSchema } from "../../utils/authSchemas/authSchema"
import flixxitLogo from "../../assets/flixxitLogo.png"
import axios from "../../services/helper"
import { useDispatch, useSelector } from "react-redux"
import {
  authStarted,
  authFailed,
  authSuccessful,
} from "../../redux/features/userSlice"
import LoadingSVG from "../../components/loadingSVGs/LoadingSVG"
import toast from "react-hot-toast"
import { useState } from "react"
import Footer from "../../components/common/footer/Footer"
import "./signin.scss"

const Signin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showPassword, setShowpassword] = useState(false)
  const [isError, setIsError] = useState(null)
  const { loading } = useSelector((state) => state.user)

  const onSubmit = async (values) => {
    dispatch(authStarted())
    try {
      const response = await axios.post("/auth/login", values)
      dispatch(authSuccessful(response.data))
      navigate("/")
      toast("Signin Successful!", {
        icon: "✅",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      })
    } catch (error) {
      setIsError(error.response?.data?.Error)
      dispatch(authFailed(error.message))
    }
  }

  const { errors, touched, getFieldProps, handleSubmit, isValid } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit,
  })

  //Toggle password
  const togglePassword = () => {
    setShowpassword((p) => !p)
  }

  return (
    <>
      <div className="signin">
        <div className="top">
          <div className="top_wrapper">
            <img
              className="logo"
              src={flixxitLogo}
              alt="Flixxit logo"
            />
          </div>
        </div>
        <div className="container">
          <form
            onSubmit={handleSubmit}
            className="auth_form"
          >
            <h1>Sign In</h1>
            <div className="email_input">
              <input
                type="email"
                placeholder="Email"
                {...getFieldProps("email")}
                className={errors.email && touched.email ? "input_error" : ""}
              />
              <div className="email_error">
                {errors.email && touched.email ? (
                  <p className="error">{errors.email}</p>
                ) : null}
              </div>
            </div>
            <div className="password_input">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                maxLength={21}
                {...getFieldProps("password")}
                className={
                  errors.password && touched.password ? "input_error" : ""
                }
              />
              <span
                className="toggle_password"
                onClick={togglePassword}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
              <div className="password_error">
                {errors.password && touched.password ? (
                  <p className="error">{errors.password}</p>
                ) : null}
              </div>
            </div>
            <button
              className="login_button"
              type="submit"
              disabled={!isValid}
            >
              <div className="loading_btn">
                {loading ? (
                  <LoadingSVG
                    width={24}
                    height={24}
                  />
                ) : (
                  <>
                    <LoginOutlined
                      fontSize="small"
                      className="login_icon"
                    />
                    <span className="sign_in">Sign in</span>
                  </>
                )}
              </div>
            </button>
            {isError && <p className="api_error">{isError}</p>}
            <span className="newTxtFlixxit">
              New to Flixxit?{" "}
              <Link
                to="/signup"
                className="signup_link"
              >
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
      <Footer />
    </>
  )
}

export default Signin
