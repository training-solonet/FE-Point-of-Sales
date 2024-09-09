"use client"

import { Provider } from "react-redux";
import CardProduct from "./components/card-product";
import CartTransaction from "./components/cart-transaction";
import CategoryList from "./components/category-list";
import store from "./redux/store";

export default function Home() {
  return (
    <main className="flex">
      <Provider store={store}>
        <div className="flex flex-col xl:w-[80%] lg:w-[75%] md:w-[60%] mb-8">
          <CategoryList />
          <CardProduct />
        </div>
        <div className="hidden md:block md:w-1/4">
          <div className="fixed top-0 right-0 z-0 w-full md:w-1/4 lg:w-1/5 h-full">
            <CartTransaction />
          </div>
        </div>
      </Provider>
    </main>
  );
}
