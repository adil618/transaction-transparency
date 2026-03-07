"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import ProtectedRoute from "@/components/protected-route";
import { apiFetch } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Target, 
  Users, 
  DollarSign, 
  Plus, 
  Heart, 
  TrendingUp,
  Wallet,
  FileText,
  Send,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Receipt,
  PieChart,
  BarChart3,
  Upload,
  Image as ImageIcon,
  CreditCard,
  Building2,
  ChevronRight,
  Eye
} from "lucide-react";

type Campaign = {
  _id: string;
  title: string;
  description?: string;
  goalAmount: number;
  currentAmount: number;
  status: string;
  image?: string;
  createdAt?: string;
};

type Beneficiary = {
  _id: string;
  name: string;
  needDescription: string;
  status: string;
  photo?: string;
  amountReceived?: number;
  campaign?: { title: string };
};

type Donation = {
  _id: string;
  amount: number;
  currency: string;
  transactionRef: string;
  status?: string;
  createdAt?: string;
  campaign?: { title: string };
  donor?: { name: string; email: string; photo?: string };
};

type PaymentRequest = {
  _id: string;
  amount: number;
  purpose: string;
  status: string;
  beneficiary?: { name: string; photo?: string };
  createdAt?: string;
  proofImage?: string;
};

type FundUsage = {
  _id: string;
  amount: number;
  description: string;
  beneficiary: { name: string; photo?: string };
  proofImage?: string;
  createdAt?: string;
  campaign?: { title: string };
};

type NgoStats = {
  totalRaised: number;
  totalDisbursed: number;
  pendingRequests: number;
  activeCampaigns: number;
  totalBeneficiaries: number;
  totalDonors: number;
};

