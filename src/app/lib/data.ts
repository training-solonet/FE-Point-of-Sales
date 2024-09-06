import axios from "axios";


export const getCategory = async () => {
    try {
        const res = await axios.get(`${process.env.NEXT_BASE_URL}/category`);
        return res.data.data
    } catch (err) {
        console.log("Error fetching data: ", err);
    }
}

export const getBestSeller = async () => {
    try {
        const res = await axios.get(`${process.env.NEXT_BASE_URL}/best-seller-product`);
        return res.data.data
    } catch (err) {
        console.log("Error fetching data: ", err);
    }
}

export const getAllProduct = async () => {
    try {
        const res = await axios.get(`${process.env.NEXT_BASE_URL}/product`);
        return res.data.data
    } catch (err) {
        console.log("Error fetching data: ", err);
    }
}