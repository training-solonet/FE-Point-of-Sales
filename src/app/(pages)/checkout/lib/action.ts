import axios from "axios"

export interface ProductOrderType {
    barang_id: number,
    qty: number
}

interface OrderDataType {
    customer_name: string,
    products: ProductOrderType[],
    payment_method: string
}

export const SubmitOrder = async (orderData: OrderDataType): Promise<void> => {
    try {
        const response = await axios('https://penjualan.connectis.my.id/api/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(orderData)
        })

        if (response.status >= 200 && response.status < 300) {
            const errorData = await response.data;
            throw new Error (errorData.message || "Failed to submit order");
        }
    } catch (err) {
        console.error("Failed to submit order", err);
        throw err;
    }
}