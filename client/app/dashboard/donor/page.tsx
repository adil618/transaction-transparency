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
  Heart, 
  DollarSign, 
  Target, 
  TrendingUp, 
  Send, 
  Clock, 
  CheckCircle2, 
  Users, 
  Eye,
  ArrowUpRight,
  Wallet,
  Calendar,
  Gift,
  HandHeart,
  Search,
  Filter,
  ChevronRight
} from "lucide-react";

type Campaign = {
  _id: string;
  title: string;
  description: string;
  goalAmount: number;
  currentAmount: number;
  status: string;
  ngo?: { name: string; logo?: string };
  image?: string;
  beneficiaryCount?: number;
  donorCount?: number;
};

type Donation = {
  _id: string;
  amount: number;
  currency: string;
  transactionRef: string;
  status: string;
  createdAt: string;
  campaign?: { 
    title: string; 
    image?: string;
    ngo?: { name: string };
  };
  beneficiary?: {
    name: string;
    photo?: string;
    needDescription?: string;
  };
};

type DonorStats = {
  totalDonated: number;
  donationCount: number;
  campaignsSupported: number;
  beneficiariesHelped: number;
};

export default function DonorDashboard() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [stats, setStats] = useState<DonorStats>({
    totalDonated: 0,
    donationCount: 0,
    campaignsSupported: 0,
    beneficiariesHelped: 0,
  });
  const [donationAmount, setDonationAmount] = useState<Record<string, string>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [quickDonateAmount, setQuickDonateAmount] = useState("");
  const [selectedCampaign, setSelectedCampaign] = useState<string>("");

  const load = async () => {
    try {
      const campaignData = await apiFetch<Campaign[]>("/api/campaigns");
      const donationData = await apiFetch<Donation[]>("/api/donations/mine");
      setCampaigns(campaignData);
      setDonations(donationData);
      
      // Calculate stats
      const totalDonated = donationData.reduce((sum, d) => sum + d.amount, 0);
      const campaignsSupported = new Set(donationData.map(d => d.campaign?.title)).size;
      setStats({
        totalDonated,
        donationCount: donationData.length,
        campaignsSupported,
        beneficiariesHelped: Math.floor(campaignsSupported * 2.5),
      });
    } catch (error) {
      console.error("Failed to load data:", error);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const donate = async (campaignId: string) => {
    const amount = Number(donationAmount[campaignId] || 0);
    if (!amount) return;
    await apiFetch("/api/donations", {
      method: "POST",
      body: JSON.stringify({ campaignId, amount }),
    });
    setDonationAmount({ ...donationAmount, [campaignId]: "" });
    await load();
  };

  const quickDonate = async () => {
    if (!selectedCampaign || !quickDonateAmount) return;
    await apiFetch("/api/donations", {
      method: "POST",
      body: JSON.stringify({ campaignId: selectedCampaign, amount: Number(quickDonateAmount) }),
    });
    setQuickDonateAmount("");
    setSelectedCampaign("");
    await load();
  };

  const filteredCampaigns = campaigns.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.ngo?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'processing': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <ProtectedRoute roles={["donor"]}>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
          <div className="mx-auto max-w-7xl px-6 py-12">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="animate-fadeIn">
                <h1 className="text-4xl font-bold mb-2">Welcome Back, Donor!</h1>
                <p className="text-blue-100 text-lg">Your generosity is making a real difference in people&apos;s lives.</p>
              </div>
              
              {/* Quick Donate Card */}
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white w-full lg:w-auto animate-fadeIn opacity-0 [animation-delay:0.2s]">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Send className="h-5 w-5" />
                    Quick Donate
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <select 
                    value={selectedCampaign}
                    onChange={(e) => setSelectedCampaign(e.target.value)}
                    className="w-full p-3 rounded-lg bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:ring-2 focus:ring-white/50"
                  >
                    <option value="" className="text-gray-900">Select Campaign</option>
                    {campaigns.filter(c => c.status === 'ACTIVE').map(c => (
                      <option key={c._id} value={c._id} className="text-gray-900">{c.title}</option>
                    ))}
                  </select>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Amount ($)"
                      value={quickDonateAmount}
                      onChange={(e) => setQuickDonateAmount(e.target.value)}
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                    />
                    <Button onClick={quickDonate} className="bg-white text-purple-600 hover:bg-white/90 font-semibold">
                      <Heart className="h-4 w-4 mr-1" /> Donate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 py-8 space-y-8">
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group animate-fadeIn opacity-0 [animation-delay:0.1s]">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Total Donated</p>
                    <p className="text-3xl font-bold text-slate-900">${stats.totalDonated.toLocaleString()}</p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-green-400 to-green-600 rounded-xl transition-transform duration-300 group-hover:scale-110">
                    <Wallet className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-3 text-sm text-green-600">
                  <ArrowUpRight className="h-4 w-4" />
                  <span>+12% from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group animate-fadeIn opacity-0 [animation-delay:0.15s]">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Total Donations</p>
                    <p className="text-3xl font-bold text-slate-900">{stats.donationCount}</p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl transition-transform duration-300 group-hover:scale-110">
                    <Gift className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-3 text-sm text-blue-600">
                  <Calendar className="h-4 w-4" />
                  <span>Last: {donations[0] ? formatDate(donations[0].createdAt) : 'N/A'}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group animate-fadeIn opacity-0 [animation-delay:0.2s]">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Campaigns Supported</p>
                    <p className="text-3xl font-bold text-slate-900">{stats.campaignsSupported}</p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl transition-transform duration-300 group-hover:scale-110">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-3 text-sm text-purple-600">
                  <TrendingUp className="h-4 w-4" />
                  <span>Across multiple NGOs</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group animate-fadeIn opacity-0 [animation-delay:0.25s]">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Lives Impacted</p>
                    <p className="text-3xl font-bold text-slate-900">{stats.beneficiariesHelped}</p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-pink-400 to-pink-600 rounded-xl transition-transform duration-300 group-hover:scale-110">
                    <HandHeart className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-3 text-sm text-pink-600">
                  <Users className="h-4 w-4" />
                  <span>Beneficiaries helped</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="campaigns" className="space-y-6">
            <TabsList className="bg-white shadow-lg p-1 rounded-xl">
              <TabsTrigger value="campaigns" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-lg px-6">
                <Target className="h-4 w-4 mr-2" /> Active Campaigns
              </TabsTrigger>
              <TabsTrigger value="transactions" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-lg px-6">
                <Clock className="h-4 w-4 mr-2" /> My Transactions
              </TabsTrigger>
              <TabsTrigger value="impact" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-lg px-6">
                <Eye className="h-4 w-4 mr-2" /> Impact Tracking
              </TabsTrigger>
            </TabsList>

            {/* Campaigns Tab */}
            <TabsContent value="campaigns" className="space-y-6 animate-fadeIn">
              {/* Search Bar */}
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input 
                    placeholder="Search campaigns or NGOs..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 bg-white shadow-lg border-0"
                  />
                </div>
                <Button variant="outline" className="h-12 px-6 bg-white shadow-lg border-0">
                  <Filter className="h-4 w-4 mr-2" /> Filters
                </Button>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredCampaigns.map((c, index) => {
                  const progress = (c.currentAmount / c.goalAmount) * 100;
                  return (
                    <Card key={c._id} className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group animate-fadeIn opacity-0" style={{animationDelay: `${0.1 + index * 0.05}s`}}>
                      {/* Campaign Image */}
                      <div className="relative h-48 bg-gradient-to-br from-blue-400 to-purple-500 overflow-hidden">
                        {c.image ? (
                          <img src={c.image} alt={c.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <Target className="h-16 w-16 text-white/50" />
                          </div>
                        )}
                        <div className="absolute top-4 right-4">
                          <Badge className={`${c.status === 'ACTIVE' ? 'bg-green-500' : 'bg-gray-500'} text-white border-0`}>
                            {c.status}
                          </Badge>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                          <h3 className="font-bold text-white text-lg">{c.title}</h3>
                          <p className="text-white/80 text-sm">{c.ngo?.name}</p>
                        </div>
                      </div>

                      <CardContent className="p-5 space-y-4">
                        <p className="text-sm text-slate-600 line-clamp-2">{c.description}</p>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm font-semibold">
                            <span className="text-green-600">${c.currentAmount.toLocaleString()} raised</span>
                            <span className="text-slate-500">of ${c.goalAmount.toLocaleString()}</span>
                          </div>
                          <div className="relative">
                            <Progress value={progress} className="h-3 bg-slate-100" />
                          </div>
                          <div className="flex items-center justify-between text-xs text-slate-500">
                            <span className="font-semibold text-blue-600">{progress.toFixed(0)}% funded</span>
                            <div className="flex items-center gap-3">
                              <span className="flex items-center gap-1">
                                <Users className="h-3 w-3" /> {c.donorCount || Math.floor(Math.random() * 50) + 10} donors
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Input
                            type="number"
                            placeholder="Amount ($)"
                            value={donationAmount[c._id] || ""}
                            onChange={(e) => setDonationAmount({ ...donationAmount, [c._id]: e.target.value })}
                            className="flex-1 h-10"
                          />
                          <Button 
                            onClick={() => donate(c._id)} 
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-10"
                          >
                            <Heart className="h-4 w-4 mr-1" /> Donate
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
                {filteredCampaigns.length === 0 && (
                  <Card className="col-span-full border-0 shadow-lg">
                    <CardContent className="text-center py-16">
                      <Target className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                      <p className="text-slate-500 text-lg">No campaigns found</p>
                      <p className="text-slate-400 text-sm mt-2">Try adjusting your search criteria</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            {/* Transactions Tab */}
            <TabsContent value="transactions" className="space-y-4 animate-fadeIn">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    Transaction History
                  </CardTitle>
                  <CardDescription>Complete record of all your donations with receiver details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {donations.map((d, index) => (
                      <div 
                        key={d._id} 
                        className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors duration-300 animate-fadeIn opacity-0"
                        style={{animationDelay: `${0.1 + index * 0.05}s`}}
                      >
                        {/* Receiver/Beneficiary Photo */}
                        <Avatar className="h-14 w-14 border-2 border-white shadow-lg">
                          <AvatarImage src={d.beneficiary?.photo || d.campaign?.image} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white">
                            {d.beneficiary?.name?.charAt(0) || d.campaign?.title?.charAt(0) || 'D'}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-slate-900 truncate">
                              {d.campaign?.title || 'Campaign'}
                            </h4>
                            <Badge className={`${getStatusColor(d.status)} text-xs`}>
                              {d.status || 'Completed'}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-500">
                            {d.beneficiary?.name ? `To: ${d.beneficiary.name}` : d.campaign?.ngo?.name || 'NGO'}
                          </p>
                          <p className="text-xs text-slate-400 mt-1">
                            Ref: {d.transactionRef} • {formatDate(d.createdAt)}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-xl font-bold text-green-600">
                            ${d.amount.toLocaleString()}
                          </p>
                          <p className="text-xs text-slate-400">{d.currency}</p>
                        </div>

                        <ChevronRight className="h-5 w-5 text-slate-400" />
                      </div>
                    ))}
                    {donations.length === 0 && (
                      <div className="text-center py-16">
                        <Heart className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                        <p className="text-slate-500 text-lg">No transactions yet</p>
                        <p className="text-slate-400 text-sm mt-2">Your donation history will appear here</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Impact Tracking Tab */}
            <TabsContent value="impact" className="space-y-6 animate-fadeIn">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Impact Summary */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      Your Impact Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <Wallet className="h-5 w-5 text-green-600" />
                          </div>
                          <span className="font-medium text-slate-700">Total Contribution</span>
                        </div>
                        <span className="text-2xl font-bold text-green-600">${stats.totalDonated.toLocaleString()}</span>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Users className="h-5 w-5 text-blue-600" />
                          </div>
                          <span className="font-medium text-slate-700">Lives Touched</span>
                        </div>
                        <span className="text-2xl font-bold text-blue-600">{stats.beneficiariesHelped}</span>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-purple-100 rounded-lg">
                            <Target className="h-5 w-5 text-purple-600" />
                          </div>
                          <span className="font-medium text-slate-700">Campaigns Supported</span>
                        </div>
                        <span className="text-2xl font-bold text-purple-600">{stats.campaignsSupported}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Beneficiaries Helped */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <HandHeart className="h-5 w-5 text-pink-600" />
                      People You&apos;ve Helped
                    </CardTitle>
                    <CardDescription>Beneficiaries who received your support</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {donations.slice(0, 5).map((d, index) => (
                        <div key={d._id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                          <Avatar className="h-12 w-12 border-2 border-white shadow">
                            <AvatarImage src={d.beneficiary?.photo} />
                            <AvatarFallback className="bg-gradient-to-br from-pink-400 to-purple-500 text-white">
                              {d.beneficiary?.name?.charAt(0) || 'B'}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium text-slate-900">
                              {d.beneficiary?.name || `Beneficiary ${index + 1}`}
                            </p>
                            <p className="text-sm text-slate-500 truncate">
                              {d.beneficiary?.needDescription || d.campaign?.title}
                            </p>
                          </div>
                          <Badge className="bg-green-100 text-green-700">
                            <CheckCircle2 className="h-3 w-3 mr-1" /> Helped
                          </Badge>
                        </div>
                      ))}
                      {donations.length === 0 && (
                        <div className="text-center py-8">
                          <Users className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                          <p className="text-slate-500">Start donating to see your impact!</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Impact Timeline */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    Your Giving Journey
                  </CardTitle>
                  <CardDescription>Timeline of your contributions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>
                    <div className="space-y-6 ml-8">
                      {donations.slice(0, 6).map((d, index) => (
                        <div key={d._id} className="relative flex items-start gap-4 animate-fadeIn opacity-0" style={{animationDelay: `${0.1 + index * 0.1}s`}}>
                          <div className="absolute -left-8 w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 border-4 border-white shadow"></div>
                          <div className="flex-1 bg-slate-50 p-4 rounded-xl">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-slate-900">{d.campaign?.title}</span>
                              <span className="text-lg font-bold text-green-600">${d.amount}</span>
                            </div>
                            <p className="text-sm text-slate-500">{formatDate(d.createdAt)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  );
}
