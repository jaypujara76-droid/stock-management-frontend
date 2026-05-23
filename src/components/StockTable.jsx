
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

import { useState } from "react";

import { toast } from "react-toastify";

import api
from "../services/api";

function StockTable({
  stocks = [],
  fetchStocks,
  sortOrder,
  setSortOrder
}) {

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedStockId, setSelectedStockId] = useState(null);

  const handleDeleteClick = (id) => {
    setSelectedStockId(id);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedStockId) return;

    try {

      await api.delete(
        `/stocks/${selectedStockId}`
      );

      toast.success("Stock deleted successfully");

      await fetchStocks();

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Error deleting stock"
      );
    } finally {
      setDeleteConfirmOpen(false);
      setSelectedStockId(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmOpen(false);
    setSelectedStockId(null);
  };

  return (

    <>
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: "none",
          border: "1px solid #ccc",
          maxHeight: "calc(100vh - 280px)",
          overflow: "auto"
        }}
      >

      <Table>

        <TableHead>

          <TableRow>

            <TableCell>

              <TableSortLabel
                active
                direction={sortOrder}
                onClick={() =>
                  setSortOrder(
                    sortOrder === "asc"
                      ? "desc"
                      : "asc"
                  )
                }
              >
                Stock Name
              </TableSortLabel>

            </TableCell>

            <TableCell>

              <TableSortLabel
                active
                direction={sortOrder}
                onClick={() =>
                  setSortOrder(
                    sortOrder === "asc"
                      ? "desc"
                      : "asc"
                  )
                }
              >
                Stock Qty
              </TableSortLabel>

            </TableCell>

            <TableCell>

              <TableSortLabel
                active
                direction={sortOrder}
                onClick={() =>
                  setSortOrder(
                    sortOrder === "asc"
                      ? "desc"
                      : "asc"
                  )
                }
              >
                Order Qty
              </TableSortLabel>

            </TableCell>

            <TableCell>
              Action
            </TableCell>

          </TableRow>

        </TableHead>

        <TableBody>

          {
            stocks.length > 0 ? (

              stocks.map((stock) => (

                <TableRow
                  key={stock._id}
                >

                  <TableCell>
                    {stock.name}
                  </TableCell>

                  <TableCell>
                    {stock.qty}
                  </TableCell>

                  <TableCell>
                    {
                      stock.orderQty || 0
                    }
                  </TableCell>

                  <TableCell>

                    <Tooltip
                      title={
                        (stock.orderQty || 0) > 0
                          ? "Cannot delete stock with active orders"
                          : "Delete stock"
                      }
                    >
                      <span>
                        <IconButton
                          color="error"
                          size="small"
                          disabled={
                            (stock.orderQty || 0) > 0
                          }
                          onClick={() =>
                            handleDeleteClick(
                              stock._id
                            )
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </span>
                    </Tooltip>

                  </TableCell>

                </TableRow>
              ))

            ) : (

              <TableRow>

                <TableCell
                  colSpan={4}
                  align="center"
                >
                  No Stocks Found
                </TableCell>

              </TableRow>
            )
          }

        </TableBody>

      </Table>

    </TableContainer>

    <Dialog
      open={deleteConfirmOpen}
      onClose={handleCancelDelete}
    >
      <DialogTitle>
        Confirm Delete
      </DialogTitle>
      <DialogContent>
        Are you sure you want to delete this stock? This action cannot be undone.
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancelDelete}>
          Cancel
        </Button>
        <Button 
          onClick={handleConfirmDelete} 
          color="error" 
          variant="contained"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
    </>
  );
}

export default StockTable;
