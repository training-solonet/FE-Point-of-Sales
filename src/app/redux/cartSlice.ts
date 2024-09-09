import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  qty: number;
}

const initialState: { data: CartItem[] } = {
  data: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.data.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.qty += action.payload.qty;
      } else {
        state.data.push(action.payload);
      }
      localStorage.setItem("CART_ITEMS", JSON.stringify(state.data));
    },
    increment: (state, action: PayloadAction<string>) => {
      const existingItem = state.data.find(
        (item) => item.id === action.payload
      );
      if (existingItem) {
        existingItem.qty += 1;
      }
      localStorage.setItem("CART_ITEMS", JSON.stringify(state.data));
    },
    decrement: (state, action: PayloadAction<string>) => {
      const existingItem = state.data.find(
        (item) => item.id === action.payload
      );
      if (existingItem && existingItem.qty > 1) {
        existingItem.qty -= 1;
      } else {
        state.data = state.data.filter((item) => item.id !== action.payload);
      }
      localStorage.setItem("CART_ITEMS", JSON.stringify(state.data));
    },
    deleteById: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter((item) => item.id !== action.payload);

      localStorage.setItem("CART_ITEMS", JSON.stringify(state.data));
    },
    clear: (state) => {
      state.data = [];
      localStorage.removeItem("CART_ITEMS");
    },
  },
});

export const { addToCart, increment, decrement, clear, deleteById } = cartSlice.actions;
export default cartSlice.reducer;
