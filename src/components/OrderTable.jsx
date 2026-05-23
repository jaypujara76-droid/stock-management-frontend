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
  IconButton,
  Tooltip,
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

function OrderTable({
  orders = [],
  fetchOrders,
  sortOrder,
  setSortOrder
}) {

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const handleDeleteClick = (id) => {
    setSelectedOrderId(id);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedOrderId) return;

    try {

      await api.delete(
        `/orders/${selectedOrderId}`
      );

      toast.success("Order deleted successfully");

      await fetchOrders();

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Error deleting order"
      );
    } finally {
      setDeleteConfirmOpen(false);
      setSelectedOrderId(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmOpen(false);
    setSelectedOrderId(null);
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: "none",
          border: "1px solid #ccc",
          borderRadius: 0,
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
                Customer
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
            orders.length > 0 ? (

              orders.map((order) => (

                <TableRow
                  key={order._id}
                >

                  <TableCell>
                    {order.customerName}
                  </TableCell>

                  <TableCell>
                    {order.stockId?.name}
                  </TableCell>

                  <TableCell>
                    {order.orderQty}
                  </TableCell>

                  <TableCell>

                    <Tooltip title="Delete Order">
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() =>
                          handleDeleteClick(
                            order._id
                          )
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
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
                  No Orders Found
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
        Are you sure you want to delete this order? 
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

export default OrderTable;