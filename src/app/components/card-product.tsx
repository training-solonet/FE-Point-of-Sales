"use client";
import { isUPC, rupiahFormat } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { CartItem, addToCart, deleteById } from "../redux/cartSlice";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getProductByCategory } from "../lib/data";
import SkeletonLoader from "./skeleton-loader";
import { Plus, Trash } from "lucide-react";
import store from "../redux/store";
import { RootStateCart } from "./cart-transaction";
import { useToast } from "@/hooks/useToast";
import Swal from "sweetalert2";

export interface ProductType {
  id: number;
  nama: string;
  kategori: string;
  gambar: string;
  harga: number;
  qty: number;
  stok: number;
  upc: string;
}

export type RootStateCategory = ReturnType<typeof store.getState>;

export default function CardProduct({
  searchValue,
  setSearchValue,
  focusInput,
}: {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  focusInput: () => void;
}) {
  const dispatch = useDispatch();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUPCProcessed, setIsUPCProcessed] = useState(false);
  const selectedCategory = useSelector(
    (state: RootStateCategory) => state.category.data
  );
  const cartItems: CartItem[] = useSelector(
    (state: RootStateCart) => state.cart.data
  );
  const { showToast } = useToast();

  const handleAddToCart = (product: number) => {
    const productData = products.find((item) => item.id === product);
    if (productData) {
      dispatch(
        addToCart({
          id: product,
          qty: 1,
          nama: productData.nama,
          gambar: "https://via.placeholder.com/300x300?text=Image+Product+1:1",
          harga: productData.harga,
          stok: productData.stok,
          upc: productData.upc,
        })
      );
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isUPC(searchValue)) {
        setIsUPCProcessed(true);
        getProductByCategory({
          id: selectedCategory.kategori,
          nama: "",
          upc: searchValue,
        })
          .then((res) => {
            const product = res?.[0];
            if (product) {
              const cartItem = cartItems.find((item) => item.id === product.id);
              const availableStock = product.stok;
              const currentQty = cartItem?.qty || 0;

              if (currentQty < availableStock) {
                dispatch(
                  addToCart({
                    id: product.id,
                    qty: 1,
                    nama: product.nama,
                    gambar:
                      "https://via.placeholder.com/300x300?text=Image+Product+1:1",
                    harga: product.harga,
                    stok: product.stok,
                    upc: product.upc,
                  })
                );
                showToast(
                  "success",
                  "Product added to cart",
                  `${product.nama} - ${rupiahFormat(product.harga)}`
                );
              } else {
                Swal.fire({
                  title: "Stock is limited!",
                  text: `Only ${availableStock} items available.`,
                  icon: "warning",
                  confirmButtonText: "OK",
                });
              }
            } else {
              showToast("error", "Product not found", "UPC not found");
            }
            setSearchValue("");
            focusInput();
          })
          .catch((error) => {
            console.error("Failed to fetch product by UPC", error);
            Swal.fire({
              title: "Error",
              text: "Failed to fetch product data.",
              icon: "error",
              confirmButtonText: "OK",
            });
          })
          .finally(() => {
            setIsLoading(false);
            setIsUPCProcessed(false);
          });
      } else if (!isUPCProcessed) {
        setIsLoading(true);
        getProductByCategory({
          id: selectedCategory.kategori,
          nama: searchValue,
          upc: "",
        })
          .then((res) => {
            setProducts(res || []);
          })
          .catch((error) => {
            console.error("Failed to fetch products", error);
            setProducts([]);
            Swal.fire({
              title: "Error",
              text: "Failed to fetch product data.",
              icon: "error",
              confirmButtonText: "OK",
            });
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    }, 500);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, selectedCategory]);

  return (
    <>
      <h1 className="text-lg text-black font-semibold mt-8 w-full">Products</h1>

      <p className="text-xs font-semibold text-slate-800 mb-4">
        {isLoading
          ? "Loading product data..."
          : `Displaying ${products.length} product${
              products.length > 1 ? "s" : ""
            }.`}
      </p>

      {!isLoading && products.length === 0 && (
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

      {isLoading && isUPCProcessed ? (
        <SkeletonLoader.CardProduct />
      ) : (
        <div className="grid md:grid-cols-3 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-0 lg:mb-16 xl:mb-0 w-[95%]">
          {products.map((data: ProductType) => (
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
                <h1 className="lg:text-xs md:text-[10px] text-black font-semibold">
                  {data.nama.length > 35
                    ? `${data.nama.substring(0, 35)}...`
                    : data.nama}
                </h1>
                <p className="text-[9px] text-black">{data.kategori}</p>
                <p className="text-[10.5px] font-semibold text-black">
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
      )}
    </>
  );
}
