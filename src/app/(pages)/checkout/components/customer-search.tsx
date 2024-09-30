import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Plus, Search, User } from "lucide-react";
import { getCustomer } from "../lib/data";
import { FormProps } from "./order-summary";

interface CustomerType {
  id: number;
  nama: string;
  no_hp: string;
}

interface CustomerSearchProps {
  form: FormProps;
  setForm: (form: FormProps) => void;
}

const CustomerSearch = ({ form, setForm }: CustomerSearchProps) => {
  const [customer, setCustomer] = useState<CustomerType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLocaleLowerCase();
    setIsLoading(true);
    setForm({ ...form, customer: value });

    if (value) {
      setTimeout(async () => {
        const cust = await getCustomer(value);
        setCustomer(cust);
        setIsLoading(false);
      }, 200);
    } else {
      setCustomer([]);
      setIsLoading(false)
    }
  };

  return (
    <div className="w-[45%]">
      <div className="flex justify-between items-center mb-1">
        <p className="text-gray-500 font-semibold text-sm">Customer Name</p>
        <div className="text-xs font-medium flex items-center gap-x-1 cursor-pointer" 
        onClick={() => setForm({ ...form, isNewCustomer: true, customer: "" })}
        >
            <Plus className="size-4" />
            <p className="text-xs font-medium">Add New</p>
        </div>
      </div>
      <form className="w-full relative">
        <div className="relative">
          <Input
            type="search"
            placeholder="Find Customer...."
            onChange={(e) => handleSearchChange(e)}
            value={form.customer}
            className="w-full h-full py-2 pl-9 pr-2.5 text-sm"
          />
          {form.customer !== "" ? (
            <User className="absolute top-1/2 -translate-y-1/2 left-2 size-5" />
          ) : (
            <Search className="absolute top-1/2 -translate-y-1/2 left-2 size-5" />
          )}
        </div>

        {customer.length > 0 && form.customer !== "" && !isLoading ? (
          <div className="absolute top-12 w-full bg-white shadow-md rounded-lg">
            {customer.map((item: CustomerType, index: number) => (
              <div
                key={index}
                onClick={() => {
                  setForm({ ...form, customer: item.nama });
                  setCustomer([]);
                }}
                className="py-2 px-3 hover:bg-slate-200 duration-300 ease-linear cursor-pointer text-sm"
              >
                {item?.nama}
              </div>
            ))}
          </div>
        ) : isLoading ? (
          <div className="absolute top-12 w-full bg-white shadow-md rounded-lg">
              <div
                className="py-2 px-3 hover:bg-slate-200 duration-300 ease-linear cursor-pointer text-sm"
              >
                Loading...
              </div>
          </div>
        ) : form.customer !== "" && !isLoading && customer.length > 0 && (
          <div className="absolute top-12 w-full bg-white shadow-md rounded-lg">
              <div
                className="py-2 px-3 hover:bg-slate-200 duration-300 ease-linear cursor-pointer text-sm"
              >
                No Customer Found. Please add new customer
              </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default CustomerSearch;
