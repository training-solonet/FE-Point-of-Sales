import { ProductType } from "@/app/components/card-product";
import { rupiahFormat } from "@/lib/utils";

interface OrderItemProps {
  item: ProductType;
}

const OrderItem = ({ item }: OrderItemProps) => {
  return (
    <li className="flex justify-between">
      <span className="font-semibold text-gray-500">{item.nama}</span>
      <span className="font-semibold text-gray-950">{item.qty} x {rupiahFormat(item.harga)}</span>
    </li>
  );
};

export default OrderItem;
