import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CoverTune",
  description: "Welcome to Covertune, where your musical journey begins with the visual allure of album covers. We believe that a picture is worth a thousand songs, and each cover holds a story waiting to be discovered.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {  
  return (
    <html lang="en">
      <body className={inter.className}>
      {children}
      </body>
    </html>
  );
}
