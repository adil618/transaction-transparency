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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 p-6">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="text-center animate-fadeIn">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-blue-600">
              Donor Dashboard
            </h1>
            <p className="text-slate-600 mt-2 text-lg">Support causes you care about and track your impact</p>
          </div>

          <section>
            <div className="flex items-center gap-3 mb-6 animate-fadeIn opacity-0 [animation-delay:0.1s]">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-semibold">Active Campaigns</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {campaigns.map((c, index) => {
                const progress = (c.currentAmount / c.goalAmount) * 100;
                return (
                  <Card key={c._id} className={`hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group animate-fadeIn opacity-0 border-0`} style={{animationDelay: `${0.2 + index * 0.1}s`}}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="group-hover:text-blue-600 transition-colors duration-300">{c.title}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          c.status === 'ACTIVE' ? 'bg-gradient-to-r from-green-400 to-green-600 text-white' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {c.status}
                        </span>
                      </CardTitle>
                      <CardDescription className="font-medium">{c.ngo?.name}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-slate-600">{c.description}</p>
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
                          className="flex-1 transition-all duration-300 focus:scale-[1.02]"
                        />
                        <Button onClick={() => donate(c._id)} className="flex items-center gap-1 transition-all duration-300 hover:scale-105 hover:shadow-lg bg-gradient-to-r from-blue-600 to-purple-600">
                          <Heart className="h-4 w-4" />
                          Donate
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
              {campaigns.length === 0 && (
                <Card className="col-span-full border-0 shadow-lg animate-fadeIn">
                  <CardContent className="text-center py-12">
                    <Target className="h-12 w-12 text-slate-400 mx-auto mb-4 animate-float" />
                    <p className="text-slate-500">No active campaigns available at the moment.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-6 animate-fadeIn opacity-0 [animation-delay:0.3s]">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold">My Donations</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {donations.map((d, index) => (
                <Card key={d._id} className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fadeIn opacity-0`} style={{animationDelay: `${0.4 + index * 0.05}s`}}>
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-slate-900">{d.campaign?.title}</p>
                        <p className="text-sm text-slate-500 mt-1">Ref: {d.transactionRef}</p>
                      </div>
                      <div className="flex items-center gap-1 text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                        <DollarSign className="h-5 w-5" />
                        <span className="font-bold text-lg">{d.amount} {d.currency}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {donations.length === 0 && (
                <Card className="col-span-full border-0 shadow-lg animate-fadeIn">
                  <CardContent className="text-center py-12">
                    <Heart className="h-12 w-12 text-slate-400 mx-auto mb-4 animate-float" />
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
