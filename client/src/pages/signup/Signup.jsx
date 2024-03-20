import { useState } from "react"
import axios from "../../services/helper"
import { Link, useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import { signUpSchema } from "../../utils/authSchemas/authSchema"
import flixxitLogo from "../../assets/flixxitLogo.png"
import toast from "react-hot-toast"
import Footer from "../../components/common/footer/Footer"
import LoadingSVG from "../../components/loadingSVGs/LoadingSVG"
import { PersonAddOutlined } from "@mui/icons-material"
import "./signup.scss"

const Signup = () => {
  const [showPassword, setShowpassword] = useState(false)
  const [isError, setIsError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    const { email, username, password } = values
    setIsLoading(true)
    try {
      await axios.post("/auth/register", {
        email,
        username,
        password,
      })
      setIsLoading(false)
      navigate("/signin")
      toast("Sign up Successful!", {
        icon: "✅",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      })
    } catch (error) {
      setIsLoading(false)
      setIsError(error.response?.data?.Error)
    }
  }

  const { errors, touched, getFieldProps, handleSubmit, isValid } = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validationSchema: signUpSchema,
    onSubmit,
  })

  //Toggle password
  const togglePassword = () => {
    setShowpassword((p) => !p)
  }

  return (
    <>
      <div className="signup">
        <div className="top">
          <div className="top_wrapper">
            <img
              src={flixxitLogo}
              alt="Flixxit logo"
              className="logo"
            />
          </div>
        </div>
        <div className="container">
          <form
            onSubmit={handleSubmit}
            className="auth_form"
          >
            <h1 className="signup_header">Sign Up</h1>
            <div className="username_input">
              <input
                type="text"
                placeholder="Username"
                maxLength={17}
                {...getFieldProps("username")}
                className={
                  errors.username && touched.username ? "input_error" : ""
                }
              />
              <div className="username_error">
                {errors.username && touched.username ? (
                  <p className="error">{errors.username}</p>
                ) : null}
              </div>
            </div>
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
              className="signup_button"
              type="submit"
              disabled={!isValid}
            >
              <div className="loading_btn">
                {isLoading ? (
                  <LoadingSVG
                    width={24}
                    height={24}
                  />
                ) : (
                  <>
                    <PersonAddOutlined
                      fontSize="small"
                      className="login_icon"
                    />
                    <span className="sign_up">Sign up</span>
                  </>
                )}
              </div>
            </button>
            {isError && <p className="api_error">{isError}</p>}
            <span className="account_confirm">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="signup_Link"
              >
                Sign in
              </Link>
            </span>
          </form>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Signup
