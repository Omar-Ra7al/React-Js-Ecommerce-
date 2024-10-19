import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch("/products.json"); // Use the relative path from the public directory
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data; // Return the fetched data
  }
);

const initialState = {
  productsData: [],
  cartProducts: JSON.parse(localStorage.getItem("cartProducts")) || [], // GET Data From LocalStorage IN Evrey (Load)
  wishProducts: JSON.parse(localStorage.getItem("wishProducts")) || [], // GET Data From LocalStorage IN Evrey (Load)
  inCart: false,
  inWish: false,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      if (action.payload.status === "cart") {
        // Update the state to take last changes from local storage before di any thing >>
        state.cartProducts =
          JSON.parse(localStorage.getItem("cartProducts")) || [];
        // Check if the product in the cart ?
        state.inCart = state.cartProducts.some((item) => {
          return item.id == action.payload.id;
        });
        // If is not in cart >> add the product
        if (!state.inCart) {
          state.productsData.filter((item) => {
            if (item.id == action.payload.id) {
              // Add user quiantity in the cart object when push
              return state.cartProducts.unshift({ ...item, userQuantity: 1 });
            }
          });
        }
        localStorage.setItem(
          "cartProducts",
          JSON.stringify(state.cartProducts)
        );
      } else if (action.payload.status === "wish") {
        // Update the state to take last changes from local storage before di any thing >>
        state.wishProducts =
          JSON.parse(localStorage.getItem("wishProducts")) || [];
        // Check if the product in the cart ?
        state.inWish = state.wishProducts.some((item) => {
          return item.id == action.payload.id;
        });
        // If is not in cart >> add the product
        if (!state.inWish) {
          state.productsData.filter((item) => {
            if (item.id == action.payload.id) {
              return state.wishProducts.unshift(item);
            }
          });
        }
        // Save items in Local Storage
        localStorage.setItem(
          "wishProducts",
          JSON.stringify(state.wishProducts)
        );
      }
    },
    removeProduct: (state, action) => {
      if (action.payload.status == "cart") {
        // Update the state to take last changes from local storage before di any thing >>
        state.cartProducts = JSON.parse(localStorage.getItem("cartProducts"));
        const filterdArr = state.cartProducts.filter((item) => {
          return item.id !== action.payload.id;
        });
        localStorage.setItem("cartProducts", JSON.stringify(filterdArr));
        state.cartProducts = filterdArr;
      } else if (action.payload.status == "wish") {
        // Update the state to take last changes from local storage before di any thing >>
        state.wishProducts = JSON.parse(localStorage.getItem("wishProducts"));
        const filterdArr = state.wishProducts.filter((item) => {
          return item.id !== action.payload.id;
        });
        localStorage.setItem("wishProducts", JSON.stringify(filterdArr));
        state.wishProducts = filterdArr;
      }
    },
    quantity: (state, action) => {
      state.cartProducts = JSON.parse(localStorage.getItem("cartProducts"));
      const newUserQuantity = state.cartProducts.map((item) => {
        if (item.id == action.payload.id) {
          // Increase
          if (
            action.payload.status == "increase" &&
            item.userQuantity < item.count
          ) {
            return { ...item, userQuantity: (item.userQuantity += 1) };
          }
          // Decrease
          else if (
            action.payload.status == "decrease" &&
            item.userQuantity > 1
          ) {
            return { ...item, userQuantity: (item.userQuantity -= 1) };
          }
          return { ...item, userQuantity: item.userQuantity };
        } else {
          // Retrun te another item is not == the id
          return item;
        }
      });
      localStorage.setItem("cartProducts", JSON.stringify(newUserQuantity));
      state.cartProducts = newUserQuantity;
    },
    wishTocart: (state) => {
      state.cartProducts = [state.cartProducts, ...state.wishProducts];
      // update local storage
      localStorage.setItem("cartProducts", JSON.stringify(state.cartProducts));
    },
  },
  // extraReducers >>
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.productsData = action.payload;
    });
  },
});

export const { addProduct, quantity, removeProduct, wishTocart } =
  productsSlice.actions;

export default productsSlice.reducer;
