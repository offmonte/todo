import Image from "next/image";
import TodoApp from "@/components/TodoApp";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";
import BackgroundDecor from "@/components/BackgroundDecor";

export default function Home() {
  return (
    <div className={`${geistSans.className} ${geistMono.className} font-sans min-h-screen bg-background text-foreground flex flex-col`}>
      <AppHeader />
      <main className="relative flex-1 px-6 py-6 sm:py-10">
        <div className="mx-auto max-w-6xl relative">
          <TodoApp />
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
