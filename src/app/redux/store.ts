import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";

const store = configureStore({
    reducer: {
        cart: cartSlice
    }
})

store.subscribe(() => {
    console.log(`Onchange store : ${store.getState()}`)
})

export default store