"use client";

import { rupiahFormat } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteById } from "../redux/cartSlice";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getBestSeller, getProductByCategory } from "../lib/data";
import SkeletonLoader from "./skeleton-loader";
import { Plus, Trash } from "lucide-react";
import store from "../redux/store";
import { RootStateCart } from "./cart-transaction";

export interface ProductType {
  id: number;
  nama: string;
  kategori: string;
  gambar: string;
  harga: number;
  qty: number;
  stok: number;
}

export type RootStateCategory = ReturnType<typeof store.getState>;

export default function CardProduct({ searchValue }: { searchValue: string }) {
  const dispatch = useDispatch();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const selectedCategory = useSelector(
    (state: RootStateCategory) => state.category.data
  );
  const cartItems = useSelector((state: RootStateCart) => state.cart.data);
  console.log(cartItems);

  const handleAddToCart = (product: number) => {
    dispatch(
      addToCart({
        id: product,
        qty: 1,
        nama: products.find((item) => item.id === product)?.nama || "",
        gambar: "https://via.placeholder.com/300x300?text=Image+Product+1:1",
        harga: products.find((item) => item.id === product)?.harga || 0,
        stok: products.find((item) => item.id === product)?.stok || 0,
      })
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedCategory && selectedCategory.kategori > 0) {
          const res = await getProductByCategory({
            id: selectedCategory.kategori,
          });
          setProducts(res || []);
        } else {
          const res = await getBestSeller();
          setProducts(res || []);
        }
      } catch (error) {
        console.error("Failed to fetch products", error);
        setProducts([]);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [selectedCategory]);

  const filteredProduct =
    searchValue.length < 3
      ? products
      : products.filter((item: ProductType) =>
          item.nama.toLowerCase().includes(searchValue.toLowerCase())
        );

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
          Showing {filteredProduct.length} product
          {filteredProduct.length > 1 && "s"}.
        </p>
      )}

      {!isLoading && filteredProduct.length === 0 && (
        <div className="mt-8 mx-auto">
          <Image
            src="https://cdni.iconscout.com/illustration/premium/thumb/sorry-item-not-found-illustration-download-in-svg-png-gif-file-formats--available-product-tokostore-pack-e-commerce-shopping-illustrations-2809510.png?f=webp"
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
        {filteredProduct.map((data: ProductType) => (
          <div
            key={data.id}
            className="bg-white shadow-2xl relative h-full px-2 py-3 rounded-xl flex flex-col"
          >
            <div>
              <Image
                src="https://via.placeholder.com/300x300?text=Image+Product+1:1"
                width={300}
                height={300}
                alt={data.nama}
                className="rounded-md lg:h-32 md:h-24 w-full object-cover mb-2"
              />
              {cartItems.find((item) => item.id === data.id) && (
                <p className="absolute top-5 right-4 text-xs font-semibold text-white rounded-full bg-black size-6 flex justify-center items-center">
                  {cartItems.find((item) => item.id === data.id)?.qty}
                </p>
              )}
            </div>
            <div className="px-2 flex-grow w-full">
              <h1 className="lg:text-xs md:text-[10px] font-semibold">
                {data.nama.length > 35
                  ? `${data.nama.substring(0, 35)}...`
                  : data.nama}
              </h1>
              <p className="text-[9px]">{data.kategori}</p>
              <p className="text-[10.5px] font-semibold">
                {data.stok ? data.stok + " in stock" : "Out of stock!"}
              </p>
            </div>
            <div className="w-full px-2 mt-1 flex flex-row justify-between items-end">
              <p className="text-slate-700 font-semibold text-xs">
                {rupiahFormat(data.harga)}
              </p>
              {data.stok > 0 &&
                (cartItems.find((item) => item.id === data.id) ? (
                  <Trash
                    onClick={() => dispatch(deleteById(data.id))}
                    className="size-7 text-white bg-black rounded-2xl p-[6px] cursor-pointer"
                  />
                ) : (
                  <Plus
                    onClick={() => handleAddToCart(data.id)}
                    className="size-7 text-white bg-black rounded-2xl p-[6px] cursor-pointer"
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
