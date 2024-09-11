"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getAllProduct } from "../lib/data";
import { rupiahFormat } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { clear, decrement, deleteById, increment } from "../redux/cartSlice";
import { Trash2 } from "lucide-react";
import SkeletonLoader from "./skeleton-loader";
import { ProductType } from "./card-product";
import Image from "next/image";
import Swal from "sweetalert2";
import store from "../redux/store";

export type RootStateCart = ReturnType<typeof store.getState>;

export default function CartTransaction() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<ProductType[]>([]);
  const dispatch = useDispatch();

  const cartItems = useSelector((state: RootStateCart) => state.cart.data);

  const fetchData = async () => {
    const product = await getAllProduct();
    const cartItemsString = localStorage.getItem("CART_ITEMS");
    const cartItems = cartItemsString ? JSON.parse(cartItemsString) : [];

    if (product) {
      const productInCart = product
        .map((p: ProductType) => {
          const cartItem = cartItems.find(
            (item: ProductType) => item.id === p.id
          );
          return {
            ...p,
            qty: cartItem ? cartItem.qty : 0,
          };
        })
        .filter((item: ProductType) => item.qty > 0);

      setData(productInCart);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [cartItems]);

  const totalItem = data.reduce((acc, item) => acc + item.qty, 0);
  const subtotal = data.reduce((acc, item) => acc + item.harga * item.qty, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handleOrder = () => {
    const html = `
    <div class="text-slate-800 font-medium text-sm w-[60%] mx-auto">
          <div class="w-full flex justify-between items-center">
            <p>Total Item</p>
            <p class="font-semibold text-black">${totalItem} item</p>
          </div>
          <div class="w-full flex justify-between items-center">
            <p>Total Order</p>
            <p class="font-semibold text-black">${rupiahFormat(total)}</p>
          </div>
          <div class="w-full flex justify-between items-center">
            <p>Customer</p>
            <p class="font-semibold text-black">Kevin Andra</p>
          </div>
        </div>
    `;

    if (data === null) {
      Swal.fire({
        title: "Add items to cart first!",
        text: "Cart is empty. Please add items to cart before ordering.",
        icon: "warning",
        confirmButtonText: "OK",
      });
    }

    if (data.length > 0) {
      Swal.fire({
        title: "Order Confirmation",
        html,
        icon: "question",
        confirmButtonText: "Confirm",
        showCancelButton: true,
        cancelButtonText: "Cancel"
      }).then((res) => {
        if (res.isConfirmed) {
          dispatch(clear())
          Swal.fire({
            title: "Order Success",
            text: "Your order has been successfully placed.",
            icon: "success",
            confirmButtonText: "OK",
          });
        }
      });
    }
  };

  return (
    <div
      className="w-[300px] shadow-2xl bg-white fixed right-0 top-0 h-full overflow-y-auto"
      style={{ scrollbarWidth: "none" }}
    >
      <div className="pt-8 px-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Order Items {totalItem ? `(${totalItem})` : ""}</h2>
          {data.length > 0 && (
            <p
              onClick={() => dispatch(clear())}
              className="text-sm font-medium text-red-500 cursor-pointer"
            >
              Clear
            </p>
          )}
        </div>

        <div className="h-[2px] w-full bg-slate-100 mb-4" />

        {data.length === 0 && !isLoading && (
          <div className="w-full flex flex-col justify-center items-center my-8">
            <Image
              width={80}
              height={80}
              className="size-auto"
              alt="empty"
              src={
                "https://static.vecteezy.com/system/resources/previews/005/006/007/non_2x/no-item-in-the-shopping-cart-click-to-go-shopping-now-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg"
              }
            />
            <p className="text-sm font-medium text-slate-800">Cart is empty.</p>
          </div>
        )}

        <div className="w-full mx-auto">
          {isLoading ? <SkeletonLoader.CartCard /> : <Card data={data} />}
        </div>

        {data.length > 0 && !isLoading && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2 text-slate-600">
              Order Summary
            </h2>
            <div className="h-[2px] w-full bg-slate-100 mb-4" />
            <div className="w-full flex justify-between items-center text-xs">
              <p className="font-medium text-slate-800">Total items</p>
              <p className="text-semibold">{totalItem} item</p>
            </div>
            <div className="w-full flex justify-between items-center text-xs">
              <p className="font-medium text-slate-800">Subtotal</p>
              <p className="text-semibold">{rupiahFormat(subtotal)}</p>
            </div>
            <div className="w-full flex justify-between items-center text-xs">
              <p className="font-medium text-slate-800">Tax</p>
              <p className="text-semibold">10% - {rupiahFormat(tax)}</p>
            </div>
            <div className="w-full flex justify-between items-center text-xs">
              <p className="font-medium text-slate-800">Customer</p>
              <p className="text-semibold">Kevin Andra</p>
            </div>
            <div className="h-[2px] w-full bg-slate-100 my-4" />
            <div className="flex justify-between items-center">
              <h1 className="font-semibold text-slate-800">Total</h1>
              <h1 className="font-semibold">{rupiahFormat(total)}</h1>
            </div>
            <div className="my-4 w-full">
              <Button className="w-full py-2" onClick={() => handleOrder()}>
                Place Order
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Card({ data }: { data: ProductType[] }) {
  const dispatch = useDispatch();
  const incrementQty = (item: number) => {
    dispatch(increment(item));
  };

  const decrementQty = (item: number) => {
    dispatch(decrement(item));
  };

  return (
    <div
      className="w-full max-h-[20rem] xl:max-h-[12rem] overflow-y-auto"
      style={{ scrollbarWidth: "none" }}
    >
      {data.map((item: ProductType) => (
        <div key={item.id} className="flex gap-x-2 mb-4">
          <Image
            // src={item.gambar}
            src={"https://via.placeholder.com/300x300?text=Image+Product+1:1"}
            width={300}
            height={300}
            alt={item.nama}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div className="flex-grow py-1">
            <div className="flex justify-between">
              <h1 className="text-xs font-semibold">{item.nama.length > 20 ? `${item.nama.substring(0, 20)}...` : item.nama}</h1>
              <Trash2
                className="w-4 h-4 text-red-500 cursor-pointer"
                onClick={() => dispatch(deleteById(item.id))}
              />
            </div>
            <p className="text-[11px] font-medium text-slate-500">
              {rupiahFormat(item.harga)}
            </p>
            <div className="flex justify-between items-center mt-1">
              <p className="text-sm font-medium">x{item.qty}</p>
              <div className="flex gap-x-2 items-center">
                <div
                  onClick={() => decrementQty(item.id)}
                  className="w-5 h-5 bg-slate-300 rounded-md flex justify-center items-center cursor-pointer"
                >
                  -
                </div>
                <div className="text-xs font-medium">{item.qty}</div>
                <div
                  onClick={() => incrementQty(item.id)}
                  className="w-5 h-5 bg-black text-white rounded-md flex justify-center items-center cursor-pointer"
                >
                  +
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
