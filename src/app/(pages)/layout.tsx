"use client";

import { Provider } from "react-redux";
import store from "@/app/redux/store";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <Suspense>
        {children}
      </Suspense>
    </Provider>
  )
}
