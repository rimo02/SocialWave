import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from 'next-auth/react'
import Header from "@/components/Header";
import Sidebar from "@/components/sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SocialWave",
  description: "Connect with friends",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <div className="flex min-h-screen flex-col antialiased">
            <SessionProvider>
              <Header />
              <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 pb-16 md:pb-0">
                  {children}
                </main>
              </div>
            </SessionProvider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
