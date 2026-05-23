import {
  Box,
  Button
} from "@mui/material";

import { useNavigate, useLocation }
from "react-router-dom";

import { toast } from "react-toastify";

function Sidebar() {

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.info("Logged out successfully");
    navigate("/login");
  };

  return (

    <Box
      sx={{
        width: "180px",
        backgroundColor: "#d9d9d9",
        minHeight: "100vh",
        borderRight: "1px solid gray",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}
    >

      <Box>
        <Button
          fullWidth
          sx={{
            color: "black",
            borderBottom:
              "1px solid gray",
            borderRadius: 0,
            padding: "15px",
            backgroundColor: location.pathname === "/stocks" ? "#b3b3b3" : "transparent"
          }}
          onClick={() =>
            navigate("/stocks")
          }
        >
          Stock
        </Button>

        <Button
          fullWidth
          sx={{
            color: "black",
            borderBottom:
              "1px solid gray",
            borderRadius: 0,
            padding: "15px",
            backgroundColor: location.pathname === "/orders" ? "#b3b3b3" : "transparent"
          }}
          onClick={() =>
            navigate("/orders")
          }
        >
          Order
        </Button>
      </Box>

      <Button
        fullWidth
        sx={{
          color: "black",
          borderTop: "1px solid gray",
          borderRadius: 0,
          padding: "15px",
          backgroundColor: "#ff6b6b",
          "&:hover": {
            backgroundColor: "#ff5252"
          }
        }}
        onClick={handleLogout}
      >
        Logout
      </Button>

    </Box>
  );
}

export default Sidebar;