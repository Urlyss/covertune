import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import {NextIntlClientProvider} from 'next-intl';
import { getMessages } from "next-intl/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CoverTune",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {  
  const messages = await getMessages();
  return (
    <html lang="en">
      <body className={inter.className}>
      <NextIntlClientProvider messages={messages}>
      <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="relative flex flex-col bg-background mb-32 mx-10">
            {children}
          </main>
          <Toaster />
          <Footer />
        </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}