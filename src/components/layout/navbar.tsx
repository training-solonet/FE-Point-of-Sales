"use client";

import { Home, Menu, Package2, ReceiptText, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="min-h-screen bg-fixed w-12 group fixed lg:block hidden">
        <div className="flex flex-col top-0 gap-y-5 pt-3 pl-3 w-full min-h-screen bg-black text-white absolute z-50">
          <Link href="/" className="mb-4">
            <Menu />
          </Link>
          <Link href="/">
            <Home />
          </Link>
          <Link href="/">
            <ReceiptText />
          </Link>
          <Link href="/">
            <Package2 />
          </Link>
        </div>

        <div className="absolute lg:flex top-0 left-12 hidden flex-col gap-y-5 pt-[14px] min-h-screen bg-black w-40 text-white transition-transform duration-300 transform -translate-x-full group-hover:translate-x-0">
          <div className="font-medium mb-4">
            <p>Menu</p>
          </div>
          <Link href="/" className="font-medium">
            <p>Home</p>
          </Link>
          <Link href="/" className="font-medium">
            <p>Transaksi</p>
          </Link>
          <Link href="/" className="font-medium">
            <p>Produk</p>
          </Link>
        </div>
      </div>

      <div className="hidden md:block lg:hidden w-full bottom-0 fixed bg-black">
        <div className="w-full h-12 flex justify-between items-center px-8">
          <p className="text-white font-medium text-sm">Point of Sales</p>
          <div className="flex gap-x-8 justify-center items-center text-white">
            <Link href="/" className="flex">
              <Home /> <p className="ml-2">Home</p>
            </Link>
            <Link href="/" className="flex">
              <ReceiptText /> <p className="ml-2">Transaksi</p>
            </Link>
            <Link href="/" className="flex">
              <Package2 /> <p className="ml-2">Produk</p>
            </Link>
          </div>
        </div>
      </div>

      <div className="block sm:hidden w-full px-4 py-3 bg-black text-white">
        <div className="flex justify-between items-center">
          <p className="font-medium text-sm">Point of Sales</p>
          <Menu onClick={toggleSidebar} />

          {isOpen && (
            <>
              <div
                className="bg-black h-screen bg-opacity-25 fixed inset-0 w-full"
                onClick={toggleSidebar}
              />
            </>
          )}

          <div
            className={`absolute sm:hidden top-0 right-0 pt-3 min-h-screen bg-black w-[70%] text-white transition-transform duration-300 transform ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex flex-col gap-y-5 w-[90%] mx-auto">
                <div className="flex justify-between items-center">
                    <h1 className="font-semibold text-lg">Menu</h1>
                    <X onClick={toggleSidebar} className="size-4" />
                </div>
                <Link href="/" className="flex font-semibold text-sm items-center">
                    <Home /> <p className="ml-2">Home</p>
                </Link>
                <Link href="/" className="flex font-semibold text-sm items-center">
                    <ReceiptText /> <p className="ml-2">Transaksi</p>
                </Link>
                <Link href="/" className="flex font-semibold text-sm items-center">
                    <Package2 /> <p className="ml-2">Produk</p>
                </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
