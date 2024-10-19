// CSS
import "./Home.css";
// MUI Components
import {
  Container,
  Box,
  Typography,
  List,
  Button,
  ListItem,
  ListItemText,
  Grid,
  IconButton,
} from "@mui/material";
// MUI Icons
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AppleIcon from "@mui/icons-material/Apple";
import GradeIcon from "@mui/icons-material/Grade";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import ComputerIcon from "@mui/icons-material/Computer";
import WatchIcon from "@mui/icons-material/Watch";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// Images
import HomeImg from "/assets/Images/Home/iphone14.png";
import Jbl from "/assets/Images/Home/Jbl.png";
import Ps5 from "/assets/Images/Home/ps5-slim.png";
import Women from "/assets/Images/Home/women.png";
import Gucci from "/assets/Images/Home/Gucci.png";
import Amazon from "/assets/Images/Home/amazon.png";

// React Router
import { Link } from "react-router-dom";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "../../features/products/productsSlice";

export default function Home() {
  // Redux >>
  const productsState = useSelector((state) => state.products);
  const dispatch = useDispatch();

  // Add Product
  const addProductToCart = function (id) {
    dispatch(addProduct({ status: "cart", id: id }));
  };
  const addProductToWish = function (id) {
    dispatch(addProduct({ status: "wish", id: id }));
  };

  const products = productsState.productsData;
  // Filter Products With useable function >>
  const productsFilter = function (filterState, value) {
    return products.filter((item) => {
      switch (filterState) {
        case "discount":
          return item.discount.haveDiscount == value;
        case "bestSelling":
          return item.rate >= value;

        default:
          return products;
      }
    });
  };

  const discountProducts = productsFilter("discount", true)
    .slice(0, 4)
    // Todo in swipe add more in value number
    .map((item) => {
      const inWish = productsState.wishProducts.some((i) => {
        return i.id == item.id;
      });
      const inCart = productsState.cartProducts.some((i) => {
        return i.id == item.id;
      });
      return (
        <Box key={item.id} className="product">
          <Box className="img-wrappere">
            <img loading="lazy" src={item.mainImg} alt="img" />
            <Box className="icons">
              <Box
                className={`icon-wrapper ${inWish ? "inwish" : ""}`}
                onClick={() => {
                  addProductToWish(item.id);
                }}>
                <IconButton aria-label="wish">
                  <FavoriteBorderIcon className="icon" />
                </IconButton>
              </Box>

              <Box className="icon-wrapper">
                <IconButton
                  aria-label="go to details page"
                  component={Link}
                  to={`/productDetails/${item.id}`}>
                  <RemoveRedEyeIcon className="icon" />
                </IconButton>
              </Box>
              <span className="discount-value">
                {item.discount.discountValue}%
              </span>
            </Box>
          </Box>
          {item.id == 2 ? (
            <Box className={`add-cart ${inCart ? "incart" : ""}`}>
              <Button
                variant="contained"
                onClick={() => {
                  addProductToCart(item.id);
                }}>
                {!inCart ? "Add To Cart" : "IN CART"}
                <ShoppingCartIcon />
              </Button>
            </Box>
          ) : (
            ""
          )}
          <Box className="content">
            <Typography className="title">{item.name}</Typography>
            <Box className="prices">
              <Typography className="new">
                $
                {(item.price * (1 - item.discount.discountValue / 100)).toFixed(
                  2
                )}
              </Typography>
              <Typography className="old">${item.price}</Typography>
            </Box>
            <Box className="rate">
              <Box className="stars">
                <GradeIcon className="star" />
                <GradeIcon className="star" />
                <GradeIcon className="star" />
                <GradeIcon className="star" />
                <GradeIcon className="star" />
              </Box>
              <Typography className="count">({item.count})</Typography>
            </Box>
          </Box>
        </Box>
      );
    });
  const bestSelling = productsFilter("bestSelling", 4.7)
    .slice(0, 4)
    // Todo in swipe add more in value number
    .map((item) => {
      const inWish = productsState.wishProducts.some((i) => {
        return i.id == item.id;
      });

      return (
        <Box key={item.id} className="product">
          <Box className="img-wrappere">
            <img loading="lazy" src={item.mainImg} alt="img" />
            <Box className="icons">
              <Box
                className={`icon-wrapper ${inWish ? "inwish" : ""}`}
                onClick={() => {
                  addProductToWish(item.id);
                }}>
                <IconButton aria-label="wish">
                  <FavoriteBorderIcon className="icon" />
                </IconButton>
              </Box>

              <Box className="icon-wrapper">
                <IconButton
                  aria-label="go to details page"
                  component={Link}
                  to={`/productDetails/${item.id}`}>
                  <RemoveRedEyeIcon className="icon" />
                </IconButton>
              </Box>
            </Box>
          </Box>
          <Box className="content">
            <Typography className="title">{item.name}</Typography>
            <Box className="prices">
              <Typography className="new">${item.price}</Typography>
            </Box>
            <Box className="rate">
              <Box className="stars">
                <GradeIcon className="star" />
                <GradeIcon className="star" />
                <GradeIcon className="star" />
                <GradeIcon className="star" />
                <GradeIcon className="star" />
              </Box>
              <Typography className="count">({item.count})</Typography>
            </Box>
          </Box>
        </Box>
      );
    });

  return (
    <Container>
      {/* << Start Categorey List  Section 1 */}
      <Box className="section">
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Box className="sidebar">
              {/* List >> */}
              <List className="sidebar-list">
                <ListItem disableGutters className="sidebar-item">
                  <ListItemText primary="Woman’s Fashion" />
                  <IconButton edge="end" aria-label="expand">
                    <ArrowForwardIosIcon className="icon" />
                  </IconButton>
                </ListItem>
                <ListItem disableGutters className="sidebar-item">
                  <ListItemText primary="Men’s Fashion" />
                  <IconButton edge="end" aria-label="expand">
                    <ArrowForwardIosIcon className="icon" />
                  </IconButton>
                </ListItem>
                {[
                  "Electronics",
                  "Home & Lifestyle",
                  "Medicine",
                  "Sports & Outdoor",
                  "Baby’s & Toys",
                  "Groceries & Pets",
                  "Health & Beauty",
                ].map((item) => (
                  <ListItem key={item} disableGutters className="sidebar-item">
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Grid>
          {/* Slider */}
          <Grid item xs={12} md={9} className="container">
            <Box className="slider">
              <Box className="slider-left">
                {/* B1 */}
                <Box className="slider-title">
                  <AppleIcon sx={{ fontSize: "50px" }} />
                  <Typography sx={{ fontSize: "14px", color: "#FAFAFA" }}>
                    iPhone 14 Series
                  </Typography>
                </Box>
                {/* B2 */}
                <Box>
                  <Typography className="slider-main-title">
                    Up to 10% off Voucher
                  </Typography>
                </Box>
                {/* B3 */}
                <Box className="slider-title">
                  <Link to={"./products"} className="link">
                    Shop Now
                  </Link>
                  <ArrowForwardIcon />
                </Box>
              </Box>
              <img className="home-img" src={HomeImg} alt="imgDescription" />
            </Box>
          </Grid>
        </Grid>
      </Box>
      {/* End
       Categorey List  Section 1 //>> */}
      {/* ________________________________________________________________ */}
      {/*  << Start Today Sales Section 2 >> */}
      <Box className="section sales">
        {/* Title */}
        <Box className="box-title">
          <span></span>
          <Typography className="title">Today's</Typography>
        </Box>

        <Box className="details">
          <Typography className="title-details">Flash Sales</Typography>
          <Box className="slide-icons">
            <ArrowBackIcon />
            <ArrowForwardIcon />
          </Box>
        </Box>
        {/* Product >> */}
        <Box className="sales">
          <Box className="products-wrapper">
            {/* <<<<<<<<< Jsx  >>>>>>>>  */}
            {discountProducts}
            {/* <<<<<<<<< Jsx  >>>>>>>>  */}
          </Box>
          <Box className="view-all">
            <Button variant="contained" color="error">
              <Link className="link" to={"/products"}>
                View All Products
              </Link>
            </Button>
          </Box>
        </Box>
      </Box>
      {/* End Today Sales Section 2 //>>  */}
      {/* ________________________________________________________________ */}
      {/* << Start  Caterogries Section 3  */}
      <Box className="section caterogries">
        {/* Title */}
        <Box className="box-title">
          <span></span>
          <Typography className="title">Categories</Typography>
        </Box>

        <Box className="details">
          <Typography className="title-details">Browse By Category</Typography>
          <Box className="slide-icons">
            <ArrowBackIcon />
            <ArrowForwardIcon />
          </Box>
        </Box>

        <Box className="icons-container">
          <Box className="icon-box">
            <PhoneAndroidIcon className="icon" />
            <Typography variant="body2">Phone</Typography>
          </Box>
          <Box className="icon-box">
            <ComputerIcon className="icon" />
            <Typography variant="body2">Computer</Typography>
          </Box>
          <Box className="icon-box">
            <WatchIcon className="icon" />
            <Typography variant="body2">Watch</Typography>
          </Box>
          <Box className="icon-box red">
            <PhotoCameraIcon className="icon" />
            <Typography variant="body2">Camera</Typography>
          </Box>
          <Box className="icon-box">
            <HeadphonesIcon className="icon" />
            <Typography variant="body2">Headphones</Typography>
          </Box>
          <Box className="icon-box">
            <VideogameAssetIcon className="icon" />
            <Typography variant="body2">Game</Typography>
          </Box>
        </Box>
      </Box>
      {/* End  Caterogries Section 3 //>>  */}
      {/* ________________________________________________________________ */}
      {/* << Start Best Sell This Mounth Section 4 */}
      <Box className="section best-selling">
        {/* Title */}
        <Box className="box-title">
          <span></span>
          <Typography className="title">This Month</Typography>
        </Box>
        <Box className="details">
          <Typography className="title-details">
            Best Selling Products
          </Typography>
          <Box className="slide-icons">
            <Box className="view-all">
              <Button variant="contained" color="error">
                <Link className="link" to={"/products"}>
                  View All
                </Link>
              </Button>
            </Box>
          </Box>
        </Box>
        <Box className="products-wrapper">
          {/* <<<<<<<<< Jsx  >>>>>>>>  */}
          {bestSelling}
          {/* <<<<<<<<< Jsx  >>>>>>>>  */}
        </Box>
      </Box>
      {/* End Best Sell This Mounth Section 4 //>>  */}
      {/* ________________________________________________________________ */}
      {/* << Start Gbl Section 5 */}
      <Box className="gbl">
        <Box className="content">
          <Box className="title">Categories</Box>
          <Box className="main-title">Enhance Your Listening Experience</Box>
          <Box className="jbl-details">
            <Box className="rounded-box">
              <Typography className="num" variant="h5">
                23
              </Typography>
              <Typography className="name" variant="body2">
                Hours
              </Typography>
            </Box>
            <Box className="rounded-box">
              <Typography className="num" variant="h5">
                05
              </Typography>
              <Typography className="name" variant="body2">
                Days
              </Typography>
            </Box>
            <Box className="rounded-box">
              <Typography className="num" variant="h5">
                59
              </Typography>
              <Typography className="name" variant="body2">
                Minutes
              </Typography>
            </Box>
            <Box className="rounded-box">
              <Typography className="num" variant="h5">
                35
              </Typography>
              <Typography className="name" variant="body2">
                Seconds
              </Typography>
            </Box>
          </Box>
          <Button variant="contained">Buy Now !</Button>
        </Box>
        <Box className="img-wrapper">
          <img loading="lazy" src={Jbl} alt="imggbl" />
        </Box>
      </Box>
      {/* End Gbl Section 5 >> */}
      {/* ________________________________________________________________ */}
      {/* << Start Our Products Section 6 */}
      <Box className="section our-products">
        {/* Title */}
        <Box className="box-title">
          <span></span>
          <Typography className="title">Our Products</Typography>
        </Box>
        <Box className="details">
          <Typography className="title-details">
            Explore Our Products
          </Typography>
          <Box className="slide-icons">
            <ArrowBackIcon />
            <ArrowForwardIcon />
          </Box>
        </Box>
        <Box className="products-wrapper">
          {/* <<<<<<<<< Jsx  >>>>>>>>  */}
          {productsFilter()
            .slice(0, 8)
            .map((item) => {
              const inWish = productsState.wishProducts.some((i) => {
                return i.id == item.id;
              });
              const inCart = productsState.cartProducts.some((i) => {
                return i.id == item.id;
              });
              return (
                <Box key={item.id} className="product">
                  <Box className="img-wrappere">
                    <img loading="lazy" src={item.mainImg} alt="img" />
                    <Box className="icons">
                      <Box
                        className={`icon-wrapper ${inWish ? "inwish" : ""}`}
                        onClick={() => {
                          addProductToWish(item.id);
                        }}>
                        <IconButton aria-label="wish">
                          <FavoriteBorderIcon className="icon" />
                        </IconButton>
                      </Box>

                      <Box className="icon-wrapper">
                        <IconButton
                          component={Link}
                          aria-label="go to details page"
                          to={`/productDetails/${item.id}`}>
                          <RemoveRedEyeIcon className="icon" />
                        </IconButton>
                      </Box>

                      {/* Check if item include discount frist */}
                      {item.discount.haveDiscount ? (
                        <span className="discount-value">
                          {item.discount.discountValue}%
                        </span>
                      ) : (
                        ""
                      )}
                    </Box>
                  </Box>
                  {item.id == 2 ? (
                    <Box className={`add-cart ${inCart ? "incart" : ""}`}>
                      <Button
                        variant="contained"
                        onClick={() => {
                          addProductToCart(item.id);
                        }}>
                        {!inCart ? "Add To Cart" : "IN CART"}
                        <ShoppingCartIcon />
                      </Button>
                    </Box>
                  ) : (
                    ""
                  )}
                  <Box className="content">
                    <Typography className="title">{item.name}</Typography>
                    <Box className="prices">
                      <Typography className="new">
                        $
                        {(
                          item.price *
                          (1 - item.discount.discountValue / 100)
                        ).toFixed(2)}
                      </Typography>
                      {item.discount.haveDiscount ? (
                        <Typography className="old">${item.price}</Typography>
                      ) : (
                        ""
                      )}
                    </Box>
                    <Box className="rate">
                      <Box className="stars">
                        <GradeIcon className="star" />
                        <GradeIcon className="star" />
                        <GradeIcon className="star" />
                        <GradeIcon className="star" />
                        <GradeIcon className="star" />
                      </Box>
                      <Typography className="count">({item.count})</Typography>
                    </Box>
                  </Box>
                </Box>
              );
            })}
        </Box>
      </Box>
      {/* End Our Products Section 6 //>>  */}
      {/* ________________________________________________________________ */}
      {/* << Start New Arrival Section 7 */}
      <Box className="section new-arrival">
        {/* Title */}
        <Box className="box-title">
          <span></span>
          <Typography className="title">Featured</Typography>
        </Box>
        <Box className="details">
          <Typography className="title-details">New Arrival</Typography>
        </Box>
        <Grid container spacing={2} className="new-arrival">
          {/* Left Section */}
          <Grid item xs={12} md={6}>
            <Box className="box-holder">
              <Box className="img-wrapper">
                <img loading="lazy" src={Ps5} alt="imgPS5" />
                <Box className="img-details">
                  <Typography className="title">PlayStation 5</Typography>
                  <Typography className="body">
                    Black and White version of the PS5 coming out on sale.
                  </Typography>
                  <Link to={"./products"}>Shop Now</Link>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Right Section */}
          <Grid item xs={12} md={6} className="right-holder">
            <Box className="box-holder right">
              {/* Upper Image */}
              <Box className="img-wrapper">
                <img
                  loading="lazy"
                  src={Women}
                  alt="imgWomen"
                  className="women"
                />
                <Box className="img-details">
                  <Typography className="title">Women’s Fashion</Typography>
                  <Typography className="body">
                    Featured woman collections that give you another vibe.
                  </Typography>
                  <Link to={"./products"}>Shop Now</Link>
                </Box>
              </Box>

              {/* Lower Images */}
              <Box className="right-down">
                {/* Image 1 */}
                <Box className="img-wrapper">
                  <img loading="lazy" src={Gucci} alt="imgGucci" />
                  <Box className="img-details">
                    <Typography className="title">Gucci Sale</Typography>
                    <Typography className="body">
                      Get up to 50% off on select Gucci items.
                    </Typography>
                    <Link to={"./products"}>Shop Now</Link>
                  </Box>
                </Box>

                {/* Image 2 */}
                <Box className="img-wrapper">
                  <img loading="lazy" src={Amazon} alt="imgAmazon" />
                  <Box className="img-details">
                    <Typography className="title">Amazon Deals</Typography>
                    <Typography className="body">
                      Special discounts on Amazon products.
                    </Typography>
                    <Link to={"./products"}>Shop Now</Link>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      {/* End New Arrival Section 7 //>>  */}
      {/* ________________________________________________________________ */}
      {/* << Start Services Section 8 */}
      <Box className="section services">
        <Box className="services-box">
          <Box className="rounded-box">
            <VerifiedUserIcon />
          </Box>
          <Box className="services-details">
            <Typography className="title">FREE AND FAST DELIVERY</Typography>
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
            <Typography className="title">FREE AND FAST DELIVERY</Typography>
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
            <Typography className="title">FREE AND FAST DELIVERY</Typography>
            <Typography className="body">
              Free delivery for all orders over $140
            </Typography>
          </Box>
        </Box>
      </Box>
      {/* End Services Section 8 //>> */}
    </Container>
  );
}
