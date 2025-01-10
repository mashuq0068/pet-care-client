"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const role = useSelector((state: RootState) => state.auth.role);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
 
    if (pathname === "/login" || pathname === "/registration") {
      setIsLoading(false);
      return;
    }


    if (!role) {
      router.push("/login");
      return;
    }

    if (adminRoutes.includes(pathname) && role !== "admin") {
      router.push("/login");
      return;
    }


    setIsLoading(false);
  }, [role, pathname, router]);

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return <>{children}</>;
};


const adminRoutes = [
  "/admin/user-management",
  "/admin/content-management",
  "/admin/payment-history",
];

export default ProtectedRoute;
