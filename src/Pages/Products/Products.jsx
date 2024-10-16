// Css >>
import "./Products.css";
// MUI Components
import { Container, Box, Typography, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
// MUI Icons
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import GradeIcon from "@mui/icons-material/Grade";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// React Hooks >>
import { useEffect, useMemo } from "react";
// React Router >>
import { Link } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  addProduct,
} from "../../features/products/productsSlice";

export default function Products() {
  // REDUX >>
  const productsState = useSelector((state) => state.products);
  const dispatch = useDispatch();

  //  Send the dispatch of thunk function to get Products in Frist Load
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  // Add Product to cart & wish >>
  const addProductToCart = function (id) {
    dispatch(addProduct({ status: "cart", id: id }));
  };
  const addProductToWish = function (id) {
    dispatch(addProduct({ status: "wish", id: id }));
  };

  const productsData = productsState.productsData;
  const productsJsx = useMemo(() => {
    return productsData.map((item) => {
      // << Start Stars Number
      let starsNum = [];
      for (let i = 0; i < 5; i++) {
        if (starsNum.length < Math.round(item.rate)) {
          starsNum.push(
            <Box key={`star${i}`}>
              <GradeIcon className="star" />
            </Box>
          );
        } else {
          starsNum.push(
            <Box key={`star${i}`}>
              <GradeIcon className="star empty" />
            </Box>
          );
        }
      }
      // End Stars Number //>>

      const inCart = productsState.cartProducts.some((i) => {
        return i.id == item.id;
      });
      const inWish = productsState.wishProducts.some((i) => {
        return i.id == item.id;
      });

      return (
        <Box key={item.id} className="product">
          {/* ________________________________________________ */}
          <Box className="img-wrappere">
            <img src={`${item.mainImg}`} alt="" />
            <Box className="icons">
              {/* Check if the product include disscount */}
              {item.discount.haveDiscount ? (
                <span className="discount-value">
                  {item.discount.discountValue}%
                </span>
              ) : (
                <></>
              )}
              <Box
                className={`icon-wrapper ${inWish ? "inwish" : ""}`}
                onClick={() => {
                  addProductToWish(item.id);
                }}>
                <IconButton>
                  <FavoriteBorderIcon className="icon" />
                </IconButton>
              </Box>

              {/* To Product details  */}
              <Box className="icon-wrapper">
                <IconButton component={Link} to={`/productDetails/${item.id}`}>
                  <RemoveRedEyeIcon className="icon" />
                </IconButton>
              </Box>
            </Box>
          </Box>
          {/* ________________________________________________ */}

          {/* ________________________________________________ */}
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
          {/* ________________________________________________ */}

          {/* ________________________________________________ */}
          <Box className="content">
            <Typography className="title">{item.name}</Typography>
            <Box className="rate-price">
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
                <Box className="stars">{starsNum}</Box>
                <Typography className="count">({item.count})</Typography>
              </Box>
            </Box>
          </Box>
          {/* ________________________________________________ */}
        </Box>
      );
    });
  }, [productsState]);

  return (
    <Container>
      <Box className="section products">
        {/* Title */}
        <Box className="details box-title">
          <span></span>
          <Typography className="title">Our Products</Typography>
        </Box>
        <Box className="details">
          <Typography className="title-details">
            Explore Our Products
          </Typography>
        </Box>
        <Box className="products-wrapper">{productsJsx}</Box>
      </Box>
    </Container>
  );
}
