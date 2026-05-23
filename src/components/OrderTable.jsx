import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel
} from "@mui/material";

import api
from "../services/api";

function OrderTable({
  orders = [],
  fetchOrders,
  sortOrder,
  setSortOrder
}) {

  const deleteOrder = async (id) => {

    try {

      await api.delete(
        `/orders/${id}`
      );

      await fetchOrders();

    } catch (error) {

      alert(
        error.response?.data?.message
      );
    }
  };

  return (

    <TableContainer
      component={Paper}
      sx={{
        boxShadow: "none",
        border: "1px solid #ccc",
        borderRadius: 0
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

                    <Button
                      color="error"
                      onClick={() =>
                        deleteOrder(
                          order._id
                        )
                      }
                    >
                      Delete
                    </Button>

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
  );
}

export default OrderTable;