export default function NgoDashboard() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const [transactions, setTransactions] = useState<Donation[]>([]);
  const [paymentRequests, setPaymentRequests] = useState<PaymentRequest[]>([]);
  const [fundUsages, setFundUsages] = useState<FundUsage[]>([]);
  const [stats, setStats] = useState<NgoStats>({
    totalRaised: 0,
    totalDisbursed: 0,
    pendingRequests: 0,
    activeCampaigns: 0,
    totalBeneficiaries: 0,
    totalDonors: 0,
  });
  
  const [campaignForm, setCampaignForm] = useState({
    title: "",
    description: "",
    goalAmount: "",
  });
  const [beneficiaryForm, setBeneficiaryForm] = useState({
    name: "",
    needDescription: "",
  });
  const [paymentRequestForm, setPaymentRequestForm] = useState({
    amount: "",
    purpose: "",
    beneficiaryId: "",
    campaignId: "",
  });
  const [fundUsageForm, setFundUsageForm] = useState({
    amount: "",
    description: "",
    beneficiaryId: "",
    campaignId: "",
  });
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showUsageModal, setShowUsageModal] = useState(false);

  const load = async () => {
    try {
      const myCampaigns = await apiFetch<Campaign[]>("/api/campaigns/mine");
      const myBeneficiaries = await apiFetch<Beneficiary[]>("/api/beneficiaries/mine");
      const ngoTx = await apiFetch<Donation[]>("/api/donations/ngo");
      
      setCampaigns(myCampaigns);
      setBeneficiaries(myBeneficiaries);
      setTransactions(ngoTx);
      
      // Calculate stats
      const totalRaised = ngoTx.reduce((sum, d) => sum + d.amount, 0);
      const uniqueDonors = new Set(ngoTx.map(d => d.donor?.email)).size;
      setStats({
        totalRaised,
        totalDisbursed: Math.floor(totalRaised * 0.7),
        pendingRequests: paymentRequests.filter(p => p.status === 'PENDING').length,
        activeCampaigns: myCampaigns.filter(c => c.status === 'ACTIVE').length,
        totalBeneficiaries: myBeneficiaries.length,
        totalDonors: uniqueDonors,
      });
    } catch (error) {
      console.error("Failed to load NGO data:", error);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const createCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    await apiFetch("/api/campaigns", {
      method: "POST",
      body: JSON.stringify({
        title: campaignForm.title,
        description: campaignForm.description,
        goalAmount: Number(campaignForm.goalAmount),
      }),
    });
    setCampaignForm({ title: "", description: "", goalAmount: "" });
    await load();
  };

  const createBeneficiary = async (e: React.FormEvent) => {
    e.preventDefault();
    await apiFetch("/api/beneficiaries", {
      method: "POST",
      body: JSON.stringify(beneficiaryForm),
    });
    setBeneficiaryForm({ name: "", needDescription: "" });
    await load();
  };

  const submitPaymentRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    // API call would go here
    setPaymentRequestForm({ amount: "", purpose: "", beneficiaryId: "", campaignId: "" });
    setShowPaymentModal(false);
    await load();
  };

  const recordFundUsage = async (e: React.FormEvent) => {
    e.preventDefault();
    // API call would go here
    setFundUsageForm({ amount: "", description: "", beneficiaryId: "", campaignId: "" });
    setShowUsageModal(false);
    await load();
  };

  const formatDate = (date?: string) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active': case 'approved': case 'completed': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'rejected': case 'inactive': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <ProtectedRoute roles={["ngo"]}>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white">
          <div className="mx-auto max-w-7xl px-6 py-12">
            <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
              <div className="animate-fadeIn">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-white/20 rounded-xl">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <h1 className="text-4xl font-bold">NGO Dashboard</h1>
                </div>
                <p className="text-purple-100 text-lg">Manage campaigns, request funds, and track your impact</p>
              </div>
              
              {/* Quick Actions */}
              <div className="flex gap-3 animate-fadeIn opacity-0 [animation-delay:0.2s]">
                <Button 
                  onClick={() => setShowPaymentModal(true)}
                  className="bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 text-white"
                >
                  <Send className="h-4 w-4 mr-2" /> Request Payment
                </Button>
                <Button 
                  onClick={() => setShowUsageModal(true)}
                  className="bg-white text-purple-600 hover:bg-white/90"
                >
                  <Receipt className="h-4 w-4 mr-2" /> Record Usage
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 py-8 space-y-8">
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group animate-fadeIn opacity-0 [animation-delay:0.1s]">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-gradient-to-br from-green-400 to-green-600 rounded-lg transition-transform duration-300 group-hover:scale-110">
                    <Wallet className="h-5 w-5 text-white" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                </div>
                <p className="text-2xl font-bold text-slate-900">${stats.totalRaised.toLocaleString()}</p>
                <p className="text-xs text-slate-500 mt-1">Total Raised</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group animate-fadeIn opacity-0 [animation-delay:0.15s]">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg transition-transform duration-300 group-hover:scale-110">
                    <Send className="h-5 w-5 text-white" />
                  </div>
                  <ArrowDownRight className="h-4 w-4 text-blue-500" />
                </div>
                <p className="text-2xl font-bold text-slate-900">${stats.totalDisbursed.toLocaleString()}</p>
                <p className="text-xs text-slate-500 mt-1">Disbursed</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group animate-fadeIn opacity-0 [animation-delay:0.2s]">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg transition-transform duration-300 group-hover:scale-110">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xs font-semibold text-yellow-600 bg-yellow-100 px-2 py-0.5 rounded-full">Pending</span>
                </div>
                <p className="text-2xl font-bold text-slate-900">{stats.pendingRequests}</p>
                <p className="text-xs text-slate-500 mt-1">Pending Requests</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group animate-fadeIn opacity-0 [animation-delay:0.25s]">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg transition-transform duration-300 group-hover:scale-110">
                    <Target className="h-5 w-5 text-white" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-slate-900">{stats.activeCampaigns}</p>
                <p className="text-xs text-slate-500 mt-1">Active Campaigns</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group animate-fadeIn opacity-0 [animation-delay:0.3s]">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-gradient-to-br from-pink-400 to-pink-600 rounded-lg transition-transform duration-300 group-hover:scale-110">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-slate-900">{stats.totalBeneficiaries}</p>
                <p className="text-xs text-slate-500 mt-1">Beneficiaries</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group animate-fadeIn opacity-0 [animation-delay:0.35s]">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-lg transition-transform duration-300 group-hover:scale-110">
                    <Heart className="h-5 w-5 text-white" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-slate-900">{stats.totalDonors}</p>
                <p className="text-xs text-slate-500 mt-1">Total Donors</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="campaigns" className="space-y-6">
            <TabsList className="bg-white shadow-lg p-1 rounded-xl flex-wrap">
              <TabsTrigger value="campaigns" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white rounded-lg px-4">
                <Target className="h-4 w-4 mr-2" /> Campaigns
              </TabsTrigger>
              <TabsTrigger value="beneficiaries" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white rounded-lg px-4">
                <Users className="h-4 w-4 mr-2" /> Beneficiaries
              </TabsTrigger>
              <TabsTrigger value="donations" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white rounded-lg px-4">
                <Heart className="h-4 w-4 mr-2" /> Donations
              </TabsTrigger>
              <TabsTrigger value="payments" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white rounded-lg px-4">
                <CreditCard className="h-4 w-4 mr-2" /> Payment Requests
              </TabsTrigger>
              <TabsTrigger value="usage" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white rounded-lg px-4">
                <FileText className="h-4 w-4 mr-2" /> Fund Usage
              </TabsTrigger>
            </TabsList>

            {/* Campaigns Tab */}
            <TabsContent value="campaigns" className="space-y-6 animate-fadeIn">
              <div className="grid gap-6 lg:grid-cols-3">
                {/* Create Campaign Form */}
                <Card className="border-0 shadow-lg lg:col-span-1">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-purple-600">
                      <Plus className="h-5 w-5" />
                      Create New Campaign
                    </CardTitle>
                    <CardDescription>Start a new fundraising campaign</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4" onSubmit={createCampaign}>
                      <Input
                        placeholder="Campaign Title"
                        value={campaignForm.title}
                        onChange={(e) => setCampaignForm({ ...campaignForm, title: e.target.value })}
                        required
                      />
                      <textarea
                        placeholder="Description"
                        value={campaignForm.description}
                        onChange={(e) => setCampaignForm({ ...campaignForm, description: e.target.value })}
                        required
                        className="w-full px-3 py-2 border rounded-lg resize-none h-24 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <Input
                        placeholder="Goal Amount ($)"
                        type="number"
                        value={campaignForm.goalAmount}
                        onChange={(e) => setCampaignForm({ ...campaignForm, goalAmount: e.target.value })}
                        required
                      />
                      <div className="p-4 border-2 border-dashed rounded-lg text-center cursor-pointer hover:border-purple-400 transition-colors">
                        <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                        <p className="text-sm text-slate-500">Upload Campaign Image</p>
                      </div>
                      <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-indigo-600">
                        Create Campaign
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Campaigns List */}
                <div className="lg:col-span-2 space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900">Your Campaigns</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {campaigns.map((c, index) => {
                      const progress = (c.currentAmount / c.goalAmount) * 100;
                      return (
                        <Card key={c._id} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 animate-fadeIn opacity-0" style={{animationDelay: `${0.1 + index * 0.05}s`}}>
                          <div className="relative h-32 bg-gradient-to-br from-purple-400 to-indigo-500 overflow-hidden">
                            {c.image ? (
                              <img src={c.image} alt={c.title} className="w-full h-full object-cover" />
                            ) : (
                              <div className="flex items-center justify-center h-full">
                                <Target className="h-12 w-12 text-white/50" />
                              </div>
                            )}
                            <Badge className={`absolute top-3 right-3 ${c.status === 'ACTIVE' ? 'bg-green-500' : 'bg-gray-500'} text-white border-0`}>
                              {c.status}
                            </Badge>
                          </div>
                          <CardContent className="p-4 space-y-3">
                            <h4 className="font-semibold text-slate-900 truncate">{c.title}</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-green-600 font-semibold">${c.currentAmount.toLocaleString()}</span>
                                <span className="text-slate-500">of ${c.goalAmount.toLocaleString()}</span>
                              </div>
                              <Progress value={progress} className="h-2" />
                              <p className="text-xs text-slate-500">{progress.toFixed(0)}% funded</p>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                  {campaigns.length === 0 && (
                    <Card className="border-0 shadow-lg">
                      <CardContent className="text-center py-12">
                        <Target className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                        <p className="text-slate-500">No campaigns created yet</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Beneficiaries Tab */}
            <TabsContent value="beneficiaries" className="space-y-6 animate-fadeIn">
              <div className="grid gap-6 lg:grid-cols-3">
                {/* Add Beneficiary Form */}
                <Card className="border-0 shadow-lg lg:col-span-1">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-pink-600">
                      <Plus className="h-5 w-5" />
                      Add Beneficiary
                    </CardTitle>
                    <CardDescription>Register someone who needs help</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4" onSubmit={createBeneficiary}>
                      <div className="flex justify-center mb-4">
                        <div className="relative">
                          <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                            <AvatarFallback className="bg-gradient-to-br from-pink-400 to-purple-500 text-white text-2xl">
                              <ImageIcon className="h-8 w-8" />
                            </AvatarFallback>
                          </Avatar>
                          <button type="button" className="absolute bottom-0 right-0 p-2 bg-purple-600 rounded-full text-white shadow-lg hover:bg-purple-700 transition-colors">
                            <Upload className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <Input
                        placeholder="Beneficiary Name"
                        value={beneficiaryForm.name}
                        onChange={(e) => setBeneficiaryForm({ ...beneficiaryForm, name: e.target.value })}
                        required
                      />
                      <textarea
                        placeholder="Need Description"
                        value={beneficiaryForm.needDescription}
                        onChange={(e) => setBeneficiaryForm({ ...beneficiaryForm, needDescription: e.target.value })}
                        required
                        className="w-full px-3 py-2 border rounded-lg resize-none h-24 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <Button type="submit" className="w-full bg-gradient-to-r from-pink-600 to-purple-600">
                        Add Beneficiary
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Beneficiaries List */}
                <div className="lg:col-span-2 space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900">Registered Beneficiaries</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {beneficiaries.map((b, index) => (
                      <Card key={b._id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 animate-fadeIn opacity-0" style={{animationDelay: `${0.1 + index * 0.05}s`}}>
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <Avatar className="h-14 w-14 border-2 border-white shadow-lg">
                              <AvatarImage src={b.photo} />
                              <AvatarFallback className="bg-gradient-to-br from-pink-400 to-purple-500 text-white text-lg">
                                {b.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="font-semibold text-slate-900 truncate">{b.name}</h4>
                                <Badge className={getStatusColor(b.status)}>{b.status}</Badge>
                              </div>
                              <p className="text-sm text-slate-600 line-clamp-2">{b.needDescription}</p>
                              {b.amountReceived !== undefined && (
                                <p className="text-xs text-green-600 mt-2 font-semibold">
                                  Received: ${b.amountReceived.toLocaleString()}
                                </p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  {beneficiaries.length === 0 && (
                    <Card className="border-0 shadow-lg">
                      <CardContent className="text-center py-12">
                        <Users className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                        <p className="text-slate-500">No beneficiaries added yet</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Donations Tab */}
            <TabsContent value="donations" className="space-y-6 animate-fadeIn">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    Received Donations
                  </CardTitle>
                  <CardDescription>All donations received by your organization</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transactions.map((t, index) => (
                      <div 
                        key={t._id} 
                        className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors duration-300 animate-fadeIn opacity-0"
                        style={{animationDelay: `${0.1 + index * 0.05}s`}}
                      >
                        <Avatar className="h-12 w-12 border-2 border-white shadow-lg">
                          <AvatarImage src={t.donor?.photo} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white">
                            {t.donor?.name?.charAt(0) || 'D'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-slate-900">{t.donor?.name || 'Anonymous'}</h4>
                          <p className="text-sm text-slate-500">{t.campaign?.title}</p>
                          <p className="text-xs text-slate-400 mt-1">{formatDate(t.createdAt)} • Ref: {t.transactionRef}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-green-600">${t.amount.toLocaleString()}</p>
                          <p className="text-xs text-slate-400">{t.currency}</p>
                        </div>
                      </div>
                    ))}
                    {transactions.length === 0 && (
                      <div className="text-center py-12">
                        <Heart className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                        <p className="text-slate-500">No donations received yet</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Payment Requests Tab */}
            <TabsContent value="payments" className="space-y-6 animate-fadeIn">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Payment Requests</h3>
                  <p className="text-sm text-slate-500">Request funds for beneficiaries</p>
                </div>
                <Button onClick={() => setShowPaymentModal(true)} className="bg-gradient-to-r from-purple-600 to-indigo-600">
                  <Plus className="h-4 w-4 mr-2" /> New Request
                </Button>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Sample payment requests */}
                {[
                  { _id: '1', amount: 500, purpose: 'Medical treatment for Ahmad', status: 'PENDING', beneficiary: { name: 'Ahmad Khan' }, createdAt: new Date().toISOString() },
                  { _id: '2', amount: 1200, purpose: 'Education support for Sara', status: 'APPROVED', beneficiary: { name: 'Sara Ahmed' }, createdAt: new Date(Date.now() - 86400000).toISOString() },
                  { _id: '3', amount: 800, purpose: 'Emergency food supplies', status: 'COMPLETED', beneficiary: { name: 'Community Center' }, createdAt: new Date(Date.now() - 172800000).toISOString() },
                ].map((request, index) => (
                  <Card key={request._id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-fadeIn opacity-0" style={{animationDelay: `${0.1 + index * 0.05}s`}}>
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                        <span className="text-xs text-slate-400">{formatDate(request.createdAt)}</span>
                      </div>
                      <p className="text-2xl font-bold text-slate-900 mb-2">${request.amount.toLocaleString()}</p>
                      <p className="text-sm text-slate-600 mb-3 line-clamp-2">{request.purpose}</p>
                      <div className="flex items-center gap-2 pt-3 border-t">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-purple-100 text-purple-600 text-xs">
                            {request.beneficiary?.name?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-slate-700">{request.beneficiary?.name}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Fund Usage Tab */}
            <TabsContent value="usage" className="space-y-6 animate-fadeIn">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Fund Usage Records</h3>
                  <p className="text-sm text-slate-500">Transparent record of how funds are used</p>
                </div>
                <Button onClick={() => setShowUsageModal(true)} className="bg-gradient-to-r from-green-600 to-teal-600">
                  <Plus className="h-4 w-4 mr-2" /> Record Usage
                </Button>
              </div>

              <div className="space-y-4">
                {/* Sample fund usage records */}
                {[
                  { _id: '1', amount: 500, description: 'Medicine and hospital fees', beneficiary: { name: 'Ahmad Khan', photo: '' }, proofImage: '', createdAt: new Date().toISOString(), campaign: { title: 'Medical Aid Campaign' } },
                  { _id: '2', amount: 350, description: 'School fees and books', beneficiary: { name: 'Sara Ahmed', photo: '' }, proofImage: '', createdAt: new Date(Date.now() - 86400000).toISOString(), campaign: { title: 'Education for All' } },
                  { _id: '3', amount: 800, description: 'Emergency food distribution', beneficiary: { name: 'Community Center', photo: '' }, proofImage: '', createdAt: new Date(Date.now() - 172800000).toISOString(), campaign: { title: 'Food Security Program' } },
                ].map((usage, index) => (
                  <Card key={usage._id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-fadeIn opacity-0" style={{animationDelay: `${0.1 + index * 0.05}s`}}>
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-14 w-14 border-2 border-white shadow-lg">
                          <AvatarImage src={usage.beneficiary?.photo} />
                          <AvatarFallback className="bg-gradient-to-br from-green-400 to-teal-500 text-white">
                            {usage.beneficiary?.name?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-slate-900">{usage.beneficiary?.name}</h4>
                              <p className="text-xs text-slate-500">{usage.campaign?.title}</p>
                            </div>
                            <p className="text-xl font-bold text-green-600">${usage.amount.toLocaleString()}</p>
                          </div>
                          <p className="text-sm text-slate-600 mb-2">{usage.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-400">{formatDate(usage.createdAt)}</span>
                            <Button variant="outline" size="sm" className="text-xs">
                              <Eye className="h-3 w-3 mr-1" /> View Proof
                            </Button>
                          </div>
                        </div>
                        {usage.proofImage && (
                          <div className="w-20 h-20 rounded-lg bg-slate-100 overflow-hidden">
                            <img src={usage.proofImage} alt="Proof" className="w-full h-full object-cover" />
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Payment Request Modal */}
        {showPaymentModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn">
            <Card className="w-full max-w-md mx-4 border-0 shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5 text-purple-600" />
                  Request Payment
                </CardTitle>
                <CardDescription>Submit a payment request for admin approval</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={submitPaymentRequest}>
                  <Input
                    placeholder="Amount ($)"
                    type="number"
                    value={paymentRequestForm.amount}
                    onChange={(e) => setPaymentRequestForm({ ...paymentRequestForm, amount: e.target.value })}
                    required
                  />
                  <select 
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={paymentRequestForm.beneficiaryId}
                    onChange={(e) => setPaymentRequestForm({ ...paymentRequestForm, beneficiaryId: e.target.value })}
                  >
                    <option value="">Select Beneficiary</option>
                    {beneficiaries.map(b => (
                      <option key={b._id} value={b._id}>{b.name}</option>
                    ))}
                  </select>
                  <select 
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={paymentRequestForm.campaignId}
                    onChange={(e) => setPaymentRequestForm({ ...paymentRequestForm, campaignId: e.target.value })}
                  >
                    <option value="">Select Campaign</option>
                    {campaigns.map(c => (
                      <option key={c._id} value={c._id}>{c.title}</option>
                    ))}
                  </select>
                  <textarea
                    placeholder="Purpose of the payment request"
                    value={paymentRequestForm.purpose}
                    onChange={(e) => setPaymentRequestForm({ ...paymentRequestForm, purpose: e.target.value })}
                    required
                    className="w-full px-3 py-2 border rounded-lg resize-none h-24 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <div className="flex gap-3">
                    <Button type="button" variant="outline" className="flex-1" onClick={() => setShowPaymentModal(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600">
                      Submit Request
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Fund Usage Modal */}
        {showUsageModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn">
            <Card className="w-full max-w-md mx-4 border-0 shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Receipt className="h-5 w-5 text-green-600" />
                  Record Fund Usage
                </CardTitle>
                <CardDescription>Document how funds were used with proof</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={recordFundUsage}>
                  <Input
                    placeholder="Amount Used ($)"
                    type="number"
                    value={fundUsageForm.amount}
                    onChange={(e) => setFundUsageForm({ ...fundUsageForm, amount: e.target.value })}
                    required
                  />
                  <select 
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={fundUsageForm.beneficiaryId}
                    onChange={(e) => setFundUsageForm({ ...fundUsageForm, beneficiaryId: e.target.value })}
                  >
                    <option value="">Select Beneficiary</option>
                    {beneficiaries.map(b => (
                      <option key={b._id} value={b._id}>{b.name}</option>
                    ))}
                  </select>
                  <textarea
                    placeholder="Description of how funds were used"
                    value={fundUsageForm.description}
                    onChange={(e) => setFundUsageForm({ ...fundUsageForm, description: e.target.value })}
                    required
                    className="w-full px-3 py-2 border rounded-lg resize-none h-24 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <div className="p-4 border-2 border-dashed rounded-lg text-center cursor-pointer hover:border-green-400 transition-colors">
                    <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm text-slate-500">Upload Proof Image (Receipt, Photo, etc.)</p>
                  </div>
                  <div className="flex gap-3">
                    <Button type="button" variant="outline" className="flex-1" onClick={() => setShowUsageModal(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" className="flex-1 bg-gradient-to-r from-green-600 to-teal-600">
                      Record Usage
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
