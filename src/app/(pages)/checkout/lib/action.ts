import axios from "axios";

export interface ProductOrderType {
  barang_id: number;
  qty: number;
}

interface OrderDataType {
  customer_name: string;
  products: ProductOrderType[];
  payment_method: string;
  no_hp?: string;
  alamat?: string;
}

export const SubmitOrder = async (orderData: OrderDataType): Promise<void> => {
  try {
    const response = await axios(
      "https://penjualan.connectis.my.id/api/order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(orderData),
      }
    );

    if (response.status >= 200 && response.status < 300) {
      console.log("Order submitted successfully");
    } else {
      throw new Error("Failed to submit order");
    }
  } catch (err) {
    console.error("Failed to submit order", err);
    throw err;
  }
};
