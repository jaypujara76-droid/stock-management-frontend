import {
  Box,
  Button,
  Typography,
  Paper
} from "@mui/material";

import {
  useEffect,
  useState,
  useCallback
} from "react";

import Sidebar
from "../components/Sidebar";

import StockTable
from "../components/StockTable";

import AddStockModal
from "../components/AddStockModal";

import api
from "../services/api";

function StockPage() {

  const [stocks, setStocks] =
    useState([]);

  const [open, setOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [sortOrder, setSortOrder] =
    useState("asc");

  const fetchStocks = useCallback(async () => {

    try {

      setLoading(true);

      const response =
        await api.get(
          `/stocks?sortField=createdAt&sortOrder=${
            sortOrder === "asc"
              ? 1
              : -1
          }`
        );

      console.log("API Response:", response?.data);

      setStocks(
        response?.data?.data || []
      );

      console.log("Stocks set to:", response?.data?.data || []);

    } catch (error) {

      console.error("Fetch error:", error);

      console.log(
        error.response?.data
      );

    } finally {

      setLoading(false);
    }
 }, [sortOrder]);

  useEffect(() => {

    fetchStocks();

  }, [sortOrder]);

  return (

    <Box
      sx={{
        display: "flex",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh"
      }}
    >

      <Sidebar />

      <Box
        sx={{
          flex: 1,
          padding: "20px"
        }}
      >

        <Paper
          elevation={0}
          sx={{
            padding: 0,
            border: "1px solid #cfcfcf",
            minHeight: "500px",
            borderRadius: 0,
            backgroundColor: "#f5f5f5"
          }}
        >

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "15px 20px",
              borderBottom: "1px solid #cfcfcf"
            }}
          >

            <Typography
              variant="h5"
              fontWeight="bold"
            >
              Stock
            </Typography>

            <Button
              variant="contained"
              size="small"
              sx={{
                borderRadius: 0,
                backgroundColor: "#d9d9d9",
                color: "black",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor:
                    "#cfcfcf",
                  boxShadow: "none"
                }
              }}
              onClick={() =>
                setOpen(true)
              }
            >
              Add Stock
            </Button>

          </Box>

          <Box sx={{ padding: 0 }}>

            {
              loading ? (

                <Typography
                  sx={{ padding: 2 }}
                >
                  Loading...
                </Typography>

              ) : (

                <StockTable
                  stocks={stocks}
                  fetchStocks={fetchStocks}
                  sortOrder={sortOrder}
                  setSortOrder={setSortOrder}
                />

              )
            }

          </Box>

        </Paper>

      </Box>

      <AddStockModal
        open={open}
        handleClose={() =>
          setOpen(false)
        }
        fetchStocks={fetchStocks}
      />

    </Box>
  );
}

export default StockPage;