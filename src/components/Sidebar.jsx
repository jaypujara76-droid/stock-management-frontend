import {
  Box,
  Button
} from "@mui/material";

import { useNavigate, useLocation }
from "react-router-dom";

function Sidebar() {

  const navigate = useNavigate();
  const location = useLocation();

  return (

    <Box
      sx={{
        width: "180px",
        backgroundColor: "#d9d9d9",
        minHeight: "100vh",
        borderRight: "1px solid gray"
      }}
    >

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
  );
}

export default Sidebar;