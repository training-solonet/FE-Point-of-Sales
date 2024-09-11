"use client";

import { Provider } from "react-redux";
import CardProduct from "./components/card-product";
import CartTransaction from "./components/cart-transaction";
import CategoryList from "./components/category-list";
import store from "./redux/store";
import { useEffect, useState } from "react";
import { SearchIcon, X } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLocaleLowerCase();
    setSearchValue(value);
  };

  console.log(searchValue);

  return (
    <main className="flex">
      <Provider store={store}>
        <div className="flex flex-col xl:w-[80%] lg:w-[75%] md:w-[60%] mb-8">
          <div className="relative mt-4 w-[95%]">
            <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <div className="flex gap-x-6">
              <Input
                placeholder="Search anything..."
                className="pl-10 font-medium text-sm"
                value={searchValue}
                onChange={(e) => handleChange(e)}
              />
              {searchValue.length > 0 && (
                <X
                  onClick={() => setSearchValue("")}
                  className="absolute size-5 right-2 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                />
              )}
            </div>
          </div>
          <CategoryList />
          <CardProduct searchValue={searchValue} />
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
