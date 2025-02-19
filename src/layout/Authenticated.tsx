// import { useState, useEffect, MouseEvent } from "react";
// import { Link, Outlet, useNavigate } from "react-router-dom";
// import { useLogoutMutation } from "../services/api";
// import { useAppSelector } from "../store/store";
// import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar, Typography, InputBase } from "@mui/material";
// import { FaUserCircle, FaSearch } from "react-icons/fa";
// import { IoMdNotificationsOutline } from "react-icons/io";
// import { MdOutlineWork } from "react-icons/md";

// export default function Authenticated() {
//   const { isAuthenticated } = useAppSelector((state) => state.auth);
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const navigate = useNavigate();
//   const [logoutUser] = useLogoutMutation();

//   const handleMenu = (event: MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = (route?: "profile" | "logout" | "home" | "group") => {
//     return () => {
//       if (route) {
//         if (route === "logout") {
//           logoutUser();
//         } else {
//           navigate("/" + route);
//         }
//       }
//       setAnchorEl(null);
//     };
//   };

//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate("/login");
//     }
//   }, [isAuthenticated, navigate]);

//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar position="static" sx={{ backgroundColor: "#fff", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
//         <Toolbar>
//           {/* Logo */}
//           <Box
//             display="flex"
//             alignItems="center"
//             component={Link}
//             to="/"
//             sx={{ textDecoration: "none", color: "#333", fontWeight: "bold", fontSize: "20px" }}
//           >
//             JobPortal
//           </Box>

//           {/* Search Bar */}
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               backgroundColor: "#f3f3f3",
//               padding: "6px 12px",
//               borderRadius: "8px",
//               marginLeft: "20px",
//               flex: 1,
//               maxWidth: "500px",
//             }}
//           >
//             <FaSearch size={18} color="#666" />
//             <InputBase placeholder="Search jobs, companies..." sx={{ marginLeft: "10px", flex: 1 }} />
//           </Box>

//           {/* Navigation Icons */}
//           {isAuthenticated && (
//             <Box display="flex" alignItems="center" gap={3} marginLeft="auto">
//               <IconButton component={Link} to="/jobs" sx={{ color: "#666" }}>
//                 <MdOutlineWork size={24} />
//               </IconButton>
//               <IconButton component={Link} to="/notifications" sx={{ color: "#666" }}>
//                 <IoMdNotificationsOutline size={24} />
//               </IconButton>

//               {/* Profile Dropdown */}
//               <IconButton onClick={handleMenu} sx={{ color: "#666" }}>
//                 <FaUserCircle size={26} />
//               </IconButton>
//               <Menu
//                 anchorEl={anchorEl}
//                 open={Boolean(anchorEl)}
//                 onClose={handleClose()}
//                 sx={{ mt: "45px" }}
//               >
//                 <MenuItem onClick={handleClose("home")}>Home</MenuItem>
//                 <MenuItem onClick={handleClose("profile")}>Profile</MenuItem>
//                 <MenuItem onClick={handleClose("group")}>Groups</MenuItem>
//                 <MenuItem onClick={handleClose("logout")}>Logout</MenuItem>
//               </Menu>
//             </Box>
//           )}
//         </Toolbar>
//       </AppBar>

//       <Outlet />
//     </Box>
//   );
// }
import { useState, useEffect, MouseEvent, KeyboardEvent } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../services/api";
import { useAppSelector } from "../store/store";
import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar, Typography, InputBase } from "@mui/material";
import { FaUserCircle, FaSearch } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineWork } from "react-icons/md";
import JobCreationDialog from "../components/JobCreationDialog";

export default function Authenticated() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [logoutUser] = useLogoutMutation();
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (route?: "profile" | "logout" | "home" | "group") => {
    return () => {
      if (route) {
        if (route === "logout") {
          logoutUser();
        } else {
          navigate("/" + route);
        }
      }
      setAnchorEl(null);
    };
  };

  const searchJobs = () => {
    navigate(`/jobs?search=${encodeURIComponent(searchQuery)}`);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      searchJobs();
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#fff", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
        <Toolbar>
          {/* Logo */}
          <Box
            display="flex"
            alignItems="center"
            component={Link}
            to="/"
            sx={{ textDecoration: "none", color: "#333", fontWeight: "bold", fontSize: "20px" }}
          >
            JobPortal
          </Box>

          {/* Search Bar */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#f3f3f3",
              padding: "6px 12px",
              borderRadius: "8px",
              marginLeft: "20px",
              flex: 1,
              maxWidth: "500px",
            }}
          >
            <InputBase
              placeholder="Search jobs, companies..."
              sx={{ marginLeft: "10px", flex: 1 }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <IconButton onClick={searchJobs}>
              <FaSearch size={18} color="#666" />
            </IconButton>
          </Box>

          {/* Navigation Icons */}
          {isAuthenticated && (
            <Box display="flex" alignItems="center" gap={3} marginLeft="auto">
              <IconButton onClick={() => setDialogOpen(true)} sx={{ color: "#666" }}>
                <MdOutlineWork size={24} />
              </IconButton>
              <IconButton component={Link} to="/notifications" sx={{ color: "#666" }}>
                <IoMdNotificationsOutline size={24} />
              </IconButton>

              {/* Profile Dropdown */}
              <IconButton onClick={handleMenu} sx={{ color: "#666" }}>
                <FaUserCircle size={26} />
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose()} sx={{ mt: "45px" }}>
                <MenuItem onClick={handleClose("home")}>Home</MenuItem>
                <MenuItem onClick={handleClose("profile")}>Profile</MenuItem>
                <MenuItem onClick={handleClose("group")}>Groups</MenuItem>
                <MenuItem onClick={handleClose("logout")}>Logout</MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <JobCreationDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
      <Outlet />
    </Box>
  );
}
