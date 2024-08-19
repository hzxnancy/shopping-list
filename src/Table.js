import React, { useEffect } from "react";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CiSquareCheck } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";
import "./index";

export default function BasicTable({ data, deleteItem }) {
  const [rows, setRows] = useState(data);

  useEffect(() => {
    setRows(data);
  }, [data]);

  const handleCheck = (index) => {
    setRows((prev) =>
      prev.map((item, idx) =>
        idx === index ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleDelete = (index) => {
    setRows((prev) => prev.filter((_, idx) => idx !== index));
    deleteItem(index);
  };

  const handleQuantity = (index, increase) => {
    setRows((prev) =>
      prev.map((item, idx) =>
        idx === index
          ? {
              ...item,
              quantity: increase ? item.quantity + 1 : item.quantity - 1,
            }
          : item
      )
    );
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ witdh: "50%" }}>
        <TableHead>
          <TableRow sx={{ background: "#d4d1ed" }}>
            <TableCell
              align="center"
              sx={{ fontWeight: "bold", fontSize: "17px" }}
            >
              Name
            </TableCell>
            <TableCell
              align="center"
              sx={{ fontWeight: "bold", fontSize: "17px" }}
            >
              Check
            </TableCell>
            <TableCell
              align="center"
              sx={{ fontWeight: "bold", fontSize: "17px" }}
            >
              Quantity
            </TableCell>
            <TableCell
              align="center"
              sx={{ fontWeight: "bold", fontSize: "17px" }}
            >
              Delete
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              className="table-row"
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                align="center"
                component="th"
                scope="row"
                style={{
                  textDecoration: row.checked ? "line-through" : "none",
                  color: row.checked ? "lightgray" : "black",
                }}
              >
                {row.name}
              </TableCell>
              <TableCell align="center">
                <CiSquareCheck
                  onClick={() => handleCheck(index)}
                  style={{
                    color: row.checked ? "grey" : "black",
                    cursor: "pointer",
                  }}
                />
              </TableCell>
              <TableCell align="center">
                <div className="quantity-label">
                  <div
                    onClick={() => handleQuantity(index, true)}
                    style={{ cursor: "pointer" }}
                  >
                    +
                  </div>
                  {row.quantity}
                  <div
                    onClick={() => handleQuantity(index, false)}
                    style={{ cursor: "pointer" }}
                  >
                    -
                  </div>
                </div>
              </TableCell>
              <TableCell align="center">
                <IoIosClose
                  onClick={() => handleDelete(index)}
                  style={{ cursor: "pointer" }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
