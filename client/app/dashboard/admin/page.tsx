"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/admin-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { apiFetch } from "@/lib/api";
import { Users, Building2, Target, CreditCard, DollarSign, UserCheck } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

type Stats = {
  totalUsers: number;
  totalNgos: number;
  totalCampaigns: number;
  totalDonations: number;
  totalBeneficiaries: number;
  totalRaised: number;
  recentDonations: any[];
  monthlyStats: any[];
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await apiFetch<Stats>("/api/admin/dashboard/stats");
        setStats(data);
      } catch (error) {
        console.error("Failed to load stats:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Loading...</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-4 bg-muted animate-pulse rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!stats) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Failed to load dashboard data</p>
        </div>
      </AdminLayout>
    );
  }

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      description: "Registered users",
    },
    {
      title: "NGOs",
      value: stats.totalNgos,
      icon: Building2,
      description: "Active organizations",
    },
    {
      title: "Campaigns",
      value: stats.totalCampaigns,
      icon: Target,
      description: "Total campaigns",
    },
    {
      title: "Beneficiaries",
      value: stats.totalBeneficiaries,
      icon: UserCheck,
      description: "People helped",
    },
    {
      title: "Total Donations",
      value: stats.totalDonations,
      icon: CreditCard,
      description: "Transactions made",
    },
    {
      title: "Total Raised",
      value: `$${stats.totalRaised.toLocaleString()}`,
      icon: DollarSign,
      description: "Funds collected",
    },
  ];

  // Prepare chart data
  const monthlyData = stats.monthlyStats.map(stat => ({
    month: `${stat._id.year}-${stat._id.month.toString().padStart(2, '0')}`,
    amount: stat.totalAmount,
    count: stat.count,
  }));

  const userRoleData = [
    { name: 'Donors', value: stats.totalUsers - stats.totalNgos, color: '#8884d8' },
    { name: 'NGOs', value: stats.totalNgos, color: '#82ca9d' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your platform.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <Card key={card.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{card.value}</div>
                  <p className="text-xs text-muted-foreground">{card.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Charts */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Donations</CardTitle>
              <CardDescription>Donation trends over the last 12 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
                  <Bar dataKey="amount" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Distribution</CardTitle>
              <CardDescription>Breakdown of user types</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={userRoleData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(((percent ?? 0) * 100).toFixed(0))}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {userRoleData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Donations</CardTitle>
            <CardDescription>Latest donation activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentDonations.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No recent donations</p>
              ) : (
                stats.recentDonations.map((donation) => (
                  <div key={donation._id} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">{donation.donor?.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Donated ${donation.amount} to {donation.campaign?.title}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${donation.amount}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(donation.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
