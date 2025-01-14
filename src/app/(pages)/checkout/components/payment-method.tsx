import { Banknote, Coins, CreditCard } from "lucide-react";
import { FormProps } from "./order-summary";
import { Input } from "@/components/ui/input";
import { formatNumber, parseNumber } from "@/lib/utils";

interface PaymentMethodProps {
  form: FormProps;
  setForm: (form: FormProps) => void;
}

const PaymentMethod = ({ form, setForm }: PaymentMethodProps) => {
  return (
    <div className="w-[50%]">
      <p className="text-gray-500 font-semibold text-sm">Payment method</p>
      <div className="grid grid-cols-3 gap-x-3 mt-1">
        <button
          onClick={() => setForm({ ...form, payment: "cash" })}
          className={`flex justify-center items-center gap-x-2 py-2 px-3 rounded-lg hover:bg-sky-800 hover:text-white duration-300 ease-in shadow-md ${
            form.payment === "cash"
              ? "bg-sky-800 text-white"
              : "bg-slate-100 text-slate-950"
          }`}
        >
          <Banknote size={20} />
          <span>CASH</span>
        </button>
        <button
          onClick={() => setForm({ ...form, payment: "bank" })}
          className={`flex justify-center items-center gap-x-2 py-2 px-3 rounded-lg hover:bg-sky-800 hover:text-white duration-300 ease-in shadow-md ${
            form.payment === "bank"
              ? "bg-sky-800 text-white"
              : "bg-slate-100 text-slate-950"
          }`}
        >
          <CreditCard size={20} />
          <span>Bank</span>
        </button>
        <button
          onClick={() => setForm({ ...form, payment: "piutang" })}
          className={`flex justify-center items-center gap-x-2 py-2 px-3 rounded-lg hover:bg-sky-800 hover:text-white duration-300 ease-in shadow-md ${
            form.payment === "piutang"
              ? "bg-sky-800 text-white"
              : "bg-slate-100 text-slate-950"
          }`}
        >
          <Coins size={20} />
          <span>Piutang</span>
        </button>
      </div>

      {form.payment === "cash" && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Cash Amount
          </label>
          <Input
            type="text"
            className="mt-1 block w-full rounded-md text-black border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
            placeholder="Enter cash amount..."
            value={formatNumber(form.cashAmount)}
            onChange={(e) =>
              setForm({ ...form, cashAmount: parseNumber(e.target.value) })
            }
          />
        </div>
      )}
    </div>
  );
};

export default PaymentMethod;
