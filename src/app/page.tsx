import CardProduct from "./components/card-product";
import CartTransaction from "./components/cart-transaction";
import CategoryList from "./components/category-list";
import { getBestSeller, getCategory } from "./lib/data";

export default async function Home() {
  const categories = await getCategory() || [];
  const bestSeller = await getBestSeller() || [];

  return (
    <main className="flex">
      <div className="flex flex-col lg:w-[80%] md:w-[60%]">
        <CategoryList categories={categories} />
        <CardProduct products={bestSeller} />
      </div>
      <div className="hidden md:block md:w-1/4">
        <div className="fixed top-0 right-0 z-0 w-full md:w-1/4 lg:w-1/5 h-full">
          <CartTransaction />
        </div>
      </div>
    </main>
  );
}
