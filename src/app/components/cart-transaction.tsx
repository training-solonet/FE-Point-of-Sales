"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getAllProduct } from "../lib/data";
import { rupiahFormat } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { clear, decrement, deleteById, increment } from "../redux/cartSlice";
import { Trash2 } from "lucide-react";
import SkeletonLoader from "./skeleton-loader";

export default function CartTransaction() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  const dispatch = useDispatch()

  const fetchData = async () => {
    setIsLoading(true);

    const product = await getAllProduct();
    const cartItemsString = localStorage.getItem("CART_ITEMS");
    const cartItems = cartItemsString ? JSON.parse(cartItemsString) : [];

    if (Array.isArray(product)) {
      const productInCart = product.map((p: any) => {
        const cartItem = cartItems.find((item: any) => item.id === p.id);
        return {
          ...p,
          qty: cartItem ? cartItem.qty : 0,
        };
      }).filter((item) => item.qty > 0);

      setData(productInCart);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(data);

  return (
    <div className="w-[300px] shadow-2xl bg-white fixed right-0 top-0 h-full overflow-y-auto">
      <div className="pt-8 px-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">
            Order Items
          </h2>
          {data.length > 0 && (
            <p onClick={() => dispatch(clear())} className="text-sm font-medium text-red-500 cursor-pointer">Clear</p>
          )}
        </div>
        <div className="h-[2px] w-full bg-slate-100 mb-4" />

        {data.length === 0 && !isLoading && (
          <div className="w-full flex justify-center items-center my-8">
            <p className="text-sm font-medium text-slate-800">Cart is empty.</p>
          </div>
        )}

        <div className="w-full mx-auto">
          {isLoading ? (
            <SkeletonLoader.CartCard />
          ) : (
            <Card data={data} />
          )}
        </div>

        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2 text-slate-600">
            Order Summary
          </h2>
          <div className="h-[2px] w-full bg-slate-100 mb-4" />
          <div className="w-full flex justify-between items-center text-xs">
            <p className="font-medium text-slate-800">Total items</p>
            <p className="text-semibold">0</p>
          </div>
          <div className="w-full flex justify-between items-center text-xs">
            <p className="font-medium text-slate-800">Subtotal</p>
            <p className="text-semibold">0</p>
          </div>
          <div className="w-full flex justify-between items-center text-xs">
            <p className="font-medium text-slate-800">Tax</p>
            <p className="text-semibold">10% - Coming Soon</p>
          </div>
          <div className="h-[2px] w-full bg-slate-100 my-4" />
          <div className="flex justify-between items-center">
            <h1 className="font-semibold text-slate-800">Total</h1>
            <h1 className="font-semibold">Coming Soon</h1>
          </div>
          <div className="my-4 w-full">
            <Button className="w-full py-2">Place Order</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ data }: { data: any }) {
  const dispatch = useDispatch()
  const incrementQty = (item: any) => {
    dispatch(increment(item.id));
  }

  const decrementQty = (item: any) => {
    dispatch(decrement(item.id));
  }

  return (
    <>
      {data.map((item: any) => (
        <div key={item.id} className="flex gap-x-2 mb-4">
          <img
            src={item.gambar}
            alt={item.nama}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div className="flex-grow py-1">
            <div className="flex justify-between">
              <h1 className="text-sm font-semibold">{item.nama}</h1>
              <Trash2 className="w-4 h-4 text-red-500" onClick={() => dispatch(deleteById(item.id))} />
            </div>
            <p className="text-xs font-medium text-slate-500">{rupiahFormat(item.harga)}</p>
            <div className="flex justify-between items-center mt-1">
              <p className="text-sm font-medium">x{item.qty}</p>
              <div className="flex gap-x-2 items-center">
                <div onClick={() => decrementQty(item)} className="w-5 h-5 bg-slate-300 rounded-md flex justify-center items-center cursor-pointer">
                  -
                </div>
                <div className="text-xs font-medium">{item.qty}</div>
                <div onClick={() => incrementQty(item)} className="w-5 h-5 bg-black text-white rounded-md flex justify-center items-center cursor-pointer">
                  +
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
