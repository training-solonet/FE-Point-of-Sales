import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import categorySlice from "./categorySlice";

const store = configureStore({
    reducer: {
        cart: cartSlice,
        category: categorySlice
    }
})

store.subscribe(() => {
    const currentState = store.getState()
    console.log(`Onchange store : ${JSON.stringify(currentState.cart.data)}`)
})

export default store