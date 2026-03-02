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
    <ProtectedRoute roles={["NGO"]}>
      <Navbar />
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-slate-900">NGO Dashboard</h1>
            <p className="text-slate-600 mt-2">Manage your campaigns, beneficiaries, and track donations</p>
          </div>

          <section className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
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
                  />
                  <Input
                    placeholder="Description"
                    value={campaignForm.description}
                    onChange={(e) =>
                      setCampaignForm({ ...campaignForm, description: e.target.value })
                    }
                    required
                  />
                  <Input
                    placeholder="Goal Amount ($)"
                    type="number"
                    value={campaignForm.goalAmount}
                    onChange={(e) =>
                      setCampaignForm({ ...campaignForm, goalAmount: e.target.value })
                    }
                    required
                  />
                  <Button type="submit" className="w-full">Create Campaign</Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
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
                  />
                  <Button type="submit" className="w-full">Add Beneficiary</Button>
                </form>
              </CardContent>
            </Card>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-6">
              <Target className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-semibold">My Campaigns</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {campaigns.map((c) => {
                const progress = (c.currentAmount / c.goalAmount) * 100;
                return (
                  <Card key={c._id}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        {c.title}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          c.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {c.status}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Raised: ${c.currentAmount.toLocaleString()}</span>
                          <span>Goal: ${c.goalAmount.toLocaleString()}</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                        <p className="text-xs text-slate-500">{progress.toFixed(1)}% funded</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
              {campaigns.length === 0 && (
                <Card className="col-span-full">
                  <CardContent className="text-center py-12">
                    <Target className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-500">No campaigns created yet. Start your first campaign!</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-6">
              <Users className="h-6 w-6 text-purple-600" />
              <h2 className="text-2xl font-semibold">Beneficiaries</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {beneficiaries.map((b) => (
                <Card key={b._id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {b.name}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        b.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
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
                <Card className="col-span-full">
                  <CardContent className="text-center py-12">
                    <Users className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-500">No beneficiaries added yet. Help those in need!</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="h-6 w-6 text-green-600" />
              <h2 className="text-2xl font-semibold">Recent Donations</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {transactions.map((t) => (
                <Card key={t._id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{t.campaign?.title}</p>
                        <p className="text-sm text-slate-500">{t.donor?.name} • {t.donor?.email}</p>
                      </div>
                      <div className="flex items-center gap-1 text-green-600">
                        <DollarSign className="h-4 w-4" />
                        <span className="font-semibold">{t.amount} {t.currency}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {transactions.length === 0 && (
                <Card className="col-span-full">
                  <CardContent className="text-center py-12">
                    <Heart className="h-12 w-12 text-slate-400 mx-auto mb-4" />
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
