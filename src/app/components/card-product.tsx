"use client";

import { rupiahFormat } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getBestSeller } from "../lib/data";
import SkeletonLoader from "./skeleton-loader";
import { ShoppingCart } from "lucide-react";

export interface ProductType {
  id: number;
  nama: string;
  kategori: string;
  gambar: string;
  harga: number;
  qty: number;
}

export default function CardProduct() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = (product: number) => {
    dispatch(
      addToCart({
        id: product,
        qty: 1,
      })
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await getBestSeller();
        setProducts(res || []);
      } catch (error) {
        console.error("Failed to fetch products", error);
        setProducts([]);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  console.log(products);

  return (
    <>
      <h1
        className={`text-lg font-semibold mt-8 w-full ${
          products.length === 0 && "mb-4"
        }`}
      >
        Products
      </h1>

      {!isLoading && products.length > 0 && (
        <p className="text-xs font-semibold text-slate-800 mb-4">
          Showing {products.length} product{products.length > 1 && "s"}.
        </p>
      )}

      {!isLoading && products.length === 0 && (
        <div className="mt-8 mx-auto">
          <Image
            src="https://cdni.iconscout.com/illustration/premium/thumb/sorry-item-not-found-illustration-download-in-svg-png-gif-file-formats--available-product-tokostore-pack-e-commerce-shopping-illustrations-2809510.png?f=webp"
            // priority={true}
            width={300}
            height={300}
            className="size-auto"
            alt="Product Not Found"
          />
          <p className="text-center text-sm font-semibold text-slate-800">
            Product Not Found.
          </p>
        </div>
      )}

      {isLoading && <SkeletonLoader.CardProduct />}

      <div className="grid md:grid-cols-3 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-0 lg:mb-16 xl:mb-0 w-[95%]">
        {products.map((data: ProductType) => (
          <div
            key={data.id}
            className="bg-white shadow-2xl h-full px-2 py-3 rounded-xl flex flex-col cursor-pointer"
          >
            <Image
              src="https://via.placeholder.com/300x300?text=Image+Product+1:1"
              width={300}
              height={300}
              alt={data.nama}
              className="rounded-md lg:h-32 md:h-24 w-full object-cover mb-2"
            />
            <div className="px-2 flex-grow w-full">
              <h1 className="lg:text-xs md:text-[10px] font-semibold">
                {data.nama}
              </h1>
              <p className="text-[9px]">{data.kategori}</p>
            </div>
            <div className="w-full px-2 mt-3 flex flex-row justify-between items-center">
              <p className="text-slate-700 font-semibold text-xs">
                {rupiahFormat(data.harga)}
              </p>
              {/* <p className="text-[9px] font-medium">{data.stok} items</p> */}
              <ShoppingCart
                onClick={() => handleAddToCart(data.id)}
                className="size-6 text-white bg-black rounded-2xl p-[6px]"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
