import { rupiahFormat } from "@/lib/utils";
import { getBestSeller } from "../lib/data";

export default async function CardProduct() {
  const bestSeller = await getBestSeller();
  const count = bestSeller.length;

  return (
    <>
      <h1 className="text-lg font-semibold mb-2 mt-8 w-full">
        Product {bestSeller ? "Best Seller" : ""} ({count})
      </h1>
      <div className="grid md:grid-cols-3 grid-cols-2 lg:grid-cols-5 gap-4 mt-2 w-full">
        {bestSeller.map((data: any) => (
          <div
            key={data.id}
            className="bg-white shadow-2xl h-full px-2 py-3 rounded-xl flex flex-col"
          >
            <img
              src={data.gambar}
              alt={data.nama}
              className="rounded-md h-32 w-full object-cover mb-2"
            />
            <div className="w-full px-2 flex-grow">
              <h1 className="text-xs font-semibold">{data.nama}</h1>
              <p className="text-[9px]">{data.kategori}</p>
            </div>
            <div className="w-full px-2 mt-3 flex justify-between items-center">
              <p className="text-slate-700 font-semibold text-xs">
                {rupiahFormat(data.harga)}
              </p>
              <p className="text-[9px] font-medium">{data.stok} items</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
