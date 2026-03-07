"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/admin-layout";
import ProtectedRoute from "@/components/protected-route";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { apiFetch } from "@/lib/api";
import { 
  Users, 
  Building2, 
  Target, 
  CreditCard, 
  DollarSign, 
  UserCheck, 
  Heart,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  Star,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Send,
  FileText,
  Shield,
  Settings,
  Activity,
  Wallet,
  RefreshCw,
  Filter,
  Search,
  MoreVertical,
  ChevronRight
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from "recharts";

type Stats = {
  totalUsers: number;
  totalNgos: number;
  totalCampaigns: number;
  totalDonations: number;
  totalBeneficiaries: number;
  totalRaised: number;
  recentDonations: any[];
  monthlyStats: any[];
  pendingApprovals?: number;
  pendingPayments?: number;
  featuredCampaigns?: number;
};

type StatsResponse = {
  success: boolean;
  stats: Stats;
};

type PaymentRequest = {
  _id: string;
  amount: number;
  purpose: string;
  status: string;
  ngo: { name: string; logo?: string };
  beneficiary?: { name: string; photo?: string };
  createdAt: string;
};

type FeaturedDonation = {
  _id: string;
  amount: number;
  donor: { name: string; photo?: string };
  campaign: { title: string };
  featured: boolean;
  createdAt: string;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [paymentRequests, setPaymentRequests] = useState<PaymentRequest[]>([]);
  const [featuredDonations, setFeaturedDonations] = useState<FeaturedDonation[]>([]);
  const [activeWorkflow, setActiveWorkflow] = useState<string>("overview");

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await apiFetch<StatsResponse>("/api/admin/dashboard/stats");
        setStats(data.stats);
        
        // Set sample data for demo purposes
        setPaymentRequests([
          { _id: '1', amount: 2500, purpose: 'Medical equipment for community clinic', status: 'PENDING', ngo: { name: 'Health First NGO' }, beneficiary: { name: 'Community Clinic' }, createdAt: new Date().toISOString() },
          { _id: '2', amount: 1500, purpose: 'School supplies for rural children', status: 'PENDING', ngo: { name: 'Education For All' }, beneficiary: { name: 'Village School' }, createdAt: new Date(Date.now() - 86400000).toISOString() },
          { _id: '3', amount: 800, purpose: 'Emergency food distribution', status: 'APPROVED', ngo: { name: 'Feed The Hungry' }, beneficiary: { name: 'Food Bank' }, createdAt: new Date(Date.now() - 172800000).toISOString() },
        ]);
        
        setFeaturedDonations([
          { _id: '1', amount: 5000, donor: { name: 'John Smith' }, campaign: { title: 'Clean Water Initiative' }, featured: true, createdAt: new Date().toISOString() },
          { _id: '2', amount: 3000, donor: { name: 'Sarah Johnson' }, campaign: { title: 'Healthcare for All' }, featured: true, createdAt: new Date(Date.now() - 86400000).toISOString() },
          { _id: '3', amount: 2500, donor: { name: 'Tech Corp Inc.' }, campaign: { title: 'Education Fund' }, featured: false, createdAt: new Date(Date.now() - 172800000).toISOString() },
        ]);
      } catch (error) {
        console.error("Failed to load stats:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const approvePayment = async (id: string) => {
    setPaymentRequests(prev => prev.map(p => p._id === id ? { ...p, status: 'APPROVED' } : p));
  };

  const rejectPayment = async (id: string) => {
    setPaymentRequests(prev => prev.map(p => p._id === id ? { ...p, status: 'REJECTED' } : p));
  };

  const toggleFeatured = async (id: string) => {
    setFeaturedDonations(prev => prev.map(d => d._id === id ? { ...d, featured: !d.featured } : d));
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'approved': case 'completed': case 'active': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'rejected': case 'inactive': return 'bg-red-100 text-red-700';
      case 'processing': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <ProtectedRoute roles={["admin"]}>
        <AdminLayout>
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <Card key={i} className="border-0 shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="h-4 w-24 bg-muted animate-pulse rounded"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-8 w-20 bg-muted animate-pulse rounded mb-2"></div>
                    <div className="h-3 w-32 bg-muted animate-pulse rounded"></div>
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
            <div className="text-center">
              <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <p className="text-muted-foreground">Failed to load dashboard data</p>
              <Button className="mt-4" onClick={() => window.location.reload()}>
                <RefreshCw className="h-4 w-4 mr-2" /> Retry
              </Button>
            </div>
          </div>
        </AdminLayout>
      </ProtectedRoute>
    );
  }

  const pendingPayments = paymentRequests.filter(p => p.status === 'PENDING').length;
  
  const statCards = [
    { title: "Total Users", value: stats.totalUsers, icon: Users, description: "Registered users", trend: "+12%", trendUp: true, color: "from-blue-500 to-blue-600" },
    { title: "NGOs", value: stats.totalNgos, icon: Building2, description: "Active organizations", trend: "+5%", trendUp: true, color: "from-purple-500 to-purple-600" },
    { title: "Campaigns", value: stats.totalCampaigns, icon: Target, description: "Total campaigns", trend: "+8%", trendUp: true, color: "from-green-500 to-green-600" },
    { title: "Beneficiaries", value: stats.totalBeneficiaries, icon: UserCheck, description: "People helped", trend: "+15%", trendUp: true, color: "from-pink-500 to-pink-600" },
    { title: "Donations", value: stats.totalDonations, icon: CreditCard, description: "Total transactions", trend: "+20%", trendUp: true, color: "from-indigo-500 to-indigo-600" },
    { title: "Total Raised", value: `$${(stats.totalRaised || 0).toLocaleString()}`, icon: DollarSign, description: "Funds collected", trend: "+25%", trendUp: true, color: "from-emerald-500 to-emerald-600" },
    { title: "Pending Approvals", value: pendingPayments, icon: Clock, description: "Awaiting review", trend: "", trendUp: false, color: "from-yellow-500 to-orange-500" },
    { title: "Featured", value: featuredDonations.filter(d => d.featured).length, icon: Star, description: "Featured donations", trend: "", trendUp: true, color: "from-amber-500 to-amber-600" },
  ];

  const monthlyData = (stats.monthlyStats || []).map(stat => ({
    month: `${stat._id.year}-${stat._id.month.toString().padStart(2, '0')}`,
    amount: stat.totalAmount,
    count: stat.count,
  }));

  const userRoleData = [
    { name: 'Donors', value: stats.totalUsers - stats.totalNgos, color: '#8884d8' },
    { name: 'NGOs', value: stats.totalNgos, color: '#82ca9d' },
    { name: 'Admins', value: 2, color: '#ffc658' },
  ];

  return (
    <ProtectedRoute roles={["admin"]}>
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 animate-fadeIn">
            <div>
              <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-blue-600">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground text-lg mt-2">
                Control center for managing donations, NGOs, and workflow
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="bg-white shadow-lg border-0">
                <RefreshCw className="h-4 w-4 mr-2" /> Refresh
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
                <Settings className="h-4 w-4 mr-2" /> Settings
              </Button>
            </div>
          </div>

          {/* Alert Banner for pending items */}
          {pendingPayments > 0 && (
            <Card className="border-0 shadow-lg bg-gradient-to-r from-yellow-50 to-orange-50 animate-fadeIn opacity-0 [animation-delay:0.1s]">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-100 rounded-full">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{pendingPayments} pending payment requests</p>
                    <p className="text-sm text-slate-600">Review and approve or reject these requests</p>
                  </div>
                </div>
                <Button onClick={() => setActiveWorkflow("payments")} className="bg-yellow-500 hover:bg-yellow-600">
                  Review Now
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {statCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <Card key={card.title} className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group animate-fadeIn opacity-0" style={{animationDelay: `${0.1 + index * 0.05}s`}}>
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2 bg-gradient-to-br ${card.color} rounded-lg transition-transform duration-300 group-hover:scale-110`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      {card.trend && (
                        <div className={`flex items-center text-xs font-semibold ${card.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                          {card.trendUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                          {card.trend}
                        </div>
                      )}
                    </div>
                    <p className="text-2xl font-bold text-slate-900">{card.value}</p>
                    <p className="text-xs text-slate-500 mt-1">{card.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Main Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="bg-white shadow-lg p-1 rounded-xl flex-wrap">
              <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-lg px-4">
                <Activity className="h-4 w-4 mr-2" /> Overview
              </TabsTrigger>
              <TabsTrigger value="payments" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-lg px-4">
                <Send className="h-4 w-4 mr-2" /> Payment Approvals
                {pendingPayments > 0 && (
                  <Badge className="ml-2 bg-red-500 text-white">{pendingPayments}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="featured" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-lg px-4">
                <Star className="h-4 w-4 mr-2" /> Featured Donations
              </TabsTrigger>
              <TabsTrigger value="workflow" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-lg px-4">
                <FileText className="h-4 w-4 mr-2" /> Workflow
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6 animate-fadeIn">
              {/* Charts */}
              <div className="grid gap-6 lg:grid-cols-2">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></div>
                      Donation Trends
                    </CardTitle>
                    <CardDescription>Monthly donation amount over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={monthlyData.length > 0 ? monthlyData : [
                        { month: 'Jan', amount: 4000, count: 24 },
                        { month: 'Feb', amount: 3000, count: 18 },
                        { month: 'Mar', amount: 5000, count: 29 },
                        { month: 'Apr', amount: 4500, count: 26 },
                        { month: 'May', amount: 6000, count: 35 },
                        { month: 'Jun', amount: 5500, count: 32 },
                      ]}>
                        <defs>
                          <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#667eea" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#667eea" stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
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
                        <Area type="monotone" dataKey="amount" stroke="#667eea" fillOpacity={1} fill="url(#colorAmount)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                      User Distribution
                    </CardTitle>
                    <CardDescription>Breakdown of platform users</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={userRoleData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {userRoleData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex justify-center gap-6 mt-4">
                      {userRoleData.map((entry) => (
                        <div key={entry.name} className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                          <span className="text-sm text-slate-600">{entry.name}: {entry.value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Donations */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-purple-500 animate-pulse"></div>
                      Recent Donations
                    </CardTitle>
                    <CardDescription>Latest donation activities on the platform</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">View All</Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {(stats.recentDonations || []).length === 0 ? (
                      <div className="text-center py-12">
                        <Heart className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                        <p className="text-muted-foreground">No recent donations</p>
                      </div>
                    ) : (
                      (stats.recentDonations || []).slice(0, 5).map((donation, index) => (
                        <div key={donation._id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors animate-fadeIn opacity-0" style={{animationDelay: `${0.1 + index * 0.05}s`}}>
                          <Avatar className="h-12 w-12 border-2 border-white shadow">
                            <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white">
                              {donation.donor?.name?.charAt(0) || 'D'}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-semibold text-slate-900">{donation.donor?.name || 'Anonymous'}</p>
                            <p className="text-sm text-slate-500">Donated to {donation.campaign?.title}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-green-600">${donation.amount}</p>
                            <p className="text-xs text-slate-400">{formatDate(donation.createdAt)}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Payment Approvals Tab */}
            <TabsContent value="payments" className="space-y-6 animate-fadeIn">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Payment Request Approval</h3>
                  <p className="text-sm text-slate-500">Review and manage NGO payment requests</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="bg-white border-0 shadow">
                    <Filter className="h-4 w-4 mr-2" /> Filter
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {paymentRequests.map((request, index) => (
                  <Card key={request._id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-fadeIn opacity-0" style={{animationDelay: `${0.1 + index * 0.05}s`}}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-14 w-14 border-2 border-white shadow-lg">
                            <AvatarImage src={request.ngo.logo} />
                            <AvatarFallback className="bg-gradient-to-br from-purple-400 to-indigo-500 text-white">
                              {request.ngo.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-slate-900">{request.ngo.name}</h4>
                              <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                            </div>
                            <p className="text-2xl font-bold text-green-600 mb-2">${request.amount.toLocaleString()}</p>
                            <p className="text-sm text-slate-600 mb-2">{request.purpose}</p>
                            <div className="flex items-center gap-4 text-xs text-slate-500">
                              <span>Beneficiary: {request.beneficiary?.name}</span>
                              <span>•</span>
                              <span>{formatDate(request.createdAt)}</span>
                            </div>
                          </div>
                        </div>
                        
                        {request.status === 'PENDING' && (
                          <div className="flex gap-2">
                            <Button 
                              onClick={() => rejectPayment(request._id)}
                              variant="outline" 
                              className="border-red-200 text-red-600 hover:bg-red-50"
                            >
                              <XCircle className="h-4 w-4 mr-1" /> Reject
                            </Button>
                            <Button 
                              onClick={() => approvePayment(request._id)}
                              className="bg-gradient-to-r from-green-500 to-green-600"
                            >
                              <CheckCircle2 className="h-4 w-4 mr-1" /> Approve
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Featured Donations Tab */}
            <TabsContent value="featured" className="space-y-6 animate-fadeIn">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Featured Donations</h3>
                  <p className="text-sm text-slate-500">Highlight top donations to showcase on the platform</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {featuredDonations.map((donation, index) => (
                  <Card key={donation._id} className={`border-0 shadow-lg transition-all duration-300 hover:shadow-xl animate-fadeIn opacity-0 ${donation.featured ? 'ring-2 ring-amber-400' : ''}`} style={{animationDelay: `${0.1 + index * 0.05}s`}}>
                    <CardContent className="p-5">
                      {donation.featured && (
                        <div className="flex items-center gap-1 text-amber-600 mb-3">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="text-xs font-semibold">FEATURED</span>
                        </div>
                      )}
                      <div className="flex items-center gap-3 mb-4">
                        <Avatar className="h-12 w-12 border-2 border-white shadow">
                          <AvatarImage src={donation.donor.photo} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white">
                            {donation.donor.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-slate-900">{donation.donor.name}</p>
                          <p className="text-xs text-slate-500">{formatDate(donation.createdAt)}</p>
                        </div>
                      </div>
                      <p className="text-3xl font-bold text-green-600 mb-2">${donation.amount.toLocaleString()}</p>
                      <p className="text-sm text-slate-600 mb-4">{donation.campaign.title}</p>
                      <Button 
                        onClick={() => toggleFeatured(donation._id)}
                        variant={donation.featured ? "outline" : "default"}
                        className={`w-full ${donation.featured ? 'border-amber-300 text-amber-600 hover:bg-amber-50' : 'bg-gradient-to-r from-amber-500 to-amber-600'}`}
                      >
                        <Star className={`h-4 w-4 mr-1 ${donation.featured ? '' : 'fill-current'}`} />
                        {donation.featured ? 'Remove from Featured' : 'Add to Featured'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Workflow Tab */}
            <TabsContent value="workflow" className="space-y-6 animate-fadeIn">
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Donation Workflow */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="h-5 w-5 text-red-500" />
                      Donation Workflow
                    </CardTitle>
                    <CardDescription>Track donations from receipt to disbursement</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl">
                        <div className="p-2 bg-green-100 rounded-full">
                          <DollarSign className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-slate-900">Donations Received</p>
                          <p className="text-sm text-slate-500">Total funds collected from donors</p>
                        </div>
                        <span className="text-xl font-bold text-green-600">${stats.totalRaised.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex items-center justify-center">
                        <div className="h-8 w-0.5 bg-slate-200"></div>
                      </div>

                      <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl">
                        <div className="p-2 bg-blue-100 rounded-full">
                          <Shield className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-slate-900">Under Review</p>
                          <p className="text-sm text-slate-500">Pending approval requests</p>
                        </div>
                        <span className="text-xl font-bold text-blue-600">{pendingPayments}</span>
                      </div>

                      <div className="flex items-center justify-center">
                        <div className="h-8 w-0.5 bg-slate-200"></div>
                      </div>

                      <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-xl">
                        <div className="p-2 bg-purple-100 rounded-full">
                          <Send className="h-5 w-5 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-slate-900">Disbursed to Beneficiaries</p>
                          <p className="text-sm text-slate-500">Funds delivered to recipients</p>
                        </div>
                        <span className="text-xl font-bold text-purple-600">${Math.floor(stats.totalRaised * 0.7).toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5 text-slate-600" />
                      Administrative Actions
                    </CardTitle>
                    <CardDescription>Quick access to common admin tasks</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-between h-auto py-4 px-4 bg-slate-50 border-0 hover:bg-slate-100">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Users className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="text-left">
                            <p className="font-semibold text-slate-900">Manage Users</p>
                            <p className="text-xs text-slate-500">View, edit, or deactivate user accounts</p>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-slate-400" />
                      </Button>

                      <Button variant="outline" className="w-full justify-between h-auto py-4 px-4 bg-slate-50 border-0 hover:bg-slate-100">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-purple-100 rounded-lg">
                            <Building2 className="h-5 w-5 text-purple-600" />
                          </div>
                          <div className="text-left">
                            <p className="font-semibold text-slate-900">Verify NGOs</p>
                            <p className="text-xs text-slate-500">Review and approve NGO registrations</p>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-slate-400" />
                      </Button>

                      <Button variant="outline" className="w-full justify-between h-auto py-4 px-4 bg-slate-50 border-0 hover:bg-slate-100">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <Target className="h-5 w-5 text-green-600" />
                          </div>
                          <div className="text-left">
                            <p className="font-semibold text-slate-900">Approve Campaigns</p>
                            <p className="text-xs text-slate-500">Review new campaign submissions</p>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-slate-400" />
                      </Button>

                      <Button variant="outline" className="w-full justify-between h-auto py-4 px-4 bg-slate-50 border-0 hover:bg-slate-100">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-orange-100 rounded-lg">
                            <FileText className="h-5 w-5 text-orange-600" />
                          </div>
                          <div className="text-left">
                            <p className="font-semibold text-slate-900">Generate Reports</p>
                            <p className="text-xs text-slate-500">Export financial and activity reports</p>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-slate-400" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
