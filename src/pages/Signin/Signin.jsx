import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Grid,
  Paper,
  TextField,
  Button,
  MenuItem,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "../../assets/images/Logo.png";
import {  ToastContainer, toast } from "react-toastify";

import axios from "axios";
const SignIn = () => {
  const notify = () =>
    toast.success("Successfully login!", {
      position: "top-center",
      autoClose: 4000,
      theme: "dark",
    });
  const notifyError = () =>
    toast.error("Login Failed!", {
      position: "top-center",
      autoClose: 4000,
      theme: "dark",
    });
  const notifyWarn = () =>
    toast.warn("Something Went Wrong!", {
      position: "top-center",
      autoClose: 4000,
      theme: "dark",
    });
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "https://super-fish-pajamas.cyclic.app/api/login-user",
        data
      );
      if (response.status === 200) {
        notify();

        const { email, token } = response.data;
        const userData = {
          email,
          token,
        };
        //console.log(response.data.user.role)

        localStorage.setItem("userToken", JSON.stringify(response.data.token));
        localStorage.setItem(
          "userRole",
          JSON.stringify(response.data.user.role)
        );
        localStorage.setItem("userData", JSON.stringify(response.data.user.id));

        const userRole = localStorage.getItem("userRole");
        const role = JSON.parse(userRole);
        console.log(" ====================================== ");
        console.log(userRole);

        console.log(userRole.toString().toLowerCase() == "admin");
        console.log(role.length);
        console.log("user".length);

        if (role === "admin") {
          // Navigate to admin route
          navigate("/task-page");
        } else if (role === "user") {
          // Navigate to user route
          navigate("/user-task");
        }
        const UserRole = localStorage.getItem("userRole");
        console.log(UserRole);
        window.location.reload();
      }
    } catch (err) {
      console.log("Errors", err.response.data.error);
      console.log(err);
      notifyError();
      if (err.response.status === 401) {
        alert("Invalid Passord");
      } else if (err.response.status === 404) {
        alert("User not found");
      } else {
        alert("Something Went Wrong");
      }
    }
  };

  return (
    <div className="signUp_page">
    
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
         <ToastContainer />
        <Grid item xs={10} sm={8} md={6} lg={4}>
          <Paper
            elevation={3}
            style={{ padding: "20px", borderRadius: "10px" }}
          >
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item>
                <img
                  src={logoImage}
                  alt="Logo"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    marginTop: "40px",
                  }}
                />
                {/* Adjust the styles according to your needs */}
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="h4"
                  color="textPrimary"
                  align="left"
                  style={{
                    fontWeight: "bold",
                    paddingBottom: "20px",
                    color: "rgba(76, 78, 100, 0.87)",
                  }}
                >
                  Welcome to Taska! 👋🏻
                </Typography>
              </Grid>
            </Grid>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Invalid email address",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        type="email"
                        {...field}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        sx={{
                          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                            { borderColor: "rgba(102, 108, 255, 1)" },

                          "& .MuiInputLabel-root.Mui-focused": {
                            color: "rgba(102, 108, 255, 1)",
                          },
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                      maxLength: {
                        value: 12,
                        message: "Password must be at most 12 characters",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        label="Password"
                        variant="outlined"
                        fullWidth
                        type="password"
                        {...field}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        sx={{
                          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                            { borderColor: "rgba(102, 108, 255, 1)" },
                          "& .MuiInputLabel-root.Mui-focused": {
                            color: "rgba(102, 108, 255, 1)",
                          },
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} style={{ paddingTop: "40px" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    style={{
                      background: "rgba(102, 108, 255, 1)",
                      borderRadius: "10px",
                      padding: "14px",
                    }}
                  >
                    Sign in
                  </Button>
                </Grid>
                <Grid item xs={12} style={{ paddingBottom: "20px" }}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    align="center"
                    style={{
                      color: "rgba(76, 78, 100, 0.87)",
                      fontWeight: "400",
                      fontSize: "20px",
                    }}
                  >
                    Don't have an account?{" "}
                    <Link
                      to="/signup"
                      color="primary"
                      style={{
                        color: "rgba(102, 108, 255, 1)",
                        textDecoration: "none",
                      }}
                    >
                      Sign Up
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignIn;
