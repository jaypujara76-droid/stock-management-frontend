import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
  Typography,
  Box,
  Alert
} from "@mui/material";

import { useState } from "react";

import { toast } from "react-toastify";

import api from "../services/api";

function AddOrderModal({
  open,
  handleClose,
  fetchOrders,
  stocks
}) {

  const [formData, setFormData] =
    useState({
      customerName: "",
      stockId: "",
      orderQty: ""
    });

  const [errors, setErrors] =
    useState({});

  const getSelectedStock = () => {
    return stocks.find(
      (stock) => stock._id === formData.stockId
    );
  };

  const selectedStock = getSelectedStock();

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.customerName?.trim()) {
      newErrors.customerName =
        "Customer name is required";
    }

    if (!formData.stockId) {
      newErrors.stockId =
        "Stock selection is required";
    }

    if (!formData.orderQty) {
      newErrors.orderQty =
        "Order quantity is required";
    } else if (
      Number(formData.orderQty) <= 0
    ) {
      newErrors.orderQty =
        "Order quantity must be greater than 0";
    } else if (
      selectedStock &&
      Number(formData.orderQty) > selectedStock.qty
    ) {
      newErrors.orderQty =
        `Order quantity cannot exceed available stock (${selectedStock.qty})`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {

    if (!validateForm()) {
      return;
    }

    try {

      const createResponse = await api.post(
        "/orders",
        {
          ...formData,
          orderQty: Number(
            formData.orderQty
          )
        }
      );

      console.log("Order created:", createResponse.data);

      toast.success(
        "Order Added Successfully"
      );

      console.log("Calling fetchOrders...");

      await fetchOrders();

      console.log("fetchOrders completed");

      handleClose();

      setFormData({
        customerName: "",
        stockId: "",
        orderQty: ""
      });

      setErrors({});

    } catch (error) {

      console.error("Error adding order:", error);

      toast.error(
        error.response?.data?.message || "Error adding order"
      );
    }
  };

  return (

    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
    >

      <DialogTitle>
        Add Order
      </DialogTitle>

      <DialogContent>

        <Box sx={{ pt: 2 }}>

          <TextField
            fullWidth
            margin="normal"
            label="Customer Name"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            error={!!errors.customerName}
            helperText={errors.customerName}
            required
          />

          <TextField
            select
            fullWidth
            margin="normal"
            label="Stock"
            name="stockId"
            value={formData.stockId}
            onChange={handleChange}
            error={!!errors.stockId}
            helperText={errors.stockId}
            required
          >

            {
              stocks.filter((stock) => stock.qty > 0).map((stock) => (

                <MenuItem
                  key={stock._id}
                  value={stock._id}
                >
                  {stock.name} (Available: {stock.qty})
                </MenuItem>
              ))
            }

          </TextField>

          {selectedStock && (
            <Typography
              variant="body2"
              sx={{
                mt: 2,
                p: 1,
                backgroundColor: "#f5f5f5",
                borderLeft: "4px solid #1976d2",
                borderRadius: "4px"
              }}
            >
              <strong>Available Quantity:</strong> {selectedStock.qty}
            </Typography>
          )}

          <TextField
            fullWidth
            margin="normal"
            label="Order Qty"
            type="number"
            name="orderQty"
            value={formData.orderQty}
            onChange={handleChange}
            error={!!errors.orderQty}
            helperText={errors.orderQty}
            required
            inputProps={{ min: 1 }}
            sx={{
              "& input[type=number]": {
                MozAppearance: "textfield"
              },
              "& input[type=number]::-webkit-outer-spin-button": {
                WebkitAppearance: "none",
                margin: 0
              },
              "& input[type=number]::-webkit-inner-spin-button": {
                WebkitAppearance: "none",
                margin: 0
              }
            }}
          />

        </Box>

      </DialogContent>

      <DialogActions>

        <Button
          onClick={handleClose}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!formData.stockId || !formData.orderQty}
        >
          Save
        </Button>

      </DialogActions>

    </Dialog>
  );
}

export default AddOrderModal;