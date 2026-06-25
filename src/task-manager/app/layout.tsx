import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import TopNavigation from "@/components/navigation/top-navigation";
import Providers from "@/components/providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Task Manager",
  description: "GitHub-inspired workspace navigation for your task manager.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground transition-colors duration-200">
        <Providers>
          <TopNavigation />
          {children}
        </Providers>
      </body>
    </html>
  );
}
