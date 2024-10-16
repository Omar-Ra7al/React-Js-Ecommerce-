// CSS
import "./Cart.css";
// MUI Components
import {
  Container,
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
// MUI Icons
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

// React
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { removeProduct, quantity } from "../../features/products/productsSlice";

export default function Cart() {
  // Redux >>
  const productsState = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const isLoggedIn = JSON.parse(localStorage.getItem("logedIn"));
  const isHaveAccount = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();

  // Check if the user loged in
  function handleCheckout() {
    if (!isHaveAccount) {
      alert("You are supposed to have an account");
    } else if (!isLoggedIn) {
      alert("You are supposed to Login at frist");
    } else {
      navigate("/checkOut");
    }
  }
  // Remove form Cart
  const removeCartProduct = function (id) {
    dispatch(removeProduct({ status: "cart", id: id }));
  };
  // User Quanity >>
  const increaseQuantity = function (id) {
    dispatch(quantity({ status: "increase", id: id }));
    console.log("clicked");
  };
  const decreaseQuantity = function (id) {
    console.log("clicked");
    dispatch(quantity({ status: "decrease", id: id }));
  };

  const cartItems = productsState.cartProducts;
  // Push price into totalPrice >>
  let totalPrice = [];
  // Cart Jsx >>
  const cartJsx = useMemo(() => {
    return cartItems.map((item) => {
      totalPrice.push(item.price * item.userQuantity);
      return (
        <TableRow key={item.id}>
          {/* << Product Image >> */}
          <TableCell
            style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img src={item.mainImg} width={"40px"} alt="" />
            {item.name}
          </TableCell>
          {/* << Product Image >> */}
          {/* _________________________________________________ */}
          {/* << Product Price >> */}
          <TableCell>{item.price}</TableCell>
          {/* << Product Price >> */}
          {/* _________________________________________________ */}
          {/* << Product Quantity >> */}
          <TableCell>
            <Box className="quantity">
              <span>
                {item.userQuantity < 10
                  ? `0${item.userQuantity}`
                  : item.userQuantity}
              </span>
              <Box>
                <IconButton
                  onClick={() => {
                    increaseQuantity(item.id);
                  }}>
                  <KeyboardArrowUpIcon />
                </IconButton>
                <IconButton
                  onClick={() => {
                    decreaseQuantity(item.id);
                  }}>
                  <KeyboardArrowDownIcon />
                </IconButton>
              </Box>
            </Box>
          </TableCell>
          {/* << Product Quantity >> */}
          {/* _________________________________________________ */}
          {/* << Sub Total >> */}
          <TableCell>${item.price}</TableCell>
          {/* << Sub Total >> */}
          {/* _________________________________________________ */}
          {/* << Delete Product >> */}
          <TableCell>
            <IconButton
              onClick={() => {
                removeCartProduct(item.id);
              }}>
              <DeleteIcon className="delete-icon" />
            </IconButton>
          </TableCell>
          {/* << Delete Product >> */}
        </TableRow>
      );
    });
  }, [productsState]);

  // TotalPrice price (combine)
  let totalPricePrice;
  if (totalPrice.length !== 0)
    totalPricePrice = totalPrice.reduce((a, c) => a + c).toFixed(2);
  return (
    <Box className="section cart">
      <Container>
        <Typography className="title">
          Home / <span style={{ fontWeight: "bold" }}>Cart</span>
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>SubtotalPrice</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{cartJsx}</TableBody>
          </Table>
        </TableContainer>

        {/* Sub Total JSX >>>  */}
        <Box className="totalPrice">
          {/*  << Start Copon  */}
          <Box className="coupon">
            <TextField label="Coupon Code" variant="outlined" fullWidth />
            <Button variant="contained">Apply Coupon</Button>
          </Box>
          {/*  End Copon //>>  */}
          {/* << Start Sub Total  */}
          <Box className="subtotal">
            <Box className="title">Cart TotalPrice</Box>
            <Box className="body">
              <Box className="body-details">
                <Typography>SubtotalPrice</Typography>
                <span>${totalPricePrice}</span>
              </Box>
              <Box className="body-details m">
                <Typography>Shipping</Typography>
                <span>Free</span>
              </Box>
              <Box className="body-details">
                <Typography>TotalPrice</Typography>
                <span>${totalPricePrice}</span>
              </Box>
            </Box>
            <Box
              // Check AT frist >>
              onClick={() => {
                handleCheckout();
              }}>
              <Button variant="contained">Procees to checkout</Button>
            </Box>
          </Box>
          {/* End Sub Total //>>  */}
        </Box>
      </Container>
    </Box>
  );
}
