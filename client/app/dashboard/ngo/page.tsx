"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import ProtectedRoute from "@/components/protected-route";
import { apiFetch } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target, Users, DollarSign, Plus, Heart, TrendingUp } from "lucide-react";

type Campaign = {
  _id: string;
  title: string;
  goalAmount: number;
  currentAmount: number;
  status: string;
};

type Beneficiary = {
  _id: string;
  name: string;
  needDescription: string;
  status: string;
};

type Donation = {
  _id: string;
  amount: number;
  currency: string;
  transactionRef: string;
  campaign?: { title: string };
  donor?: { name: string; email: string };
};

export default function NgoDashboard() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const [transactions, setTransactions] = useState<Donation[]>([]);
  const [campaignForm, setCampaignForm] = useState({
    title: "",
    description: "",
    goalAmount: "",
  });
  const [beneficiaryForm, setBeneficiaryForm] = useState({
    name: "",
    needDescription: "",
  });

  const load = async () => {
    const myCampaigns = await apiFetch<Campaign[]>("/api/campaigns/mine");
    const myBeneficiaries = await apiFetch<Beneficiary[]>(
      "/api/beneficiaries/mine"
    );
    const ngoTx = await apiFetch<Donation[]>("/api/donations/ngo");
    setCampaigns(myCampaigns);
    setBeneficiaries(myBeneficiaries);
    setTransactions(ngoTx);
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

  return (
    <ProtectedRoute roles={["ngo"]}>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 p-6">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="text-center animate-fadeIn">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-purple-600">
              NGO Dashboard
            </h1>
            <p className="text-slate-600 mt-2 text-lg">Manage your campaigns, beneficiaries, and track donations</p>
          </div>

          <section className="grid gap-6 lg:grid-cols-2">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 animate-fadeIn opacity-0 [animation-delay:0.1s]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-600">
                  <Plus className="h-5 w-5" />
                  Create Campaign
                </CardTitle>
                <CardDescription>Start a new fundraising campaign</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={createCampaign}>
                  <Input
                    placeholder="Campaign Title"
                    value={campaignForm.title}
                    onChange={(e) =>
                      setCampaignForm({ ...campaignForm, title: e.target.value })
                    }
                    required
                    className="transition-all duration-300 focus:scale-[1.02]"
                  />
                  <Input
                    placeholder="Description"
                    value={campaignForm.description}
                    onChange={(e) =>
                      setCampaignForm({ ...campaignForm, description: e.target.value })
                    }
                    required
                    className="transition-all duration-300 focus:scale-[1.02]"
                  />
                  <Input
                    placeholder="Goal Amount ($)"
                    type="number"
                    value={campaignForm.goalAmount}
                    onChange={(e) =>
                      setCampaignForm({ ...campaignForm, goalAmount: e.target.value })
                    }
                    required
                    className="transition-all duration-300 focus:scale-[1.02]"
                  />
                  <Button type="submit" className="w-full transition-all duration-300 hover:scale-105 hover:shadow-lg bg-gradient-to-r from-blue-600 to-purple-600">
                    Create Campaign
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 animate-fadeIn opacity-0 [animation-delay:0.2s]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-600">
                  <Users className="h-5 w-5" />
                  Add Beneficiary
                </CardTitle>
                <CardDescription>Add someone who will benefit from your campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={createBeneficiary}>
                  <Input
                    placeholder="Beneficiary Name"
                    value={beneficiaryForm.name}
                    onChange={(e) =>
                      setBeneficiaryForm({ ...beneficiaryForm, name: e.target.value })
                    }
                    required
                    className="transition-all duration-300 focus:scale-[1.02]"
                  />
                  <Input
                    placeholder="Need Description"
                    value={beneficiaryForm.needDescription}
                    onChange={(e) =>
                      setBeneficiaryForm({
                        ...beneficiaryForm,
                        needDescription: e.target.value,
                      })
                    }
                    required
                    className="transition-all duration-300 focus:scale-[1.02]"
                  />
                  <Button type="submit" className="w-full transition-all duration-300 hover:scale-105 hover:shadow-lg bg-gradient-to-r from-purple-600 to-pink-600">
                    Add Beneficiary
                  </Button>
                </form>
              </CardContent>
            </Card>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-6 animate-fadeIn opacity-0 [animation-delay:0.3s]">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-semibold">My Campaigns</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {campaigns.map((c, index) => {
                const progress = (c.currentAmount / c.goalAmount) * 100;
                return (
                  <Card key={c._id} className={`border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-fadeIn opacity-0`} style={{animationDelay: `${0.4 + index * 0.1}s`}}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="group-hover:text-blue-600 transition-colors duration-300">{c.title}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          c.status === 'ACTIVE' ? 'bg-gradient-to-r from-green-400 to-green-600 text-white' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {c.status}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm font-semibold">
                          <span className="text-blue-600">${c.currentAmount.toLocaleString()}</span>
                          <span className="text-slate-500">Goal: ${c.goalAmount.toLocaleString()}</span>
                        </div>
                        <div className="relative">
                          <Progress value={progress} className="h-3 bg-slate-200" />
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full"></div>
                        </div>
                        <p className="text-xs text-slate-500 font-medium">{progress.toFixed(1)}% funded</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
              {campaigns.length === 0 && (
                <Card className="col-span-full border-0 shadow-lg animate-fadeIn">
                  <CardContent className="text-center py-12">
                    <Target className="h-12 w-12 text-slate-400 mx-auto mb-4 animate-float" />
                    <p className="text-slate-500">No campaigns created yet. Start your first campaign!</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-6 animate-fadeIn opacity-0 [animation-delay:0.5s]">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-semibold">Beneficiaries</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {beneficiaries.map((b, index) => (
                <Card key={b._id} className={`border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-fadeIn opacity-0`} style={{animationDelay: `${0.6 + index * 0.05}s`}}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between text-base">
                      <span className="text-slate-900">{b.name}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        b.status === 'ACTIVE' ? 'bg-gradient-to-r from-green-400 to-green-600 text-white' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {b.status}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600">{b.needDescription}</p>
                  </CardContent>
                </Card>
              ))}
              {beneficiaries.length === 0 && (
                <Card className="col-span-full border-0 shadow-lg animate-fadeIn">
                  <CardContent className="text-center py-12">
                    <Users className="h-12 w-12 text-slate-400 mx-auto mb-4 animate-float" />
                    <p className="text-slate-500">No beneficiaries added yet. Help those in need!</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-6 animate-fadeIn opacity-0 [animation-delay:0.7s]">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold">Recent Donations</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {transactions.map((t, index) => (
                <Card key={t._id} className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fadeIn opacity-0`} style={{animationDelay: `${0.8 + index * 0.05}s`}}>
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-slate-900">{t.campaign?.title}</p>
                        <p className="text-sm text-slate-500 mt-1">{t.donor?.name} • {t.donor?.email}</p>
                      </div>
                      <div className="flex items-center gap-1 text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                        <DollarSign className="h-5 w-5" />
                        <span className="font-bold text-lg">{t.amount} {t.currency}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {transactions.length === 0 && (
                <Card className="col-span-full border-0 shadow-lg animate-fadeIn">
                  <CardContent className="text-center py-12">
                    <Heart className="h-12 w-12 text-slate-400 mx-auto mb-4 animate-float" />
                    <p className="text-slate-500">No donations received yet. Share your campaigns to get started!</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </section>
        </div>
      </div>
    </ProtectedRoute>
  );
}
