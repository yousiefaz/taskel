import { Rubik } from "next/font/google";
import "./globals.css";

import type { Metadata } from "next";
import type { ReactNode } from "react";

const rubik = Rubik({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Taskel",
  description: "Task management app",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" suppressHydrationWarning>
      <body className={rubik.className}>{children}</body>
    </html>
  );
}
