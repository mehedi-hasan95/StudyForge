import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/provider/AuthProvider";
import { ConfettiProvider } from "@/provider/confetti-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Study Forge",
  description: "Learn whatever you want",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>
          <ConfettiProvider />
          {children}
          <Toaster position="top-center" richColors />
        </body>
      </html>
    </AuthProvider>
  );
}
