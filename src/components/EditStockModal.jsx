import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box
} from "@mui/material";

import { useState, useEffect } from "react";

import { toast } from "react-toastify";

import api from "../services/api";

function EditStockModal({
  open,
  onClose,
  stock,
  fetchStocks
}) {

  const [qty, setQty] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (stock) {
      setQty(stock.qty.toString());
      setError("");
    }
  }, [stock, open]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQty(value);
    if (error) {
      setError("");
    }
  };

  const handleSave = async () => {
    if (!qty || qty === "") {
      setError("Quantity is required");
      return;
    }

    if (isNaN(qty) || Number(qty) <= 0) {
      setError("Quantity must be a positive number");
      return;
    }

    try {
      setLoading(true);

      await api.put(
        `/stocks/${stock._id}`,
        { qty: Number(qty) }
      );

      toast.success("Stock updated successfully");

      await fetchStocks();

      onClose();

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Error updating stock"
      );

      setError(
        error.response?.data?.message || "Error updating stock"
      );

    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setQty("");
    setError("");
    onClose();
  };

  return (

    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        Edit Stock - {stock?.name}
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        <Box>
          <TextField
            fullWidth
            label="Stock Quantity"
            type="number"
            value={qty}
            onChange={handleChange}
            error={!!error}
            helperText={error}
            inputProps={{
              min: "1",
              step: "1"
            }}
            disabled={loading}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={handleClose}
          disabled={loading}
        >
          Cancel
        </Button>

        <Button
          onClick={handleSave}
          variant="contained"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditStockModal;
