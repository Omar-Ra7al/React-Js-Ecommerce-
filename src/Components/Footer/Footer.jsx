import { Box, Typography, Grid, IconButton, Container } from "@mui/material";
import { Facebook, Instagram, WhatsApp, LinkedIn } from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";
import qr from "../../assets/Images/Home/Qr Code.png";
import iphone from "../../assets/Images/Home/download-appstore.png";
import googleplay from "../../assets/Images/Home/google-play-store-logo-.png";
import "./Footer.css";
export default function Footer() {
  return (
    <Box className="footer">
      <Container>
        <Grid container spacing={2} className="footer-grid">
          {/* Exclusive Section */}
          <Grid item xs={12} sm={2} className="footer-item">
            <Typography variant="h6">Exclusive</Typography>

            <Box className="subscribe">
              <Typography variant="h6">Subscribe</Typography>
              <Typography variant="body2">
                Get 10% off your first order
              </Typography>
              <Box className="subscribe-form">
                <input
                  label="Enter your email"
                  placeholder="Enter your email"
                  className="email-input"></input>
                <IconButton className="icon" color="secondary">
                  <SendIcon />
                </IconButton>
              </Box>
            </Box>
          </Grid>

          {/* Support Section */}
          <Grid item xs={12} sm={2} className="footer-item">
            <Typography variant="h6">Support</Typography>
            <Typography variant="body2">
              111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.
            </Typography>
            <ul>
              <li>
                <a href="mailto:exclusive@gmail.com">exclusive@gmail.com</a>
              </li>
              <li>
                <a href="tel:+88015-88888-9999">+88015-88888-9999</a>
              </li>
            </ul>
          </Grid>

          {/* Account Section */}
          <Grid item xs={12} sm={2} className="footer-item">
            <Typography variant="h6">Account</Typography>
            <ul>
              <li>
                <a href="#my-account">My Account</a>
              </li>
              <li>
                <a href="#login-register">Login / Register</a>
              </li>
              <li>
                <a href="#cart">Cart</a>
              </li>
              <li>
                <a href="#wishlist">Wishlist</a>
              </li>
              <li>
                <a href="#shop">Shop</a>
              </li>
            </ul>
          </Grid>

          {/* Quick Link Section */}
          <Grid item xs={12} sm={2} className="footer-item">
            <Typography variant="h6">Quick Links</Typography>
            <ul>
              <li>
                <a href="/wishlist">Privacy Policy</a>
              </li>
              <li>
                <a href="/cart">Terms Of Use</a>
              </li>
              <li>
                <a href="/faq">FAQ</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={2} className="footer-item">
            <Typography variant="h6">Download App</Typography>
            <Typography fontSize={"10px"}>
              Save $3 with App New User Only
            </Typography>
            <Box className="download-app-imgs">
              <Box className="img-wrapper">
                <img src={qr} alt="QR code" />
              </Box>
              <Box className="right">
                <Box className="img-wrapper">
                  <img src={iphone} alt="iPhone" />
                </Box>
                <Box className="img-wrapper">
                  <img src={googleplay} alt="Google Play" />
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
              }}>
              <IconButton
                aria-label="Facebook"
                href="https://facebook.com"
                target="_blank">
                <Facebook sx={{ color: "#eee", fontSize: "16px" }} />{" "}
                {/* Facebook blue */}
              </IconButton>
              <IconButton
                aria-label="Instagram"
                href="https://instagram.com"
                target="_blank">
                <Instagram sx={{ color: "#eee", fontSize: "16px" }} />{" "}
                {/* Instagram gradient pink */}
              </IconButton>
              <IconButton
                aria-label="WhatsApp"
                href="https://whatsapp.com"
                target="_blank">
                <WhatsApp sx={{ color: "#eee", fontSize: "16px" }} />{" "}
                {/* WhatsApp green */}
              </IconButton>
              <IconButton
                aria-label="LinkedIn"
                href="https://linkedin.com"
                target="_blank">
                <LinkedIn sx={{ color: "#eee", fontSize: "16px" }} />{" "}
                {/* LinkedIn blue */}
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Subscription Section */}
    </Box>
  );
}
