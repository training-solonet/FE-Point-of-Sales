"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, Printer } from "lucide-react";
import { rupiahFormat } from "@/lib/utils";
import { RootStateCart } from "@/app/components/cart-transaction";
import { clear } from "@/app/redux/cartSlice";

interface ProductType {
  id: string;
  nama: string;
  harga: number;
  qty: number;
}

export default function OrderSuccess() {
  const [data, setData] = useState<ProductType[]>([]);
  const cartItemsRedux = useSelector((state: RootStateCart) => state.cart.data);
  const q = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const cartItemsString = localStorage.getItem("CART_ITEMS");
      const cartItems = cartItemsString ? JSON.parse(cartItemsString) : [];

      const productCheckout = cartItems.map((cartItem: ProductType) => ({
        ...cartItem,
        qty: cartItem.qty || 0,
      }));

      setData(productCheckout);
    };

    fetchData();
  }, [cartItemsRedux]);

  const getFormattedDate: () => string = () => {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return new Date().toLocaleDateString("id-ID", options);
  };

  const totalItem = data.reduce((acc, item) => acc + item.qty, 0);
  const subtotal = data.reduce((acc, item) => acc + item.harga * item.qty, 0);

  const handleToHome = () => {
    dispatch(clear())
    router.push("/");
  };

  return (
    <section className="my-10 flex justify-center">
      <div className="xl:w-[50%] md:w-[80%] bg-white rounded-2xl p-8 shadow-2xl">
        <div className="w-full flex flex-col justify-center items-center">
          <Image
            src={"/image/success.png"}
            width={200}
            height={200}
            alt={"success"}
          />
          <h1 className="text-2xl font-semibold text-[#00D39B]">
            Order Success!
          </h1>
          <p className="text-gray-500 text-xs font-medium">
            Thank you for your order
          </p>
        </div>

        <div className="mt-12">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 font-semibold text-sm">
                Customer: {q.get("nama")}
              </p>
              <p className="text-gray-500 font-semibold text-sm">
                Payment Method: {q.get("payment")}
              </p>
            </div>
            <p className="text-gray-500 font-semibold text-sm">
              {getFormattedDate()}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold">Ordered Items:</h2>
          <ul className="mt-4">
            {data.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span className="font-semibold text-gray-500">{item.nama}</span>
                <span className="font-semibold text-gray-950">
                  {item.qty} x {rupiahFormat(item.harga)}
                </span>
              </li>
            ))}
          </ul>

          <hr className="my-4" />

          <div className="mt-4 text-right">
            <p className="text-lg font-semibold">Total Items: {totalItem}</p>
            <p className="text-lg font-semibold">
              Subtotal: {rupiahFormat(subtotal)}
            </p>
          </div>
        </div>

        <div className="flex justify-between text-center mt-5">
          <button
            onClick={() => handleToHome()}
            className="bg-[#00D39B] flex text-white px-2 py-2 rounded-md font-semibold"
          >
            <ChevronLeft className="size-5 mr-1" />
            <span>Back to Home</span>
          </button>
          <button className="bg-[#003fd3] flex text-white px-4 py-2 rounded-md font-semibold">
            <Printer className="mr-3" />
            Print
          </button>
        </div>
      </div>
    </section>
  );
}
