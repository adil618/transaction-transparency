"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/admin-layout";
import ProtectedRoute from "@/components/protected-route";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { apiFetch } from "@/lib/api";
import { Users, Building2, Target, CreditCard, DollarSign, UserCheck , Heart } from "lucide-react";
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

type StatsResponse = {
  success: boolean;
  stats: Stats;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await apiFetch<StatsResponse>("/api/admin/dashboard/stats");
        setStats(data.stats);
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
      <ProtectedRoute roles={["admin"]}>
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
    </ProtectedRoute>
    );
  }

  if (!stats) {
    return (
      <ProtectedRoute roles={["admin"]}>
        <AdminLayout>
          <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Failed to load dashboard data</p>
        </div>
      </AdminLayout>
    </ProtectedRoute>
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
      value: `$${(stats.totalRaised || 0).toLocaleString()}`,
      icon: DollarSign,
      description: "Funds collected",
    },
  ];

  // Prepare chart data
  const monthlyData = (stats.monthlyStats || []).map(stat => ({
    month: `${stat._id.year}-${stat._id.month.toString().padStart(2, '0')}`,
    amount: stat.totalAmount,
    count: stat.count,
  }));

  const userRoleData = [
    { name: 'Donors', value: stats.totalUsers - stats.totalNgos, color: '#8884d8' },
    { name: 'NGOs', value: stats.totalNgos, color: '#82ca9d' },
  ];

  return (
    <ProtectedRoute roles={["admin"]}>
      <AdminLayout>
        <div className="space-y-6">
          <div className="animate-fadeIn">
          <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-blue-600">
            Dashboard
          </h1>
          <p className="text-muted-foreground text-lg mt-2">
            Welcome back! Here's what's happening with your platform.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {statCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Card key={card.title} className={`border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group animate-fadeIn opacity-0`} style={{animationDelay: `${0.1 + index * 0.05}s`}}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-blue-600">
                    {card.value}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{card.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Charts */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 animate-fadeIn opacity-0 [animation-delay:0.5s]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></div>
                Monthly Donations
              </CardTitle>
              <CardDescription>Donation trends over the last 12 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip 
                    formatter={(value) => [`$${value}`, 'Amount']}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar dataKey="amount" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#667eea" />
                      <stop offset="100%" stopColor="#764ba2" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 animate-fadeIn opacity-0 [animation-delay:0.6s]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                User Distribution
              </CardTitle>
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
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 animate-fadeIn opacity-0 [animation-delay:0.7s]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-purple-500 animate-pulse"></div>
              Recent Donations
            </CardTitle>
            <CardDescription>Latest donation activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(stats.recentDonations || []).length === 0 ? (
                <div className="text-center py-8">
                  <Heart className="h-12 w-12 text-slate-400 mx-auto mb-4 animate-float" />
                  <p className="text-muted-foreground">No recent donations</p>
                </div>
              ) : (
                (stats.recentDonations || []).map((donation, index) => (
                  <div key={donation._id} className={`flex items-center justify-between border-b pb-4 last:border-b-0 transition-all duration-300 hover:bg-slate-50 p-3 rounded-lg animate-fadeIn opacity-0`} style={{animationDelay: `${0.8 + index * 0.03}s`}}>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <Heart className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{donation.donor?.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Donated to {donation.campaign?.title}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-green-600">${donation.amount}</p>
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
  </ProtectedRoute>
  );
}
