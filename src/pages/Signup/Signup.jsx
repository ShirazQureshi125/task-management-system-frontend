import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Grid,
  Paper,
  TextField,
  Button,
  MenuItem,
  Typography,
  Link,
} from "@mui/material";
import logoImage from "../../assets/images/Logo.png";
const roles = ["User", "Manager", "Admin"];

const SignUp = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Handle form submission logic here
    console.log(data);
  };

  return (
    <div className="signUp_page">
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
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
                    name="fullName"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Full Name is required" }}
                    render={({ field }) => (
                      <TextField
                        label="Full Name"
                        variant="outlined"
                        fullWidth
                        {...field}
                        error={!!errors.fullName}
                        helperText={errors.fullName?.message}
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
                    name="role"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Role is required" }}
                    render={({ field }) => (
                      <TextField
                        select
                        label="Role"
                        variant="outlined"
                        fullWidth
                        {...field}
                        error={!!errors.role}
                        helperText={errors.role?.message}
                        sx={{
                          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                            { borderColor: "rgba(102, 108, 255, 1)" },
                          "& .MuiInputLabel-root.Mui-focused": {
                            color: "rgba(102, 108, 255, 1)",
                          },
                        }}
                      >
                        {roles.map((role) => (
                          <MenuItem key={role} value={role.toLowerCase()}>
                            {role}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>
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
                    rules={{ required: "Password is required" }}
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
                    Sign up
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
                    Already have an account?{" "}
                    <Link
                      href="#"
                      color="primary"
                      style={{
                        color: "rgba(102, 108, 255, 1)",
                        textDecoration: "none",
                      }}
                    >
                      Sign In
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

export default SignUp;
