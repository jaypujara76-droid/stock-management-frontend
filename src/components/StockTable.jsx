
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
  Tooltip
} from "@mui/material";

import api
from "../services/api";

function StockTable({
  stocks = [],
  fetchStocks,
  sortOrder,
  setSortOrder
}) {

  const deleteStock = async (id) => {

    try {

      await api.delete(
        `/stocks/${id}`
      );

      await fetchStocks();

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
        border: "1px solid #ccc"
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
                        <Button
                          color="error"
                          disabled={
                            (stock.orderQty || 0) > 0
                          }
                          onClick={() =>
                            deleteStock(
                              stock._id
                            )
                          }
                        >
                          Delete
                        </Button>
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
  );
}

export default StockTable;
