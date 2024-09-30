import { ProductType } from "@/app/components/card-product";
import { rupiahFormat } from "@/lib/utils";
import { useState } from "react";
import { SubmitOrder } from "../lib/action";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/useToast";
import OrderItem from "./order-item";
import PaymentMethod from "./payment-method";
import CustomerSearch from "./customer-search";
import FormNewCustomer from "./form-new-customer";

interface OrderSummaryProps {
  product: ProductType[];
}

export interface FormProps {
  payment: string,
  customer: string,
  no_hp: string,
  alamat: string,
  isLoading: boolean,
  isNewCustomer: boolean,
}

export default function OrderSummary({ product }: OrderSummaryProps) {
  const { push } = useRouter();
  const { showToast } = useToast();
  const [form, setForm] = useState({
    payment: "",
    customer: "",
    no_hp: "",
    alamat: "",
    isLoading: false,
    isNewCustomer: false,
  });

  const subTotal = product.reduce(
    (acc, item) => acc + item.harga * item.qty,
    0
  );
  const totalAmount = subTotal;
  console.log(product);

  const handleCheckout = async () => {
    let orderData;

    if (form.no_hp !== "" && form.alamat !== "" && form.isNewCustomer === true) {
      orderData = {
        customer_name: form.customer,
        no_hp: form.no_hp,
        alamat: form.alamat,
        products: product.map((item: ProductType) => ({
          barang_id: item.id,
          qty: item.qty,
        })),
        payment_method: form.payment,
      };
    } else {
      orderData = {
        customer_name: form.customer,
        products: product.map((item: ProductType) => ({
          barang_id: item.id,
          qty: item.qty,
        })),
        payment_method: form.payment,
      };
    }

    setForm({ ...form, isLoading: true });

    try {
      if (!form.customer) {
        showToast(
          "error",
          "Transaction failed!",
          "Add Customers before making a transactions"
        );
        setForm({ ...form, isLoading: false });
        return;
      } else if (!form.payment) {
        showToast(
          "error",
          "Transaction failed!",
          "Add Payment method before making a transactions"
        );
        setForm({ ...form, isLoading: false });
        return;
      } else if (form.isNewCustomer === true && form.no_hp === "" && form.alamat === "") {
        showToast(
          "error",
          "Transaction failed!",
          "Add Phone number and Address before making a transactions"
        );
        setForm({ ...form, isLoading: false });
        return;
      }

      await SubmitOrder(orderData);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Transaction success",
        showConfirmButton: true,
        timer: 2500,
      }).then(() => {
        push(`/order-success?nama=${form.customer}&payment=${form.payment}`);
      });
      setForm({ ...form, isLoading: false });
    } catch (err) {
      console.log(err);
      setForm({ ...form, isLoading: false });
      showToast(
        "error",
        "Transaction failed!",
        "Payment failed please try again"
      );
    }
  };

  return (
    <div className="bg-white pb-6 px-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold">Order Summary</h1>
      <ul className="my-5">
        {product.map((item: ProductType, index: number) => (
          <OrderItem key={index} item={item} />
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
        <hr className="my-4" />
        <h1 className="text-lg font-semibold">Payment and Customer Details</h1>
        <div className="flex justify-between mt-3 mb-5">
          <PaymentMethod form={form} setForm={setForm} />
          {form.isNewCustomer === false && (
            <CustomerSearch form={form} setForm={setForm} />
          )}
        </div>
        {form.isNewCustomer === true && (
          <div className="mb-5">
            <FormNewCustomer form={form} setForm={setForm} />
          </div>
        )}
      </div>
      <hr />
      <div className="mt-2 flex justify-between text-black font-bold text-xl">
        <span>Total</span>
        <span>{rupiahFormat(totalAmount)}</span>
      </div>
      <div className="mt-4 text-right" onClick={() => handleCheckout()}>
        <button
          className={`${
            form.isLoading === true
              ? "bg-blue-800"
              : "bg-blue-700 hover:bg-blue-800"
          } w-[35%] text-white rounded-lg py-2 `}
        >
          {form.isLoading === true ? (
            <span className="text-white font-semibold">Loading...</span>
          ) : (
            <span className="text-white font-semibold">Checkout</span>
          )}
        </button>
      </div>
    </div>
  );
}
