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

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import Sidebar
from "../components/Sidebar";

import OrderTable
from "../components/OrderTable";

import AddOrderModal
from "../components/AddOrderModal";

import api
from "../services/api";

function OrderPage() {

  const [orders, setOrders] =
    useState([]);

  const [stocks, setStocks] =
    useState([]);

  const [open, setOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [sortOrder, setSortOrder] =
    useState("asc");

  const fetchOrders = useCallback(async () => {

    try {

      setLoading(true);

      const response =
        await api.get(
          `/orders?sortField=createdAt&sortOrder=${
            sortOrder === "asc"
              ? 1
              : -1
          }`
        );

      console.log("Orders API Response:", response?.data);

      setOrders(
        response?.data?.data || []
      );

    } catch (error) {

      console.error("Fetch orders error:", error);

      console.log(
        error.response?.data
      );

    } finally {

      setLoading(false);
    }
  }, [sortOrder]);

  const fetchStocks = useCallback(async () => {

    try {

      const response =
        await api.get("/stocks");

      console.log("Stocks API Response:", response?.data);

      setStocks(
        response?.data?.data || []
      );

    } catch (error) {

      console.error("Fetch stocks error:", error);

      console.log(error);
    }
  }, []);

  useEffect(() => {

    fetchOrders();

    fetchStocks();

  }, [sortOrder, fetchOrders, fetchStocks]);

  return (

    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
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
              borderBottom:
                "1px solid #cfcfcf"
            }}
          >

            <Typography
              variant="h5"
              fontWeight="bold"
            >
              Order
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
              Add Order
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

                <OrderTable
                  orders={orders}
                  fetchOrders={fetchOrders}
                  sortOrder={sortOrder}
                  setSortOrder={setSortOrder}
                />

              )
            }

          </Box>

        </Paper>

      </Box>

      <AddOrderModal
        open={open}
        handleClose={() =>
          setOpen(false)
        }
        fetchOrders={() => {

          fetchOrders();

          fetchStocks();
        }}
        stocks={stocks}
      />

    </>
  );
}

export default OrderPage;