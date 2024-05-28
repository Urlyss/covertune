'use client';
 
import Footer from '@/components/Footer';
import { Header } from '@/components/Header';
import { ThemeProvider } from '@/components/ThemeProvider';
import Error from 'next/error';
import "./[locale]/globals.css";
 
export default function NotFound() {
  return (
    <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
  >
    <Header />
    <main className="relative flex flex-col bg-background mb-32 mx-10">
    <Error statusCode={404} />
    </main>
    <Footer />
  </ThemeProvider>
  );
}