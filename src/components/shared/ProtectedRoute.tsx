"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const role = useSelector((state: RootState) => state.auth.role);

  if (typeof window !== "undefined") {
    if (!role) {
      router.push("/login");
      return null;
    }

    if (adminRoutes.includes(pathname) && role !== "admin") {
      router.push("/login");
      return null;
    }
  }

  return <>{children}</>;
};

const adminRoutes = [
  "/admin",
  "/admin/dashboard",
  "/admin/users",
  // add more admin routes here
];

export default ProtectedRoute;
