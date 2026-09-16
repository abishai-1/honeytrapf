import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import VaultBankLayout from "@/app/components/VaultBankLayout";

export const metadata: Metadata = {
  title: "VaultBank | Premier Secure Digital Banking Portal",
  description: "Manage your checking, savings, wealth investments, transfers, and credit cards with VaultBank 256-bit SSL encrypted digital portal.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#090d16] text-slate-100 antialiased selection:bg-blue-600 selection:text-white">
        <VaultBankLayout>{children}</VaultBankLayout>
      </body>
    </html>
  );
}
