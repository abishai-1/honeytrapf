import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import VaultBankLayout from "@/app/components/VaultBankLayout";

export const metadata: Metadata = {
  title: "VaultBank | Official Digital Banking Portal",
  description: "Official VaultBank NetBanking Portal. Manage checking, savings, fixed deposits, UPI payments, and card services online.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-slate-100 text-slate-900 antialiased selection:bg-red-600 selection:text-white">
        <VaultBankLayout>{children}</VaultBankLayout>
      </body>
    </html>
  );
}
