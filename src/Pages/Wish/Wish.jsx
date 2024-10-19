// CSS
import "./Wish.css";

// React
import { useMemo } from "react";
import { Link } from "react-router-dom";

// MUI Components
import { Container, Box, Typography, Button, IconButton } from "@mui/material";

// MUI Icons
import GradeIcon from "@mui/icons-material/Grade";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  addProduct,
  removeProduct,
  wishTocart,
} from "../../features/products/productsSlice";

// Image import (if needed, add it here)

export default function Wish() {
  // Redux >>
  const productsState = useSelector((state) => state.products);
  const dispatch = useDispatch();

  // Add & Remove Product To Wish +&&+ Add To Cart  >>
  const addProductToCart = function (id) {
    dispatch(addProduct({ status: "cart", id: id }));
  };
  const addProductToWish = function (id) {
    dispatch(addProduct({ status: "wish", id: id }));
  };
  const removeWishProduct = function (id) {
    dispatch(removeProduct({ status: "wish", id: id }));
  };
  const addAllToCart = function () {
    dispatch(wishTocart());
  };

  // Wish Jsx >>
  const wishProducts = productsState.wishProducts;
  const wishJsx = useMemo(() => {
    return wishProducts.map((item) => {
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
      return (
        <Box key={item.id} className="product">
          {/* ________________________________________________ */}
          <Box className="img-wrappere">
            <img src={item.mainImg} alt={item.name} />

            <Box className="icons">
              {/* Check if the product include disscount  */}
              {item.discount.haveDiscount ? (
                <span className="discount-value">
                  {item.discount.discountValue}%
                </span>
              ) : (
                <></>
              )}

              <Box className="icon-wrapper">
                <IconButton
                  onClick={() => {
                    removeWishProduct(item.id);
                  }}
                  aria-label="delete">
                  <DeleteIcon className="icon delete-icon" />
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
                <Typography className="new">${item.price}</Typography>
              </Box>
              <Box className="rate">
                <Box className="stars">{starsNum}</Box>
                <Typography className="count">({item.count})</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      );
    });
  }, [productsState]);

  // Just for uuuuuuuuuuuuuuuuuuuuuuuuu >>>
  const wishCategories = [];
  wishProducts.map((item) => {
    wishCategories.push(item.category);
  });

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  };

  const justForUJsx = useMemo(() => {
    const justForU = () => {
      const filteredProducts = productsState.productsData.filter((item) => {
        // Check if item category is in wishCategories and item id is NOT in wishProducts
        console.log(item.category);
        return (
          wishCategories.includes(item.category) &&
          !wishProducts.some((wishItem) => wishItem.id === item.id)
        );
      });

      // Shuffle the filtered products
      return shuffleArray(filteredProducts);
    };

    return justForU()
      .slice(0, 4)
      .map((item) => {
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
        const inWish = productsState.wishProducts.some((i) => {
          return i.id == item.id;
        });
        const inCart = productsState.cartProducts.some((i) => {
          return i.id == item.id;
        });
        return (
          <Box key={item.id} className="product">
            {/* ________________________________________________ */}
            <Box className="img-wrappere">
              <img src={`${item.mainImg}`} alt="" />

              <Box className="icons">
                {/* Check if the product include disscount  */}
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
                <Box className="icon-wrapper">
                  <IconButton
                    component={Link}
                    to={`/productDetails/${item.id}`}>
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
                  <Typography className="new">${item.price}</Typography>
                </Box>
                <Box className="rate">
                  <Box className="stars">{starsNum}</Box>
                  <Typography className="count">({item.count})</Typography>
                </Box>
              </Box>
            </Box>
            {/* ________________________________________________ */}
            {/* ____________________________________________________________ */}
            {/* ____________________________________________________________ */}
            {/* Related Products  >> */}
            {/* ____________________________________________________________ */}
            {/* ____________________________________________________________ */}
          </Box>
        );
      });
  }, [productsState]);

  return (
    <Container>
      <Box className="section">
        <Box className="details">
          <Typography className="d-title">
            WishList ({wishProducts.length})
          </Typography>
          <Box className="slide-icons">
            <Button
              variant="outlined"
              aria-label="add all to bag"
              onClick={() => {
                addAllToCart();
              }}>
              Move All To Bag
            </Button>
          </Box>
        </Box>
        {/* Title */}
        <Box className="products-wrapper">{wishJsx}</Box>
      </Box>

      {/* Just for u */}
      <Box className="section products">
        <Box className="details">
          <Box className="box-title">
            <span></span>
            <Typography className="d-title">Just for u</Typography>
          </Box>
          <Box className="slide-icons">
            <Button variant="outlined" aria-label="see all">
              See All
            </Button>
          </Box>
        </Box>
        <Box className="products-wrapper">{justForUJsx}</Box>
      </Box>
    </Container>
  );
}
