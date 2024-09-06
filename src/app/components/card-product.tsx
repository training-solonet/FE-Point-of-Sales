import { rupiahFormat } from "@/lib/utils";

export default async function CardProduct({ products }: {products: any}) {
  const count = products.length;

  return (
    <>
      <h1 className="text-lg font-semibold mb-2 mt-8 w-full">
        Products {products ? "Best Seller" : ""} ({count})
      </h1>
      <div className="grid md:grid-cols-3 grid-cols-2 lg:grid-cols-4 gap-4 mt-2 w-full">
        {products.map((data: any) => (
          <div
            key={data.id}
            className="bg-white shadow-2xl h-full px-2 py-3 rounded-xl flex flex-col"
          >
            <img
              // src={data.gambar}
              src="https://via.placeholder.com/300x300?text=Image+Product+1:1"
              alt={data.nama}
              className="rounded-md lg:h-32 md:h-24 w-full object-cover mb-2"
            />
            <div className="px-2 flex-grow w-full">
              <h1 className="lg:text-xs md:text-[10px] font-semibold">{data.nama}</h1>
              <p className="text-[9px]">{data.kategori}</p>
            </div>
            <div className="w-full px-2 mt-3 flex lg:flex-row md:flex-col lg:justify-between lg:items-center">
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