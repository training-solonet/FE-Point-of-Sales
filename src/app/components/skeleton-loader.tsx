import React from "react";

const CardProductSkeleton: React.FC = () => (
  <div className="grid md:grid-cols-3 grid-cols-2 lg:grid-cols-4 gap-4 mb-0 lg:mb-16 xl:mb-0 w-full">
    {Array.from({ length: 8 }).map((_, index) => (
      <div
        key={index}
        className="bg-gray-200 shadow-md h-full px-2 py-3 rounded-xl flex flex-col animate-pulse"
      >
        <div className="h-32 w-full bg-gray-300 rounded-md mb-2" />
        <div className="flex-grow w-full px-2">
          <div className="h-4 bg-gray-300 rounded mb-1" />
          <div className="h-3 bg-gray-300 rounded" />
        </div>
        <div className="w-full px-2 mt-3 flex flex-row justify-between">
          <div className="h-4 bg-gray-300 rounded w-1/2" />
          <div className="h-3 bg-gray-300 rounded w-1/4" />
        </div>
      </div>
    ))}
  </div>
)

const CartCardSkeleton: React.FC = () => (
  <div className="flex gap-x-2 mb-4 animate-pulse">
    <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
    <div className="flex-grow py-1">
      <div className="flex justify-between">
        <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
        <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
      </div>
      <div className="w-1/3 h-3 bg-gray-200 rounded mt-1"></div>
      <div className="flex justify-between items-center mt-1">
        <div className="w-12 h-4 bg-gray-200 rounded"></div>
        <div className="flex gap-x-2 items-center">
          <div className="w-5 h-5 bg-gray-300 rounded-md"></div>
          <div className="w-8 h-4 bg-gray-200 rounded"></div>
          <div className="w-5 h-5 bg-gray-200 rounded-md"></div>
        </div>
      </div>
    </div>
  </div>
)


const CategorySkeleton: React.FC = () => (
  <div className="flex space-x-2 md:space-x-4 flex-nowrap items-center">
    {Array.from({ length: 5 }).map((_, index) => (
      <div
        key={index}
        className="w-24 h-8 bg-gray-300 animate-pulse rounded-3xl"
      />
    ))}
  </div>
);

const SkeletonLoader = {
  CardProduct: CardProductSkeleton,
  CartCard: CartCardSkeleton,
  Category: CategorySkeleton,
}

export default SkeletonLoader
