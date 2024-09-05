import CardProduct from "./components/card-product";
import CategoryList from "./components/category-list";

export default function Home() {
  return (
    <main className="flex flex-col">
      <CategoryList />
      <CardProduct />
    </main>
  );
}
