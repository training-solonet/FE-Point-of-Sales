import axios from "axios";


export const getCategory = async () => {
    try {
        const res = await axios.get(`https://penjualan.connectis.my.id/api/category`);
        return res.data.data
    } catch (err) {
        console.log("Error fetching data: ", err);
    }
}

export const getBestSeller = async () => {
    try {
        const res = await axios.get(`https://penjualan.connectis.my.id/api/best-seller-product`);
        return res.data.data
    } catch (err) {
        console.log("Error fetching data: ", err);
    }
}

export const getAllProduct = async () => {
    try {
        const res = await axios.get(`https://penjualan.connectis.my.id/api/product`);
        return res.data.data
    } catch (err) {
        console.log("Error fetching data: ", err);
    }
}

export const getProductByCategory = async ({ nama }: { nama: string }) => {
    try {
        const res = await axios.get(`https://penjualan.connectis.my.id/api/product?kategori=${nama}`);
        return res.data.data
    } catch (err) {
        console.log("Error fetching data: ", err);
    }
}