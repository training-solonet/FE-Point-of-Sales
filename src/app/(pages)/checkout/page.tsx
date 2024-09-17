"use client";

import store from "@/app/redux/store";
import { Provider } from "react-redux";
import { useEffect, useState } from "react";
import { ProductType } from "@/app/components/card-product";
import { getAllProduct } from "@/app/lib/data";
import OrderSummary from "./components/order-summary";
import LoadingOrder from "./components/loading-order";

export default function CheckoutPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<ProductType[]>([]);
  const [product, setProduct] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const product = await getAllProduct();
      setData(product);

      const cartItemsString = localStorage.getItem("CART_ITEMS");
      const cartItems = cartItemsString ? JSON.parse(cartItemsString) : [];

      const productCheckout = product
        .map((item: ProductType) => {
          const cartItem = cartItems.find(
            (cartItem: ProductType) => cartItem.id === item.id
          );
          return {
            ...item,
            qty: cartItem ? cartItem.qty : 0,
          };
        })
        .filter((item: ProductType) => item.qty > 0);

      setProduct(productCheckout);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="my-10 flex justify-center">
      <Provider store={store}>
        <div className="w-[70%]">
          <div className="w-full">
            {!isLoading ? (
              <OrderSummary product={product} />
            ) : (
              <LoadingOrder />
            )}
          </div>
        </div>
      </Provider>
    </div>
  );
}
