import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Container,
  Radio,
} from "@mui/material";
import "./CheckOut.css"; // External CSS file
import { useSelector } from "react-redux";

export default function CheckOut() {
  const productsState = useSelector((state) => state.products);
  const cartItems = productsState.cartProducts;
  console.log(cartItems);
  let totalPrice = [];
  let totalPricePrice;

  const oldSummary = cartItems.map((item) => {
    totalPrice.push(item.price * item.userQuantity);
    if (totalPrice.length !== 0) {
      totalPricePrice = totalPrice.reduce((a, c) => a + c).toFixed(2);
    }
    return (
      <Box key={item.id}>
        <Typography className="product-item">
          <img src={item.mainImg} alt={item.name} />
          {item.name} <span className="price">${item.price}</span>
        </Typography>
      </Box>
    );
  });
  return (
    <Box className="section">
      <Container>
        <Box className="details">
          <Typography className="title">
            Home / <span style={{ fontWeight: "bold" }}>My Account</span>
          </Typography>
        </Box>
        <Box className="cart-process">
          {/* Billing Details Section */}
          <Box className="cart-section">
            <Typography variant="h6" className="section-title">
              Billing Details
            </Typography>

            {/* First Name */}
            <TextField
              fullWidth
              label="First Name*"
              variant="outlined"
              size="small"
              className="input-field"
            />

            {/* Company Name */}
            <TextField
              fullWidth
              label="Company Name"
              variant="outlined"
              size="small"
              className="input-field"
            />

            {/* Street Address */}
            <TextField
              fullWidth
              label="Street Address*"
              variant="outlined"
              size="small"
              className="input-field"
            />

            {/* Apartment (optional) */}
            <TextField
              fullWidth
              label="Apartment, floor, etc. (optional)"
              variant="outlined"
              size="small"
              className="input-field"
            />

            {/* Town/City */}
            <TextField
              fullWidth
              label="Town/City*"
              variant="outlined"
              size="small"
              className="input-field"
            />

            {/* Phone Number */}
            <TextField
              fullWidth
              label="Phone Number*"
              variant="outlined"
              size="small"
              className="input-field"
            />

            {/* Email Address */}
            <TextField
              fullWidth
              label="Email Address*"
              variant="outlined"
              size="small"
              className="input-field"
            />

            {/* Save Information Checkbox */}
            <FormControlLabel
              control={<Checkbox color="primary" />}
              label="Save this information for faster check-out next time"
              className="save-info"
            />
          </Box>
          <Box className="order-summary">
            {/* Product List */}
            <Box className="product-list">{oldSummary}</Box>

            {/* Price Summary */}
            <Box className="price-summary">
              <Typography className="summary-item">
                Subtotal: <span className="price">${totalPricePrice}</span>
              </Typography>
              <Typography className="summary-item">
                Shipping: <span className="price">Free</span>
              </Typography>
              <Typography className="summary-item total">
                Total: <span className="price">${totalPricePrice}</span>
              </Typography>
            </Box>

            {/* Payment Options */}
            <Box className="payment-options">
              <Typography variant="h6" sx={{ mb: 2 }}>
                Payment Method
              </Typography>
              <RadioGroup>
                <FormControlLabel
                  value="bank"
                  control={<Radio />}
                  label="Bank"
                />
                <FormControlLabel
                  value="cod"
                  control={<Radio />}
                  label="Cash on delivery"
                />
              </RadioGroup>
            </Box>

            {/* Coupon Section */}
            <Box className="coupon-section">
              <TextField
                fullWidth
                placeholder="Enter Coupon Code"
                variant="outlined"
                size="small"
                className="coupon-input"
              />
              <Button variant="contained" className="coupon-button">
                Apply Coupon
              </Button>
            </Box>

            {/* Place Order Button */}
            <Box className="order-button">
              <Button variant="contained" fullWidth>
                Place Order
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
