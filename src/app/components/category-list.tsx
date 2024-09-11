import { useEffect, useState } from "react";
import { getCategory } from "../lib/data";
import SkeletonLoader from "./skeleton-loader";
import { useDispatch, useSelector } from "react-redux";
import { clearFilter, setFilterCategory } from "../redux/categorySlice";
import { RootStateCategory } from "./card-product";

export type CategoryType = {
  id: number;
  nama: string;
};

export default function CategoryList() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state: RootStateCategory) => state.category.data)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCategory();
        setCategories(res || {});
      } catch (error) {
        console.error("Failed to fetch categories", error);
        setCategories([]);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const handleCategoryClick = (category: CategoryType) => {
    dispatch(setFilterCategory(category.id));
  };

  return (
    <div className="mt-5 w-[95%]">
      {isLoading ? (
        <SkeletonLoader.Category />
      ) : (
        categories.length > 0 && (
          <div
            className="flex space-x-2 md:space-x-4 flex-nowrap items-center overflow-auto"
            style={{ scrollbarWidth: "none" }}
          >
            <div
              onClick={() => dispatch(clearFilter())}
              className={`${selectedCategory.kategori === 0 ? 'bg-black text-white' : 'bg-transparent'} border-black flex-shrink-0 min-w-auto text-xs sm:text-sm lg:text-xs font-semibold px-4 py-1 md:px-5 md:py-2 lg:px-5 lg:py- border-[2px] hover:bg-black hover:text-white duration-200 ease-linear rounded-3xl cursor-pointer`}
            >
              All
            </div>
            {categories.map((category: CategoryType) => (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category)}
                className={`${selectedCategory.kategori > 0 && selectedCategory.kategori === category.id ? 'bg-black text-white' : 'bg-transparent'} border-black flex-shrink-0 min-w-auto text-xs sm:text-sm lg:text-xs font-semibold px-4 py-1 md:px-5 md:py-2 lg:px-5 lg:py- border-[2px] hover:bg-black hover:text-white duration-200 ease-linear rounded-3xl cursor-pointer`}
              >
                {category.nama}
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}
