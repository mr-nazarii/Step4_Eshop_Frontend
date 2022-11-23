import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    loadProducts: (state, action) => {
      console.log(action.payload.data);
      state.push(...action.payload.data);
    },
  },
});

export const { loadProducts } = productSlice.actions;

export default productSlice.reducer;
