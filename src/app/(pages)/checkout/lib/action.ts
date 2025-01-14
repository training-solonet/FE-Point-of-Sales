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

export const SubmitOrder = async (orderData: OrderDataType): Promise<{ status: string, message: string }> => {
  try {
    const response = await axios(
      "http://127.0.0.1:8000/api/order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(orderData),
      }
    );

    console.log(orderData);

    if (response.status >= 200 && response.status < 300) {
      console.log("Order submitted successfully", response.data);
      return response.data;
    } else {
      throw new Error("Failed to submit order");
    }
  } catch (err) {
    console.error("Failed to submit order", err);
    throw err;
  }
};
