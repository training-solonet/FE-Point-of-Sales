export default function LoadingOrder() {
  return (
    <div className="bg-white pb-6 px-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold">Order Summary</h1>
      <div className="animate-pulse">
        <ul className="my-5 space-y-4">
            <li className="flex justify-between">
                <span className="bg-gray-300 rounded-md w-32 h-6"></span>
                <span className="bg-gray-300 rounded-md w-40 h-6"></span>
            </li>
            <li className="flex justify-between">
                <span className="bg-gray-300 rounded-md w-40 h-6"></span>
                <span className="bg-gray-300 rounded-md w-32 h-6"></span>
            </li>
            <li className="flex justify-between">
                <span className="bg-gray-300 rounded-md w-36 h-6"></span>
                <span className="bg-gray-300 rounded-md w-36 h-6"></span>
            </li>
        </ul>
        <hr />
        <div className="mt-4 space-y-4">
          <div className="flex justify-between">
            <span className="bg-gray-300 rounded-md w-28 h-6"></span>
            <span className="bg-gray-300 rounded-md w-40 h-6"></span>
          </div>
          <div className="flex justify-between">
            <span className="bg-gray-300 rounded-md w-32 h-6"></span>
            <span className="bg-gray-300 rounded-md w-32 h-6"></span>
          </div>
          <div className="flex justify-between">
            <span className="bg-gray-300 rounded-md w-24 h-6"></span>
            <span className="bg-gray-300 rounded-md w-44 h-6"></span>
          </div>
        </div>
        <hr className="my-4" />
        <div className="mt-4 flex justify-between">
          <span className="bg-gray-300 rounded-md w-32 h-6"></span>
        </div>
        <div className="mt-4 flex justify-between">
          <span className="bg-gray-300 rounded-md w-20 h-6"></span>
          <span className="bg-gray-300 rounded-md w-44 h-6"></span>
        </div>
        <div className="mt-4 flex justify-between">
          <div className="flex gap-x-4">
            <span className="bg-gray-300 rounded-md w-32 h-8"></span>
            <span className="bg-gray-300 rounded-md w-32 h-8"></span>
            <span className="bg-gray-300 rounded-md w-32 h-8"></span>
          </div>
            <span className="bg-gray-300 rounded-md w-40 h-8"></span>
        </div>
      </div>
    </div>
  );
}
