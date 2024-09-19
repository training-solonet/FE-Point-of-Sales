import { Input } from "@/components/ui/input";
import { House, Phone, SearchIcon, User } from "lucide-react";

interface NewCustomerType {
  id: number;
  nama: string;
  no_hp: string;
  alamat: string;
}

interface NewCustomerProps {
  form: { customer: string };
  setForm: (form: any) => void;
}

const FormNewCustomer = ({ form, setForm }: NewCustomerProps) => {
  return (
    <div className="w-full mt-3">
      <div className="flex items-center justify-between">
        <h1 className="text-gray-500 font-semibold text-sm">New Customer</h1>
        <div
          className="text-gray-950 font-medium text-xs flex gap-x-1 cursor-pointer"
          onClick={() => setForm({ ...form, isNewCustomer: false, customer: "", no_hp: "", alamat: "" })}
        >
          <SearchIcon className="size-4" />
          Search Customer
        </div>
      </div>
      <div className="flex items-center mt-2 w-full gap-x-4">
        <div className="space-y-1 w-full">
          <h2 className="text-gray-500 font-semibold text-xs">Full Name</h2>
          <div className="relative">
            <Input
              type="text"
              name="customer"
              placeholder="Full Name...."
              onChange={(e) => setForm({ ...form, customer: e.target.value })}
              autoComplete="off"
              className="w-full h-full py-2 pl-9 pr-2.5 text-sm"
            />
            <User className="absolute top-1/2 -translate-y-1/2 left-2 size-5" />
          </div>
        </div>
        <div className="space-y-1 w-full">
          <h2 className="text-gray-500 font-semibold text-xs">Phone</h2>
          <div className="relative">
            <Input
              type="number"
              name="phone"
              onChange={(e) => setForm({ ...form, no_hp: e.target.value })}
              placeholder="Customer phone...."
              autoComplete="off"
              className="w-full h-full py-2 pl-9 pr-2.5 text-sm"
            />
            <Phone className="absolute top-1/2 -translate-y-1/2 left-2 size-5" />
          </div>
        </div>
      </div>
      <div className="space-y-1 w-full mt-3">
        <h2 className="text-gray-500 font-semibold text-xs">Address</h2>
        <div className="relative">
          <Input
            type="text"
            name="address"
            onChange={(e) => setForm({ ...form, alamat: e.target.value })}
            placeholder="Customer address...."
            autoComplete="off"
            className="w-full h-full py-2 pl-9 pr-2.5 text-sm"
          />
          <House className="absolute top-1/2 -translate-y-1/2 left-2 size-5" />
        </div>
      </div>
    </div>
  );
};

export default FormNewCustomer;
