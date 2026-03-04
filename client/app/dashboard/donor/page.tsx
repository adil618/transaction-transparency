"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import ProtectedRoute from "@/components/protected-route";
import { apiFetch } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Heart, DollarSign, Target, TrendingUp } from "lucide-react";

type Campaign = {
  _id: string;
  title: string;
  description: string;
  goalAmount: number;
  currentAmount: number;
  status: string;
  ngo?: { name: string };
};

type Donation = {
  _id: string;
  amount: number;
  currency: string;
  transactionRef: string;
  campaign?: { title: string };
};

export default function DonorDashboard() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [donationAmount, setDonationAmount] = useState<Record<string, string>>(
    {}
  );

  const load = async () => {
    const campaignData = await apiFetch<Campaign[]>("/api/campaigns");
    const donationData = await apiFetch<Donation[]>("/api/donations/mine");
    setCampaigns(campaignData);
    setDonations(donationData);
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

  return (
    <ProtectedRoute roles={["donor"]}>
      <Navbar />
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-slate-900">Donor Dashboard</h1>
            <p className="text-slate-600 mt-2">Support causes you care about and track your impact</p>
          </div>

          <section>
            <div className="flex items-center gap-2 mb-6">
              <Target className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-semibold">Active Campaigns</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {campaigns.map((c) => {
                const progress = (c.currentAmount / c.goalAmount) * 100;
                return (
                  <Card key={c._id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        {c.title}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          c.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {c.status}
                        </span>
                      </CardTitle>
                      <CardDescription>{c.ngo?.name}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-slate-600">{c.description}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Raised: ${c.currentAmount.toLocaleString()}</span>
                          <span>Goal: ${c.goalAmount.toLocaleString()}</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                        <p className="text-xs text-slate-500">{progress.toFixed(1)}% funded</p>
                      </div>
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          placeholder="Amount"
                          value={donationAmount[c._id] || ""}
                          onChange={(e) =>
                            setDonationAmount({
                              ...donationAmount,
                              [c._id]: e.target.value,
                            })
                          }
                          className="flex-1"
                        />
                        <Button onClick={() => donate(c._id)} className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          Donate
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
              {campaigns.length === 0 && (
                <Card className="col-span-full">
                  <CardContent className="text-center py-12">
                    <Target className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-500">No active campaigns available at the moment.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="h-6 w-6 text-green-600" />
              <h2 className="text-2xl font-semibold">My Donations</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {donations.map((d) => (
                <Card key={d._id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{d.campaign?.title}</p>
                        <p className="text-sm text-slate-500">Ref: {d.transactionRef}</p>
                      </div>
                      <div className="flex items-center gap-1 text-green-600">
                        <DollarSign className="h-4 w-4" />
                        <span className="font-semibold">{d.amount} {d.currency}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {donations.length === 0 && (
                <Card className="col-span-full">
                  <CardContent className="text-center py-12">
                    <Heart className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-500">You haven't made any donations yet. Start supporting a cause!</p>
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
