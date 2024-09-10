import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";

const store = configureStore({
    reducer: {
        cart: cartSlice
    }
})

store.subscribe(() => {
    const currentState = store.getState()
    console.log(`Onchange store : ${JSON.stringify(currentState.cart.data)}`)
})

export default store