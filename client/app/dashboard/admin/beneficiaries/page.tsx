"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/admin-layout";
import ProtectedRoute from "@/components/protected-route";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { Users, Building2, Target } from "lucide-react";

type StatsResponse = {
  stats: {
    totalBeneficiaries: number;
    totalNgos: number;
    totalCampaigns: number;
  };
};

export default function BeneficiariesPage() {
  const [stats, setStats] = useState<StatsResponse["stats"] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await apiFetch<StatsResponse>("/api/admin/dashboard/stats");
        setStats(data.stats);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <ProtectedRoute roles={["admin"]}>
      <AdminLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Beneficiaries</h1>
            <p className="text-muted-foreground">Overview of beneficiary activity across NGOs and campaigns.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Beneficiaries</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <p className="text-2xl font-bold">{loading ? "..." : stats?.totalBeneficiaries ?? 0}</p>
                <Users className="h-5 w-5 text-muted-foreground" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total NGOs</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <p className="text-2xl font-bold">{loading ? "..." : stats?.totalNgos ?? 0}</p>
                <Building2 className="h-5 w-5 text-muted-foreground" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <p className="text-2xl font-bold">{loading ? "..." : stats?.totalCampaigns ?? 0}</p>
                <Target className="h-5 w-5 text-muted-foreground" />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Data Availability</CardTitle>
              <CardDescription>
                Direct admin beneficiary listing endpoint is not available yet in the backend. Use the pages below to monitor related data.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/dashboard/admin/ngos">Review NGOs</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/dashboard/admin/campaigns">Review Campaigns</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/dashboard/admin/transactions">Review Transactions</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
