import "./globals.css";
import { Poppins } from "next/font/google";
import Sidebar from "@/components/layout/navbar";
import Container from "@/components/layout/container";
import QCProvider from "./provider/query-provider";
import ProductProvider from "./provider/product-provider";
import { Metadata } from "next";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Point of Sales",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-background text-foreground`}>
        <div className="flex flex-col sm:flex-row gap-x-8">
          <Sidebar />
          <Container>
            <QCProvider>
              <ProductProvider>{children}</ProductProvider>
            </QCProvider>
          </Container>
        </div>
      </body>
    </html>
  );
}
