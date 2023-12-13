import { useState, useRef } from "react";
import axios from "../../services/helper";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { registerSchema } from "../../utils/authSchemas/authSchema";
import flixxitLogo from "../../assets/flixxitLogo.png";
import toast from "react-hot-toast";
import Footer from "../../components/common/footer/Footer";
import LoadingSVG from "../../components/AnimatedSVGs/LoadingSVG";
import "./register.scss";

const Register = () => {
  const [email, setEmail] = useState("");
  const [showPassword, setShowpassword] = useState(false);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const emailRef = useRef();

  const handleStart = () => {
    setEmail(emailRef.current.value);
  };

  const onSubmit = async values => {
    const { email, username, password } = values;
    setIsLoading(true);
    try {
      await axios.post("/auth/register", {
        email,
        username,
        password,
      });
      setTimeout(() => {
        setIsLoading(false);
        navigate("/login");
        toast.success("Registration Successful!");
      }, 1000);
    } catch (error) {
      setTimeout(() => {
        setIsLoading(false);
        setIsError(error.response?.data?.Error || "An error occurred");
      }, 1000);
    }
  };

  const { errors, touched, getFieldProps, handleSubmit, isValid } = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validationSchema: registerSchema,
    onSubmit,
  });

  //Toggle password
  const togglePassword = () => {
    setShowpassword(p => !p);
  };

  return (
    <>
      <div className="register">
        <div className="top">
          <div className="wrapper">
            <img src={flixxitLogo} alt="Flixxit logo" className="logo" />
            <button onClick={() => navigate("/login")} className="loginButton">
              Sign In
            </button>
          </div>
        </div>
        <div className="container">
          <h1>Unlimited films, TV programmes and more.</h1>
          <h2>Watch anywhere. Cancel at any time.</h2>
          <p>
            Ready to watch? Enter your email to create or restart your
            membership.
          </p>
          {!email ? (
            <>
              <div className="emailInput">
                <input
                  type="email"
                  placeholder="Email address"
                  ref={emailRef}
                  {...getFieldProps("email")}
                  className={errors.email && touched.email ? "input-error" : ""}
                />
                <button className="registerButton" onClick={handleStart}>
                  Get Started
                </button>
              </div>
              <div className="registerError">
                {errors.email && touched.email ? (
                  <p className="error">{errors.email}</p>
                ) : null}
              </div>
            </>
          ) : (
            <>
              <form className="inputBox" onSubmit={handleSubmit}>
                <div className="usernameInput">
                  <input
                    type="text"
                    placeholder="Username"
                    maxLength={17}
                    {...getFieldProps("username")}
                    className={
                      errors.username && touched.username
                        ? "input-error"
                        : "fieldInputs"
                    }
                  />
                </div>
                <div className="passwordInput">
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
                </div>
                <button
                  className="registerButton"
                  type="submit"
                  disabled={!isValid}
                >
                  {isLoading ? (
                    <LoadingSVG width={24} height={24} />
                  ) : (
                    "Register"
                  )}
                </button>
              </form>
              <div className="apiError">
                {isError && <p className="error">{isError}</p>}
              </div>
              <div className="registerError">
                {errors.username && touched.username ? (
                  <p className="error">{errors.username}</p>
                ) : null}
                {errors.password && touched.password ? (
                  <p className="error">{errors.password}</p>
                ) : null}
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
