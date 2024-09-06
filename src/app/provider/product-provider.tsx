"use client"

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext } from "react";

interface ProductProviderProps {
    children: React.ReactNode;
}

interface Product {
    id: number,
    nama: string,
    kategori: string,
}

export type ProductContextType = {
    products: { data: Product[] } | undefined;
    isLoading: boolean;
    isError: boolean;
}

export const ProductContext = createContext<ProductContextType | null>(null);

const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {

    const { data, isLoading, isError } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const response = await axios.get(`${process.env.NEXT_BASE_URL}/product`);
            return response.data;
        },
    });

    return (
        <ProductContext.Provider value={{ products: data, isLoading, isError }}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductProvider;