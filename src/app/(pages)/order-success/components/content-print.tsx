"use client"

import { ProductType } from "@/app/components/card-product";
import { getFormattedDate, rupiahFormat } from "@/lib/utils";
import { useEffect, useState } from "react";

interface PrintContentProps {
  customer: string | null;
  payment: string | null;
  product: ProductType[];
  orderId: string | null;
  discountRate?: number;
  taxRate?: number;
}

export default function PrintContent({
  customer,
  payment,
  product,
  orderId,
  discountRate = 0,
  taxRate = 10,
}: PrintContentProps) {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    setFormattedDate(getFormattedDate());
  }, []);
  const subtotal = product.reduce(
    (acc, item) => acc + item.harga * item.qty,
    0
  );
  const discount = (discountRate / 100) * subtotal;
  const subtotalAfterDiscount = subtotal - discount;
  const tax = (taxRate / 100) * subtotalAfterDiscount;
  const total = subtotalAfterDiscount + tax;

  return (
    <div className="max-w-[300px]">
      <div className="flex justify-between items-center flex-wrap">
        <p className="font-semibold text-base">Point Of Sales</p>
        <p className="font-semibold text-base">
          {orderId}
        </p>
      </div>
      <p className="font-medium text-[8px]">{formattedDate}</p>

      <div className="mt-4">
        <div className="flex justify-between items-center flex-wrap">
          <p className="font-semibold text-[7px]">Customer</p>
          <p className="font-medium text-[7px]">{customer}</p>
        </div>
        <div className="flex justify-between items-center flex-wrap">
          <p className="font-semibold text-[7px]">Payment</p>
          <p className="font-medium text-[7px]">{payment}</p>
        </div>
      </div>

      <hr className="my-2" />

      <div className="mt-4">
        <ul className="space-y-1">
          {product.map((item) => (
            <li
              className="flex justify-between items-center flex-wrap text-[7px]"
              key={item.id}
            >
              <span>{item.nama}</span>
              <span>
                {item.qty} x {rupiahFormat(item.harga)}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <hr className="my-2" />

      <div className="mt-4 flex flex-col gap-y-0">
        <div className="flex justify-between items-center flex-wrap">
          <p className="font-semibold text-[7px]">Subtotal</p>
          <p className="font-medium text-[7px]">{rupiahFormat(subtotal)}</p>
        </div>
        <div className="flex justify-between items-center flex-wrap">
          <p className="font-semibold text-[7px]">Discount ({discountRate}%)</p>
          <p className="font-medium text-[7px]">-{rupiahFormat(discount)}</p>
        </div>
        <div className="flex justify-between items-center flex-wrap">
          <p className="font-semibold text-[7px]">Tax ({taxRate}%)</p>
          <p className="font-medium text-[7px]">{rupiahFormat(tax)}</p>
        </div>
        <div className="flex justify-between items-center flex-wrap">
          <p className="font-semibold text-[7px]">Total</p>
          <p className="font-medium text-[7px]">{rupiahFormat(total)}</p>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-center text-[7px] font-medium">
          Thank you for your purchase!
        </p>
        <p className="text-center text-[7px]">
          For any inquiries, contact us at{" "}
          <span className="font-semibold">support@pos.com</span>.
        </p>
        <p className="text-center text-[7px]">Have a great day!</p>
      </div>
    </div>
  );
}
