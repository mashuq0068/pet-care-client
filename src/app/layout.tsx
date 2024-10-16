import type { Metadata } from "next";
import "./globals.css";
import { Roboto_Slab } from "next/font/google";
import ReduxProvider from "@/redux/ReduxProvider";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "@/components/shared/ProtectedRoute";

// Define the font outside of the export
const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={robotoSlab.className}>
      <body>
        <ReduxProvider>
          <ProtectedRoute>
            <Toaster position="top-center" />
            {children}
          </ProtectedRoute>
        </ReduxProvider>
      </body>
    </html>
  );
}
