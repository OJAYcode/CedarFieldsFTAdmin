"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Loader } from "../ui/Loader";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireSuperAdmin?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireSuperAdmin = false,
}) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/");
      } else if (requireSuperAdmin && user.role !== "superadmin") {
        router.push("/dashboard");
      }
    }
  }, [user, loading, router, requireSuperAdmin]);

  if (loading) {
    return <Loader fullScreen />;
  }

  if (!user || (requireSuperAdmin && user.role !== "superadmin")) {
    return null;
  }

  return <>{children}</>;
};
