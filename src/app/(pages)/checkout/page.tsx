"use client";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ProductType } from "@/app/components/card-product";
import OrderSummary from "./components/order-summary";
import LoadingOrder from "./components/loading-order";
import { RootStateCart } from "@/app/components/cart-transaction";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<ProductType[]>([]);
  const cartItemsRedux = useSelector((state: RootStateCart) => state.cart.data);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const cartItemsString = localStorage.getItem("CART_ITEMS");
      const cartItems = cartItemsString ? JSON.parse(cartItemsString) : [];

      if (cartItems.length === 0) {
        router.push("/");
      }

      const productCheckout = cartItems.map((cartItem: ProductType) => ({
        ...cartItem,
        qty: cartItem.qty || 0,
      }));

      setProduct(productCheckout);
      setIsLoading(false);
    };

    fetchData();
  }, [cartItemsRedux, router]);

  return (
    <section className="my-10 flex justify-center">
      <div className="xl:w-[70%] md:w-[90%]">
        <div className="w-full">
          {!isLoading ? <OrderSummary product={product} /> : <LoadingOrder />}
        </div>
      </div>
    </section>
  );
}
