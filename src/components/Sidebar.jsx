import {
  Box,
  Button
} from "@mui/material";

import { useNavigate, useLocation }
from "react-router-dom";

import { toast } from "react-toastify";

import api from "../services/api";

function Sidebar() {

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.warn("Logout API failed:", error);
    } finally {
      localStorage.removeItem("token");
      toast.info("Logged out successfully");
      navigate("/login", { replace: true });
    }
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

      <Box>
        <Button
          fullWidth
          sx={{
            color: "black",
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

        <Button
          fullWidth
          sx={{
            color: "black",
            borderTop: "1px solid gray",
            borderRadius: 0,
            padding: "15px",
            backgroundColor: "#ffa726",
            "&:hover": {
              backgroundColor: "#ffb74d"
            }
          }}
          onClick={async () => {
            try {
              await api.post("/auth/logout-all");
            } catch (error) {
              console.warn("Logout all API failed:", error);
            } finally {
              localStorage.removeItem("token");
              toast.info("Logged out from all devices");
              navigate("/login", { replace: true });
            }
          }}
        >
          Logout All Devices
        </Button>
      </Box>

    </Box>
  );
}

export default Sidebar;