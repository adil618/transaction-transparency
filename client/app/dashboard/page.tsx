"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";

export default function DashboardRouter() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    if (user.role === "admin") router.replace("/dashboard/admin");
    if (user.role === "ngo") router.replace("/dashboard/ngo");
    if (user.role === "donor") router.replace("/dashboard/donor");
  }, [user, loading, router]);

  return <div className="p-6">Loading dashboard...</div>;
}
