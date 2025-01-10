"use client";
import { Provider } from "react-redux";
import store from "@/app/redux/store";
import { Suspense } from "react";
import { Poppins } from "next/font/google";
import Sidebar from "@/components/layout/navbar";
import Container from "@/components/layout/container";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} bg-white text-foreground`}
        suppressHydrationWarning={true}
      >
        <div className="flex flex-col sm:flex-row gap-x-8">
          <Sidebar />
          <Container>
            <Provider store={store}>
              <Suspense>{children}</Suspense>
            </Provider>
          </Container>
        </div>
      </body>
    </html>
  );
}
