"use client";

import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, Printer as PrinterIcon } from "lucide-react";
import { getFormattedDate, rupiahFormat } from "@/lib/utils";
import { RootStateCart } from "@/app/components/cart-transaction";
import { clear } from "@/app/redux/cartSlice";
import { ProductType } from "@/app/components/card-product";
import PrintContent from "./components/content-print";

export default function OrderSuccess() {
  const [data, setData] = useState<ProductType[]>([]);
  const [currentDate, setCurrentDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const cartItemsRedux = useSelector((state: RootStateCart) => state.cart.data);
  const q = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); 
      const cartItemsString = localStorage.getItem("CART_ITEMS");
      const cartItems = cartItemsString ? JSON.parse(cartItemsString) : [];

      if (cartItems.length === 0) {
        router.push("/");
      }

      const productCheckout = cartItems.map((cartItem: ProductType) => ({
        ...cartItem,
        qty: cartItem.qty || 0,
      }));

      setData(productCheckout);
      setCurrentDate(getFormattedDate());
      setIsLoading(false);
    };

    fetchData();
  }, [cartItemsRedux, router]);

  const totalItem = data.reduce((acc, item) => acc + item.qty, 0);
  const subtotal = data.reduce((acc, item) => acc + item.harga * item.qty, 0);

  const handleToHome = () => {
    dispatch(clear());
    router.push("/");
  };

  const handlePrint = () => {
    if (printRef.current) {
      const printContents = printRef.current.innerHTML;
      const originalContents = document.body.innerHTML;
  
      document.body.innerHTML = printContents;
  
      const afterPrintHandler = () => {
        document.body.innerHTML = originalContents;
        window.removeEventListener("afterprint", afterPrintHandler);
        window.location.reload();
      };
  
      window.addEventListener("afterprint", afterPrintHandler);
  
      setTimeout(() => {
        window.print();
      }, 500);
    }
  };
    

  const customerName = q?.get("nama") || "Guest";
  const paymentMethod = q?.get("payment") || "Unknown";

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg font-medium">Loading...</p>
      </div>
    );
  }

  return (
    <section className="my-3 flex justify-center">
      <div className="xl:w-[50%] md:w-[80%] bg-white rounded-2xl p-8 shadow-2xl">
        <div>
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
                  Customer: {customerName}
                </p>
                <p className="text-gray-500 font-semibold text-sm">
                  Payment Method: {paymentMethod}
                </p>
              </div>
              <p className="text-gray-500 font-semibold text-sm">
                {currentDate}
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
        </div>

        <div className="flex justify-between text-center mt-5">
          <button
            onClick={() => handleToHome()}
            className="bg-[#00D39B] flex text-white px-2 py-2 rounded-md font-semibold"
          >
            <ChevronLeft className="size-5 mr-1" />
            <span>Back to Home</span>
          </button>
          <button
            onClick={() => handlePrint()}
            className={`${
              data.length === 0 ? "bg-gray-300" : "bg-[#003fd3]"
            } flex items-center text-white px-4 py-2 rounded-md font-semibold`}
          >
            <PrinterIcon className="mr-3" />
            <p className="text-sm">Print</p>
          </button>
        </div>

        <div ref={printRef} className="hidden">
          <PrintContent
            customer={customerName}
            orderId={"#152"}
            payment={paymentMethod}
            product={data}
          />
        </div>
      </div>
    </section>
  );
}
