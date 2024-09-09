import { useEffect, useState } from "react";
import { getCategory } from "../lib/data";
import SkeletonLoader from "./skeleton-loader";

export default function CategoryList() {
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await getCategory();
        setCategories(res || []);
      } catch (error) {
        console.error("Failed to fetch categories", error);
        setCategories([]);
      } 
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="mt-5">
      <h1 className="text-lg font-semibold mb-2">Categories</h1>
      {isLoading ? (
        <SkeletonLoader.Category />
      ) : categories.length > 0 && (
        <div className="flex space-x-2 md:space-x-4 flex-nowrap items-center scrollbar-none overflow-auto">
          <div className="flex-shrink-0 min-w-auto text-xs sm:text-sm lg:text-xs font-semibold px-4 py-1 md:px-5 md:py-2 lg:px-5 lg:py- bg-transparent border-[2px] border-black hover:bg-black hover:text-white duration-200 ease-linear rounded-3xl cursor-pointer">
            All
          </div>
          {categories.map((category: any) => (
            <div
              key={category.id}
              className="flex-shrink-0 min-w-auto text-xs sm:text-sm lg:text-xs font-semibold px-4 py-1 md:px-5 md:py-2 lg:px-5 lg:py- bg-transparent border-[2px] border-black hover:bg-black hover:text-white duration-200 ease-linear rounded-3xl cursor-pointer"
            >
              {category.nama}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
