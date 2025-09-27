"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import Footer from "../_components/layouts/Footer";
import Navbar from "../_components/layouts/Navbar";
import { queryClient } from "@/lib/react-query";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </QueryClientProvider>
    </>
  );
}
