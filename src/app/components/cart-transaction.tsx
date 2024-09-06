import { Button } from "@/components/ui/button";

export default function CartTransaction() {
  return (
    <div className="w-[300px] shadow-2xl bg-white fixed right-0 top-0 h-full overflow-y-auto">
      <div className="pt-8 px-4">
        <h2 className="text-lg font-semibold mb-2">Order Items (1)</h2>
        <div className="h-[2px] w-full bg-slate-100 mb-4" />

        <div className="w-full">
          <Card />
        </div>

        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2 text-slate-600">
            Order Summary
          </h2>
          <div className="h-[2px] w-full bg-slate-100 mb-4" />
          <div className="w-full flex justify-between items-center text-xs">
            <p className="font-medium text-slate-800">Total items</p>
            <p className="text-semibold">2</p>
          </div>
          <div className="w-full flex justify-between items-center text-xs">
            <p className="font-medium text-slate-800">Subtotal</p>
            <p className="text-semibold">Rp 866.453,00</p>
          </div>
          <div className="w-full flex justify-between items-center text-xs">
            <p className="font-medium text-slate-800">Tax</p>
            <p className="text-semibold">10% - Rp 86.645,30</p>
          </div>
          <div className="h-[2px] w-full bg-slate-100 my-4" />
          <div className="flex justify-between items-center">
            <h1 className="font-semibold text-slate-800">Total</h1>
            <h1 className="font-semibold">Rp 1.061.098,30</h1>
          </div>
          <div className="my-4 w-full">
            <Button className="w-full py-2">Place Order</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card() {
  return (
    <div className="flex gap-x-2 mb-4">
      <img
        src="https://via.placeholder.com/100x100?text=Image+Product+1:1"
        alt="Product Image"
        className="w-16 h-16 rounded-lg object-cover"
      />
      <div className="flex-grow py-1">
        <h1 className="text-sm font-semibold">Tenda N301</h1>
        <p className="text-xs font-medium text-slate-500">Rp 366.453,00</p>
        <div className="flex justify-between items-center mt-1">
          <p className="text-sm font-medium">x2</p>
          <div className="flex gap-x-2 items-center">
            <div className="w-5 h-5 bg-slate-300 rounded-md flex justify-center items-center cursor-pointer">
              -
            </div>
            <div className="text-xs font-medium">2</div>
            <div className="w-5 h-5 bg-black text-white rounded-md flex justify-center items-center cursor-pointer">
              +
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
