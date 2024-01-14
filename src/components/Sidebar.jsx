import React, { useState, useEffect } from "react";
import { Typography, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../assets/images/Logo.png";
import smallLogo from '../assets/images/book-square.png';
import { PiBookOpenTextBold } from "react-icons/pi";
import { Button } from "react-bootstrap";

const Sidebar = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSidebarCollapsed(true);
      } else {
        setSidebarCollapsed(false);
      }
    };

    // Set initial state
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{
        backgroundColor: "rgba(255, 255, 255, 1)",
        color: "#fff",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        width: isSidebarCollapsed ? "100px" : "290px",
        transition: "width 0.3s ease", // Add transition for smooth width change
        border: "2px solid",
      }}
    >
      <Typography variant="h6" style={{ marginBottom: "20px" }}>
      {/* {isSidebarCollapsed ? "Expand" : "Collapse"} */}
       {isSidebarCollapsed?<img
          src={smallLogo}
          alt="Logo"
          onClick={handleToggleSidebar}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            marginTop: "40px",
          }}
        />:<img
          src={logo}
          alt="Logo"
          onClick={handleToggleSidebar}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            marginTop: "40px",
          }}
        />} 
       
      </Typography>
      
      <List
        style={{
          //background: "rgba(245, 245, 247, 1)",
          height: "50px",
          width: isSidebarCollapsed ? "80px" : "220px", // Adjust width based on collapse state
          marginLeft: "20px",
          borderRadius: "10px",
        }}
      >
        {isSidebarCollapsed?<Link to="#" style={{ textDecoration: "none", color: "black" }}>
          <ListItem button style={{ fontWeight: "100", fontSize: "40px" }}>
            <PiBookOpenTextBold style={{ marginLeft: "-25px" }} />
           
          </ListItem>
        </Link>: <Link to="#" style={{ textDecoration: "none", color: "black" }}>
          <ListItem button style={{ fontWeight: "100", fontSize: "40px",background: "rgba(245, 245, 247, 1)" }}>
            <PiBookOpenTextBold style={{ marginLeft: "20px" }} />
            {/* Adjust marginLeft based on collapse state */}
            <ListItemText
              primary="Task"
              style={{ marginLeft: isSidebarCollapsed ? "0" : "25px" }}
            />
          </ListItem>
        </Link>}
       
      </List>
    </div>
  );
};

export default Sidebar;



// import React, { useState } from "react";
// import {
//   Typography,
//   List,
//   ListItem,
//   ListItemText,
//   Drawer,
//   IconButton,
// } from "@mui/material";
// import { Link } from "react-router-dom";
// import logo from "../assets/images/Logo.png";
// import { PiBookOpenTextBold } from "react-icons/pi";
// import MenuIcon from "@mui/icons-material/Menu";

// const Sidebar = () => {
//   const [open, setOpen] = useState(false);

//   const handleToggle = () => {
//     setOpen(!open);
//   };

//   return (
//     <>
//       <IconButton
//         onClick={handleToggle}
//         style={{ position: "fixed", left: 10, top: 10 }}
//       >
//         <MenuIcon />
//       </IconButton>
//       <Drawer
//         anchor="left"
//         open={open}
//         onClose={handleToggle}
//         style={{ width: "250px" }}
//       >
//         <div
//           style={{
//             backgroundColor: "rgba(255, 255, 255, 1)",
//             color: "#fff",
//             height: "100vh",
//             padding: "20px",
//             display: "flex",
//             flexDirection: "column",
//             textAlign: "center",
//           }}
//         >
//           <Typography variant="h6" style={{ marginBottom: "20px" }}>
//             <img
//               src={logo}
//               alt="Logo"
//               style={{
//                 maxWidth: "100%",
//                 maxHeight: "100%",
//                 marginTop: "40px",
//               }}
//             />
//           </Typography>
//           <List
//             style={{
//               background: "rgba(245, 245, 247, 1)",
//               height: "50px",
//               width: "220px",
//               marginLeft: "20px",
//               borderRadius: "10px",
//             }}
//           >
//             <Link to="#" style={{ textDecoration: "none", color: "black" }}>
//               <ListItem
//                 button
//                 style={{ fontWeight: "100", fontSize: "40px" }}
//                 onClick={handleToggle}
//               >
//                 <PiBookOpenTextBold style={{ marginLeft: "20px" }} />
//                 <ListItemText primary="Task" style={{ marginLeft: "25px" }} />
//               </ListItem>
//             </Link>
//           </List>
//         </div>
//       </Drawer>
//     </>
//   );
// };

// export default Sidebar;
