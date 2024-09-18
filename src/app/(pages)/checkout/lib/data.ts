import axios from "axios";


export const getCustomer = async (name: string) => {
    try {
        const res = await axios.get(`https://penjualan.connectis.my.id/api/customer?nama=${name}`);
        return res.data.data.slice(0, 5)
    } catch (err) {
        console.log("Error fetching data: ", err);
    }
}