"use client"

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useReducer } from "react";

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

export enum FilterActionKind {
    FILTER_PRODUCT = "FILTER_PRODUCT",
}

export const ProductContext = createContext<ProductContextType | null>(null);

type FilterState = {
    nama: string,
    kategori: string,
    harga: number,
    stok: number
}

type FilterAction = {
    type: FilterActionKind,
    payload: {
        kategori: string,
        nama: string
    }
}

const initialFilterState: FilterState = {
    nama: "",
    kategori: "",
    harga: 0,
    stok: 0
}

function productReducer(state: FilterState, action: FilterAction) {
    switch (action.type) {
        case FilterActionKind.FILTER_PRODUCT: {
            return {
                ...state,
                kategori: action.payload.kategori,
                nama: action.payload.nama
            }
        }
        default: {
            return state
        }
    }
}

const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const response = await axios.get(`${process.env.NEXT_BASE_URL}/product`);
            return response.data;
        },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [filterState, dispatch] = useReducer(productReducer, initialFilterState)

    return (
        <ProductContext.Provider value={{ products: data, isLoading, isError }}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductProvider;