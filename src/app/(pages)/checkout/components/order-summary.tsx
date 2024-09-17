import { ProductType } from "@/app/components/card-product";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { rupiahFormat } from "@/lib/utils";
import { Banknote, CreditCard, QrCode } from "lucide-react";
import { useState } from "react";
import { SubmitOrder } from "../lib/action";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
  

interface OrderSummaryProps {
  product: ProductType[];
}

export default function OrderSummary({ product }: OrderSummaryProps) {
  const { push } = useRouter()
  const [form, setForm] = useState({
    payment: "cash",
    customer: "Elgiva Rasyad Aditya Putra",
    isLoading: false,
  })
  const subTotal = product.reduce(
    (acc, item) => acc + item.harga * item.qty,
    0
  );
  const tax = subTotal * 0.1; 
  const totalAmount = subTotal + tax;

  const handleCheckout = async () => {
    const orderData = {
      customer_name: form.customer,
      products: product.map((item: ProductType) => ({
        barang_id: item.id,
        qty: item.qty,
      })),
      payment_method: form.payment,
    };

    setForm({ ...form, isLoading: true });
    console.log(orderData);

    try {
      await SubmitOrder(orderData);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Transaction success",
        showConfirmButton: true,
      })
      setForm({ ...form, isLoading: false });
      push('/detail-order');
    } catch (err) {
      console.log(err);
      setForm({ ...form, isLoading: false });
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Transaction failed",
        showConfirmButton: true
      })
    }
  }

  return (
    <div className="bg-white pb-6 px-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold">Order Summary</h1>
      <ul className="my-5">
        {product.map((item: ProductType, index: number) => (
          <li key={index} className="flex justify-between">
            <span className="font-semibold text-gray-500">{item.nama}</span>
            <span className="text-black font-semibold">
              {item.qty} x {rupiahFormat(item.harga * item.qty)}
            </span>
          </li>
        ))}
      </ul>
      <hr />
      <div className="mt-4">
        <div className="flex justify-between">
          <span className="text-gray-500 font-semibold">Total items</span>
          <span className="text-block font-semibold">
            {product.length} variants of items
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-semibold">Subtotal</span>
          <span className="text-block font-semibold">
            {rupiahFormat(subTotal)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-semibold">Tax</span>
          <span className="text-block font-semibold">
            10% - {rupiahFormat(tax)}
          </span>
        </div>
        <hr className="my-4" />
        <h1 className="text-lg font-semibold">Payment and Customer Details</h1>
        <div className="flex justify-between mt-3 mb-5">
          <div className="w-[60%]">
            <p className="text-gray-500 font-semibold">Payment method</p>
            <div className="grid grid-cols-3 gap-x-3 mt-1">
              <button onClick={() => setForm({ ...form, payment: "cash" })} className={`flex justify-center items-center gap-x-2 py-2 px-3 rounded-lg hover:bg-sky-800 hover:text-white duration-300 ease-in shadow-md ${form.payment === "cash" ? "bg-sky-800 text-white" : "bg-slate-100 text-slate-950"}`}>
                <Banknote size={20} />
                <span>CASH</span>
              </button>
              <button onClick={() => setForm({ ...form, payment: "qris" })} className={`flex justify-center items-center gap-x-2 py-2 px-3 rounded-lg hover:bg-sky-800 hover:text-white duration-300 ease-in shadow-md ${form.payment === "qris" ? "bg-sky-800 text-white" : "bg-slate-100 text-slate-950"}`}>
                <QrCode size={20} />
                <span>QRIS</span>
              </button>
              <button onClick={() => setForm({ ...form, payment: "bank" })} className={`flex justify-center items-center gap-x-2 py-2 px-3 rounded-lg hover:bg-sky-800 hover:text-white duration-300 ease-in shadow-md ${form.payment === "bank" ? "bg-sky-800 text-white" : "bg-slate-100 text-slate-950"}`}>
                <CreditCard size={20} />
                <span>Bank</span>
              </button>
            </div>
          </div>
          <div className="w-[35%]">
            <p className="text-gray-500 font-semibold mb-1">Customer Name</p>
            <Select value={form.customer} onValueChange={(value) => setForm({ ...form, customer: value })}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Find Customer..." className="w-full" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Elgiva Rasyad Aditya Putra">Elgiva Rasyad Aditya Putra</SelectItem>
                <SelectItem value="Miss Agnes Pfeffer">Miss Agnes Pfeffer</SelectItem>
                <SelectItem value="Theodore Stehr">Theodore Stehr</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <hr />
      <div className="mt-2 flex justify-between text-black font-bold text-xl">
        <span>Total</span>
        <span>{rupiahFormat(totalAmount)}</span>
      </div>
      <div className="mt-8 text-right" onClick={() => handleCheckout()}>
        <Button className="w-[35%] py-2 bg-gray-700">
          {form.isLoading === true ? "Loading..." : "Checkout"}
        </Button>
      </div>
    </div>
  );
}
