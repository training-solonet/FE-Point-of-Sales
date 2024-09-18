import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { getCustomer } from "../lib/data";

interface CustomerType {
  id: number;
  nama: string;
  no_hp: string;
}

interface CustomerSearchProps {
  form: { customer: string; };
  setForm: (form: any) => void;
}

const CustomerSearch = ({ form, setForm }: CustomerSearchProps) => {
  const [customer, setCustomer] = useState<CustomerType[]>([]);

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLocaleLowerCase();
    setForm({ ...form, customer: value });

    if (value) {
      setTimeout(async () => {
        const cust = await getCustomer(value);
        setCustomer(cust);
      }, 200);
    } else {
      setCustomer([]);
    }
  };

  return (
    <div className="w-[45%]">
      <div className="flex justify-between items-center mb-1">
        <p className="text-gray-500 font-semibold text-sm">Customer Name</p>
        <div className="text-xs font-medium flex items-center gap-x-1" >
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
          <Search className="absolute top-1/2 -translate-y-1/2 left-2 size-5" />
        </div>

        {customer.length > 0 && (
          <div className="absolute top-12 w-full bg-white shadow-md rounded-lg">
            {customer.map((item: CustomerType, index: number) => (
              <div
                key={index}
                onClick={() => {
                  setForm({ ...form, customer: item.nama });
                  setCustomer([]);
                }}
                className="py-2 px-3 hover:bg-slate-200 duration-300 ease-linear cursor-pointer"
              >
                {item?.nama}
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default CustomerSearch;
