// CSS import
import "./ProductDetails.css";
// MUI components
import { Box, Typography, Container, Button, IconButton } from "@mui/material";
// MUI icons
import GradeIcon from "@mui/icons-material/Grade";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LoopIcon from "@mui/icons-material/Loop";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// React imports
import { useEffect, useMemo, useState } from "react";
// React Router >>
import { useParams } from "react-router-dom";
import { Link } from "@mui/material";

// Redux imports
import { useSelector, useDispatch } from "react-redux";
import { addProduct, quantity } from "../../features/products/productsSlice";

export default function ProductDetails() {
  // React Router >>
  const { id } = useParams();

  // Redux >>
  const productsState = useSelector((state) => state.products);
  const dispatch = useDispatch();
  // We Get the product from cart cuz we add the product in cart when the use icrease the quantity
  // >> and our quantity logic in in cart we did this to not repeat our self agin
  const [getCartItem, setGetCartItem] = useState();
  //  item.id == id it come from usePrams >>>
  const cartProduct = productsState.cartProducts.find((item) => item.id == id);
  // Get it in frist load >>
  useEffect(() => {
    if (cartProduct) {
      setGetCartItem(cartProduct.userQuantity);
    }
  }, [cartProduct]);

  // Add Product to cart  && wish >>
  const addProductToCart = function (id) {
    // In frist click into quantity to increase the product will added >>
    dispatch(addProduct({ status: "cart", id: id }));
  };
  const addProductToWish = function (id) {
    dispatch(addProduct({ status: "wish", id: id }));
  };

  // User quantity >>
  const increaseQuantity = function (id) {
    // In frist click into quantity to increase the product will added >>
    dispatch(quantity({ status: "increase", id: id }));
  };
  const decreaseQuantity = function (id) {
    dispatch(quantity({ status: "decrease", id: id }));
  };

  // Jsx >>
  const productDetailsJsx = useMemo(() => {
    return productsState.productsData.map((item) => {
      const inWish = productsState.wishProducts.some((i) => {
        return i.id == item.id;
      });
      if (item.id == id) {
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
        return (
          <Box key={item.id}>
            {/* Product Title >> */}
            <Box className="section products-details">
              <Box className="details">
                <Typography className="title">
                  Products / {item.category} /
                  <span style={{ fontWeight: "bold" }}> {item.name}</span>
                </Typography>
              </Box>
              <Box className="product-body">
                {/* ________________________________________________ */}
                {/* << Start Product Images  */}
                <Box className="product-imgs-container">
                  <Box className="lef-imgs-wrapper">
                    {item.imgs.map((img) => {
                      return (
                        <Box key={img} className="img-wrapper">
                          <img src={img} alt={item.name} />
                        </Box>
                      );
                    })}
                  </Box>
                  {/* Main img */}
                  <Box className="main-img">
                    <img src={item.mainImg} alt="" />
                  </Box>
                </Box>
                {/* End Product Images //>> */}
                {/* ________________________________________________ */}
                <Box className="body-details">
                  {/* << Start Product Details >> */}
                  <Box className="product-details">
                    <Typography className="product-title">
                      {item.name}
                    </Typography>
                    <Box className="rate">
                      <Box className="stars">{starsNum}</Box>
                      (150 Reviews) | <span>in Stock</span>
                    </Box>
                    <Typography className="product-price">
                      ${item.price}
                    </Typography>
                    <Typography className="product-description">
                      {item.description}
                    </Typography>
                  </Box>
                  {/* End Product Details //>> */}
                  {/* ________________________________________________ */}
                  {/* << Start Actions   */}
                  <Box className="product-actions">
                    <Box className="product-quantity">
                      <Button
                        onClick={() => {
                          decreaseQuantity(item.id);
                        }}
                        variant="contained">
                        -
                      </Button>
                      <Typography>{getCartItem || 1}</Typography>
                      <Button
                        onClick={() => {
                          addProductToCart(item.id);
                          increaseQuantity(item.id);
                        }}
                        variant="contained">
                        +
                      </Button>
                    </Box>
                    <Button variant="contained" className="buy-now">
                      Buy Now
                    </Button>
                    <IconButton
                      onClick={() => {
                        addProductToWish(item.id);
                      }}
                      className={`wish ${inWish ? "inwish" : ""}`}>
                      <FavoriteBorderIcon />
                    </IconButton>
                  </Box>
                  {/* End Actions //>>  */}
                  {/* ________________________________________________ */}
                  {/* << Start Shipping */}
                  <Box className="shipping">
                    <Box className="shipping-details">
                      <LocalShippingIcon />
                      <Box>
                        <Typography className="shipping-title">
                          Free Delivery
                        </Typography>
                        <Typography>
                          Enter your postal code for Delivery Availability
                        </Typography>
                      </Box>
                    </Box>

                    <Box className="shipping-details">
                      <LoopIcon />
                      <Box>
                        <Typography className="shipping-title">
                          Return Delivery
                        </Typography>
                        <Typography>
                          Free 30 Days Delivery Returns. Details
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  {/* End Shipping //>> */}
                  {/* ________________________________________________ */}
                </Box>
              </Box>
            </Box>

            {/* Related >> */}
            <Box className="section products">
              <Box className="details">
                <Box className="box-title">
                  <span></span>
                  <Typography className="title">Related Item</Typography>
                </Box>
              </Box>
              {/* ____________________________________________________________ */}
              {/* ____________________________________________________________ */}
              {/* Related Products  >> */}
              <Box className="products-wrapper">
                {productsState.productsData
                  .filter((i) => {
                    return i.category == item.category && i !== item;
                  })
                  .slice(0, 4)
                  .map((i) => {
                    let inCart = productsState.cartProducts.some((cartitem) => {
                      return i.id == cartitem.id;
                    });
                    const inWish = productsState.wishProducts.some(
                      (cartitem) => {
                        return i.id == cartitem.id;
                      }
                    );
                    return (
                      <Box key={i.id} className="product">
                        {/* ________________________________________________ */}
                        <Box className="img-wrappere">
                          <img src={`${i.mainImg}`} alt="" />
                          <Box className="icons">
                            {/* Check if the product include disscount */}
                            {i.discount.haveDiscount ? (
                              <span className="discount-value">
                                {i.discount.discountValue}%
                              </span>
                            ) : (
                              <></>
                            )}
                            <Box
                              className={`icon-wrapper ${
                                inWish ? "inwish" : ""
                              }`}
                              onClick={() => {
                                addProductToWish(i.id);
                              }}>
                              <IconButton>
                                <FavoriteBorderIcon className="icon" />
                              </IconButton>
                            </Box>

                            {/* To Product details  */}
                            <Box className="icon-wrapper">
                              <Link to={`/productDetails/${i.id}`}>
                                <IconButton
                                  onClick={() =>
                                    (window.location.href = `/productDetails/${i.id}`)
                                  }>
                                  <RemoveRedEyeIcon className="icon" />
                                </IconButton>
                              </Link>
                            </Box>
                          </Box>
                        </Box>
                        {/* ________________________________________________ */}

                        {/* ________________________________________________ */}
                        <Box className={`add-cart ${inCart ? "incart" : ""}`}>
                          <Button
                            variant="contained"
                            onClick={() => {
                              addProductToCart(i.id);
                            }}>
                            {!inCart ? "Add To Cart" : "IN CART"}
                            <ShoppingCartIcon />
                          </Button>
                        </Box>
                        {/* ________________________________________________ */}

                        {/* ________________________________________________ */}
                        <Box className="content">
                          <Typography className="title">{i.name}</Typography>
                          <Box className="rate-price">
                            <Box className="prices">
                              <Typography className="new">
                                $
                                {(
                                  i.price *
                                  (1 - i.discount.discountValue / 100)
                                ).toFixed(2)}
                              </Typography>
                              {item.discount.haveDiscount ? (
                                <Typography className="old">
                                  ${i.price}
                                </Typography>
                              ) : (
                                ""
                              )}
                            </Box>
                            <Box className="rate">
                              <Box className="stars">
                                {starsNum.map((star) => {
                                  return star;
                                })}
                              </Box>
                              <Typography className="count">
                                ({i.count})
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                        {/* ________________________________________________ */}
                      </Box>
                    );
                  })}
              </Box>
              {/* ____________________________________________________________ */}
              {/* ____________________________________________________________ */}
            </Box>
          </Box>
        );
      }
    });
  }, [productsState, getCartItem]);

  return <Container>{productDetailsJsx}</Container>;
}
