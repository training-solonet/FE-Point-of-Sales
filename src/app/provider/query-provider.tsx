"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

interface QCProviderProps {
    children: React.ReactNode
}

const queryClient = new QueryClient()

const QCProvider: React.FC<QCProviderProps> = ({ children }) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

export default QCProvider