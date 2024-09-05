import axios from "axios";


export const getCategory = async () => {
    const res = await axios.get(`${process.env.NEXT_BASE_URL}/category`);
    return res.data.data
}

export const getBestSeller = async () => {
    const res = await axios.get(`${process.env.NEXT_BASE_URL}/best-seller-product`);
    return res.data.data
}