import type { Metadata } from "next";
import "./globals.css";
import {Roboto_Slab}  from "next/font/google"

export const roboto_slab = Roboto_Slab({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto_slab.className}>
      <body
        
      >
        {children}
      </body>
    </html>
  );
}
