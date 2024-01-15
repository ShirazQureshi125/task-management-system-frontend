import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const UserToken = localStorage.getItem("userToken");
const userToken = JSON.parse(UserToken);
const userRole = localStorage.getItem("userRole");
const userId = localStorage.getItem("userData");
console.log(userId, userRole, userToken);
const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      // Make a request to the backend logout endpoint
      const response = await fetch(
        "https://rose-jittery-mussel.cyclic.app/api/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      // Check if the request was successful
      if (response.ok) {
        alert("Logged out successfully");
        localStorage.removeItem("userData");
        localStorage.removeItem("userToken");
        localStorage.removeItem("userRole");
        // Redirect to the login page or perform any other desired action
        // history.push("/"); // Make sure to replace '/login' with your actual login route
        navigate("/");
      } else {
        // Handle error responses from the server
        const data = await response.json();
        alert("Logout Failed");
        console.error("Logout Error:", data.message);
      }
    } catch (error) {
      // Handle network or unexpected errors
      console.error("Logout Error:", error.message);
    }
  };
  return (
    <AppBar
      position="fixed"
      sx={{
        marginLeft: "250px",
        width: "calc(100% - 290px)",
        height: "84px",
        background: "rgba(255, 255, 255, 1)",
        alignContent: "center",
        justifyContent: "center",
        boxShadow: "none",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: "600",
            fontSize: "24px",
            color: "rgba(20, 21, 34, 1)",
          }}
        >
          Task
        </Typography>
        <Link
          to="/logout"
          style={{
            textDecoration: "none",
            color: "#fff",
            background: "rgba(84, 111, 255, 1)",
            marginRight: "70px",
            width: "127px",
            height: "54px",
            borderRadius: "10px",
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
