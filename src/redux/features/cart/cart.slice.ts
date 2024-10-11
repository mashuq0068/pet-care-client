import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICartProduct {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}
const initialState: ICartProduct[] = [];
const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    // adding product
    addProduct(state, action: PayloadAction<ICartProduct>) {
      state.push(action.payload);
    },
    // removing product
    removeProduct(state, action) {
      state.splice(action.payload, 1);
    },
    // removing all products
    removeAllProducts(state) {
      state.length = 0;
    },
    // increasing quantity
    increaseQuantity(state, action) {
      state[action.payload].quantity = state[action.payload].quantity + 1;
    },
    // decreasing quantity
    decreaseQuantity(state, action) {
      state[action.payload].quantity--;
    },
    increaseQuantityById(state, action: PayloadAction<string>) {
      const index = state.findIndex((product) => product._id === action.payload);
      if (index !== -1) {
        state[index].quantity++;
      }
    },

  },
});

export const {
  addProduct,
  removeProduct,
  removeAllProducts,
  increaseQuantity,
  decreaseQuantity,
  increaseQuantityById
} = cartSlice.actions;
export default cartSlice.reducer;
