import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import {NextIntlClientProvider} from 'next-intl';
import { getMessages } from "next-intl/server";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CoverTune",
  description: "Welcome to Covertune, where your musical journey begins with the visual allure of album covers. We believe that a picture is worth a thousand songs, and each cover holds a story waiting to be discovered.",
};

export const revalidate = 0

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
      <body className={cn(inter.className,"bg-primary/10")}>
      <NextIntlClientProvider messages={messages}>
      <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="relative flex flex-col mb-32 mx-10">
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
