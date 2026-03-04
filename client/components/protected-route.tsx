"use client";

import { useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({
  children,
  roles,
}: {
  children: React.ReactNode;
  roles?: Array<"admin" | "ngo" | "donor" | "tester">;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
      return;
    }
    if (!loading && user && roles && !roles.includes(user.role)) {
      router.replace(`/dashboard/${user.role}`);
    }
  }, [loading, user, roles, router]);

  if (loading || !user) return <div className="p-6">Loading...</div>;
  return <>{children}</>;
}
