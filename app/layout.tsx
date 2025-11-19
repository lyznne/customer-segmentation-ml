import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Customer Segmentation - RFM Analysis & K-Means Clustering',
  description: 'E-commerce customer segmentation using machine learning powered K-Means clustering and RFM analysis',
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          themes={['light', 'dark', 'dim']}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
