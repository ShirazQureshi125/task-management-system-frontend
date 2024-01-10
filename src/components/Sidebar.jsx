import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../assets/images/Logo.png";
import { PiBookOpenTextBold } from "react-icons/pi";
const Sidebar = () => {
  return (
    <div
      style={{
        width: "250px",
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
      /*   "@media (max-width: 600px)": {
          display: "none",
          background:'red'
        }, */
      }}
    >
      <Typography variant="h6" style={{ marginBottom: "20px" }}>
        <img
          src={logo}
          alt="Logo"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            marginTop: "40px",
          }}
        />
      </Typography>
      <List
        style={{
          background: "rgba(245, 245, 247, 1)",
          height: "50px",
          width: "220px",
          marginLeft: "20px",
          borderRadius: "10px",
        }}
      >
        <Link to="#" style={{ textDecoration: "none", color: "black" }}>
          <ListItem button style={{ fontWeight: "100", fontSize: "40px" }}>
            <PiBookOpenTextBold style={{ marginLeft: "20px" }} />
            <ListItemText primary="Task" style={{ marginLeft: "25px" }} />
          </ListItem>
        </Link>
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
