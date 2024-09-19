"use client";

import { Footnote, PageBottom, Tailwind } from "@onedoc/react-print";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, Printer } from "lucide-react";
import printJS from "print-js";
import { rupiahFormat } from "@/lib/utils";

interface ProductType {
  id: string;
  nama: string;
  harga: number;
  qty: number;
}

interface InvoicePrintProps {
  customerName: string;
  paymentMethod: string;
  date: string;
  items: ProductType[];
  totalItem: number;
  subtotal: number;
}

export default function OrderSuccess() {
  const [data, setData] = useState<ProductType[]>([]);
  const cartItemsRedux = useSelector((state: any) => state.cart.data);
  const q = useSearchParams();
  const router = useRouter();

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

  const InvoicePrint = ({
    customerName,
    paymentMethod,
    date,
    items,
    totalItem,
    subtotal,
  }: InvoicePrintProps) => {
    return (
      <Tailwind>
        <div id="print-invoice" className="p-6">
          <div className="mb-4">
            <h1 className="text-2xl font-bold">Invoice</h1>
            <p className="text-sm text-gray-500">Thank you for your purchase!</p>
          </div>
          <hr className="my-2" />

          <div className="flex justify-between mt-4">
            <div>
              <p className="font-semibold text-gray-700">
                Customer: {customerName}
              </p>
              <p className="font-semibold text-gray-700">
                Payment Method: {paymentMethod}
              </p>
            </div>
            <div>
              <p className="text-gray-700">{date}</p>
            </div>
          </div>

          <table className="w-full mt-6 table-auto border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left py-2">Item</th>
                <th className="text-left py-2">Quantity</th>
                <th className="text-left py-2">Price</th>
                <th className="text-left py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2">{item.nama}</td>
                  <td className="py-2">{item.qty}</td>
                  <td className="py-2">{rupiahFormat(item.harga)}</td>
                  <td className="py-2">
                    {rupiahFormat(item.harga * item.qty)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between mt-6">
            <p>Total Items: {totalItem}</p>
            <p className="font-bold">Subtotal: {rupiahFormat(subtotal)}</p>
          </div>

          <PageBottom className="mt-10">
            <Footnote>
              <p className="text-xs text-gray-500">
                This is a system-generated invoice.
              </p>
            </Footnote>
          </PageBottom>
        </div>
      </Tailwind>
    );
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
            onClick={() => router.push("/")}
            className="bg-[#00D39B] flex text-white px-2 py-2 rounded-md font-semibold"
          >
            <ChevronLeft className="size-5 mr-1" />
            <span>Back to Home</span>
          </button>
          <button
            onClick={() => printJS({ printable: "print", type: "html" })}
            className="bg-[#003fd3] flex text-white px-4 py-2 rounded-md font-semibold"
          >
            <Printer className="mr-3" />
            Print
          </button>
        </div>
      </div>

      <div className="hidden">
        <div id="print">
          <InvoicePrint
            customerName={q.get("nama") || ""}
            paymentMethod={q.get("payment") || ""}
            date={getFormattedDate()}
            items={data}
            totalItem={totalItem}
            subtotal={subtotal}
          />
        </div>
      </div>
    </section>
  );
}
