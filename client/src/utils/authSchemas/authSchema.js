import * as Yup from "yup"

export const signUpSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address!")
    .required("Email is required!"),
  username: Yup.string()
    .min(3, "Username must be at least 3 characters!")
    .max(16, "Username must be less than 16 characters!")
    .required("Username is required!"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters!")
    .max(20, "Password must be less than 20 characters!")
    .required("Password is required!"),
})

export const loginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address!")
    .required("Email is required!"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters!")
    .max(20, "Password must be less than 20 characters!")
    .required("Password is required!"),
})
