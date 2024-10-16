import { Link } from "react-router-dom";
import { Box, Typography, Button, Container } from "@mui/material";
import "./Error.css";
function NotFound() {
  return (
    <Container>
      <Box className="section error">
        <Box className="details">
          <Typography className="title">
            Home / <span style={{ fontWeight: "bold" }}>Error</span>
          </Typography>
        </Box>
        <Box
          className="error-content"
          sx={{
            textAlign: "center",
            mt: 8,
          }}>
          <Typography variant="h1" sx={{ fontSize: "4rem", mb: 2 }}>
            404 Error Not Found
          </Typography>

          <Typography variant="body1" sx={{ mb: 4 }}>
            You may go back to the home page.
          </Typography>
          <Button variant="contained" component={Link} to="/">
            Back to Home Page
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default NotFound;
