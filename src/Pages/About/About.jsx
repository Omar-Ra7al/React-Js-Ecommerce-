// Css >>
import "./About.css";
// Mui
import { Box, Typography, Container } from "@mui/material";
// Icons
import HeadphonesIcon from "@mui/icons-material/Headphones";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";

// Imgs >>
import cartImg from "../../../public/assets/Images/Home/Signup.png";
import person1 from "../../../public/assets/Images/Home/Frame 874.png";
import person2 from "../../../public/assets/Images/Home/image 47.png";

export default function AboutUs() {
  return (
    <Container>
      <Box className="section about">
        <Box className="details">
          <Typography className="title">
            Home / <span style={{ fontWeight: "bold" }}>About</span>
          </Typography>
        </Box>
        <Box>
          {/* Left side content */}
          <Box className="about-welcome">
            <Box className="descripe">
              <Typography
                variant="h3"
                fontWeight={"bold"}
                marginBottom={"20px"}>
                Our Story
              </Typography>
              <Typography sx={{ mb: 2 }}>
                Launched in 2015, Exclusive is South Asia’s premier online
                shopping marketplace with an active presence in Bangladesh.
                Supported by a wide range of tailored marketing, data, and
                service solutions, Exclusive has 10,500 sellers and 300 brands
                and serves 3 million customers across the region.
              </Typography>
              <Typography sx={{ mb: 2 }}>
                Exclusive has more than 1 million products to offer, growing at
                a very fast rate. Exclusive offers a diverse assortment in
                categories ranging from consumer electronics, fashion, home
                appliances, to beauty products and more.
              </Typography>
            </Box>
            <Box className="welcome-img-holder">
              <img src={cartImg} alt="" />
            </Box>
          </Box>
          {/* << Start  Caterogries Section 3  */}
          <Box className="section caterogries services">
            <Box className="icons-container">
              <Box className="icon-box">
                <Box className="services-box">
                  <Box className="rounded-box">
                    <MonetizationOnIcon />
                  </Box>
                </Box>
                <Typography variant="h4">10.5k</Typography>
                <Typography variant="body2">Phone</Typography>
              </Box>
              <Box className="icon-box red">
                <Box className="services-box">
                  <Box className="rounded-box">
                    <StorefrontIcon />
                  </Box>
                </Box>
                <Typography variant="h4">10.5k</Typography>
                <Typography variant="body2">Phone</Typography>
              </Box>
              <Box className="icon-box">
                <Box className="services-box">
                  <Box className="rounded-box">
                    <CardGiftcardIcon />
                  </Box>
                </Box>
                <Typography variant="h4">10.5k</Typography>
                <Typography variant="body2">Computer</Typography>
              </Box>
              <Box className="icon-box">
                <Box className="services-box">
                  <Box className="rounded-box">
                    <MonetizationOnIcon />
                  </Box>
                </Box>
                <Typography variant="h4">10.5k</Typography>
                <Typography variant="body2">Computer</Typography>
              </Box>
            </Box>
          </Box>
          {/* End  Caterogries Section 3 //>>  */}

          {/* Carddd  */}
          <Box className="card-container">
            <Box className="card">
              <Box className="img-container">
                <img src={person1} alt="" />
              </Box>
              <Box className="body">
                <Typography variant="h5">Tom Cruise</Typography>
                <Typography variant="body2">Founder & Chairman</Typography>
                <TwitterIcon />
                <LinkedInIcon />
                <InstagramIcon />
              </Box>
            </Box>
            <Box className="card">
              <Box className="img-container">
                <img src={person2} alt="" />
              </Box>
              <Box className="body">
                <Typography variant="h5">Tom Cruise</Typography>
                <Typography variant="body2">Founder & Chairman</Typography>
                <TwitterIcon />
                <LinkedInIcon />
                <InstagramIcon />
              </Box>
            </Box>
            <Box className="card">
              <Box className="img-container">
                <img src={person1} alt="" />
              </Box>
              <Box className="body">
                <Typography variant="h5">Tom Cruise</Typography>
                <Typography variant="body2">Founder & Chairman</Typography>
                <TwitterIcon />
                <LinkedInIcon />
                <InstagramIcon />
              </Box>
            </Box>
          </Box>
          {/* << Start Services Section 8 */}
          <Box className="section services">
            <Box className="services-box">
              <Box className="rounded-box">
                <VerifiedUserIcon />
              </Box>
              <Box className="services-details">
                <Typography className="title">
                  FREE AND FAST DELIVERY
                </Typography>
                <Typography className="body">
                  Free delivery for all orders over $140
                </Typography>
              </Box>
            </Box>
            <Box className="services-box">
              <Box className="rounded-box">
                <HeadphonesIcon />
              </Box>
              <Box className="services-details">
                <Typography className="title">
                  FREE AND FAST DELIVERY
                </Typography>
                <Typography className="body">
                  Free delivery for all orders over $140
                </Typography>
              </Box>
            </Box>
            <Box className="services-box">
              <Box className="rounded-box">
                <LocalShippingIcon />
              </Box>

              <Box className="services-details">
                <Typography className="title">
                  FREE AND FAST DELIVERY
                </Typography>
                <Typography className="body">
                  Free delivery for all orders over $140
                </Typography>
              </Box>
            </Box>
          </Box>
          {/* End Services Section 8 //>> */}
        </Box>
      </Box>
    </Container>
  );
}
