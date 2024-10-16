import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Container,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import "./Contact.css";
export default function ContactSection() {
  return (
    <Container>
      <Box className="section contact">
        <Box className="details">
          <Typography className="title">
            Home / <span style={{ fontWeight: "bold" }}>Contact</span>
          </Typography>
        </Box>
        <Box className="contact-wrapper">
          {/* Items Left side */}
          <Box className="items">
            <Box className="contact-item">
              <Box className="contact-title">
                <PhoneIcon />
                <Typography variant="h6">Call To Us</Typography>
              </Box>
              <Box className="contact-details">
                <Typography>We are available 24/7, 7 days a week.</Typography>
                <Typography>
                  <strong>Phone:</strong> +8801611112222
                </Typography>
              </Box>
            </Box>

            <Box className="contact-item">
              <Box className="contact-title">
                <EmailIcon />
                <Typography variant="h6">Write To Us</Typography>
              </Box>
              <Box className="contact-details">
                <Typography>
                  Fill out our form and we will contact you within 24 hours.
                </Typography>
                <Typography>
                  <strong>Emails:</strong> customer@exclusive.com
                </Typography>
                <Typography>
                  <strong>Emails:</strong> support@exclusive.com
                </Typography>
              </Box>
            </Box>
          </Box>
          {/* Form Right side */}
          <Box className="contact-form">
            <Grid container spacing={2} className="input-fields">
              <Grid item xs={12} sm={4}>
                <TextField fullWidth label="Your Name *" variant="outlined" />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField fullWidth label="Your Email *" variant="outlined" />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField fullWidth label="Your Phone *" variant="outlined" />
              </Grid>
            </Grid>

            <TextField
              fullWidth
              label="Your Message"
              variant="outlined"
              multiline
              rows={10}
              className="message-field"
            />

            <Box className="send-button">
              <Button variant="contained" color="primary">
                Send Message
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
