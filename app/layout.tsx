import type { Metadata } from "next";
import { Dosis, Inter } from "next/font/google";
import "./globals.css";
import Image from 'next/image'

const dosis = Dosis({ subsets: ["latin"], variable: "--font-dosis" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Meta Diaria - Gerenciador de habitos",
  description: "Gerenciar seus habitos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dosis.className} ${inter.className} flex items-center flex-col mt-10 bg-neutral-900`}>
      <Image
                src="/logo.svg"
                width={200}
                height={200}
                alt="Picture of the author"
              />
       
          {children}
      </body>
    </html>
  );
}
