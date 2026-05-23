import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box
} from "@mui/material";

import { useState } from "react";

import api from "../services/api";

function AddStockModal({
  open,
  handleClose,
  fetchStocks
}) {

  const [formData, setFormData] =
    useState({
      name: "",
      qty: ""
    });

  const [errors, setErrors] =
    useState({});

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name?.trim()) {
      newErrors.name =
        "Stock name is required";
    }

    if (!formData.qty) {
      newErrors.qty =
        "Stock quantity is required";
    } else if (
      Number(formData.qty) <= 0
    ) {
      newErrors.qty =
        "Quantity must be greater than 0";
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
        "/stocks",
        {
          ...formData,
          qty: Number(formData.qty)
        }
      );

      console.log("Stock created:", createResponse.data);

      alert(
        "Stock Added Successfully"
      );

      console.log("Calling fetchStocks...");

      await fetchStocks();

      console.log("fetchStocks completed");

      handleClose();

      setFormData({
        name: "",
        qty: ""
      });

      setErrors({});

    } catch (error) {

      console.error("Error adding stock:", error);

      const message =
        error.response?.data?.message || "Error adding stock";

      if (
        message.includes(
          "Duplicate"
        ) ||
        message.includes(
          "already exists"
        )
      ) {
        setErrors({
          name: message
        });
      } else {
        alert(message);
      }
    }
  };

  return (

    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
    >

      <DialogTitle>
        Add Stock
      </DialogTitle>

      <DialogContent>

        <Box sx={{ pt: 2 }}>

          <TextField
            fullWidth
            margin="normal"
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            required
          />

          <TextField
            fullWidth
            margin="normal"
            label="Qty"
            type="number"
            name="qty"
            value={formData.qty}
            onChange={handleChange}
            error={!!errors.qty}
            helperText={errors.qty}
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
          disabled={!formData.name || !formData.qty}
        >
          Save
        </Button>

      </DialogActions>

    </Dialog>
  );
}

export default AddStockModal;
