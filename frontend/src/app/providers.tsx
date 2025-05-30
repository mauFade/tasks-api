"use client";

import type React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import "./globals.css";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
