"use client";

import { Provider } from "react-redux";
import CardProduct from "./components/card-product";
import CartTransaction from "./components/cart-transaction";
import CategoryList from "./components/category-list";
import store from "./redux/store";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function Home() {
  return (
    <main className="flex">
      <Provider store={store}>
        <div className="flex flex-col xl:w-[80%] lg:w-[75%] md:w-[60%] mb-8">
          <div className="relative mt-4 w-[95%]">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Search anything..."
              className="pl-10"
            />
          </div>
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
