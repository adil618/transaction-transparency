"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import ProtectedRoute from "@/components/protected-route";
import { apiFetch } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
    <ProtectedRoute roles={["DONOR"]}>
      <Navbar />
      <div className="p-6 space-y-8">
        <section>
          <h2 className="text-xl font-semibold">Active Campaigns</h2>
          <div className="mt-4 space-y-4">
            {campaigns.map((c) => (
              <div
                key={c._id}
                className="rounded-md border border-slate-200 bg-white p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{c.title}</div>
                    <div className="text-sm text-slate-600">
                      {c.ngo?.name} · {c.status}
                    </div>
                  </div>
                  <div className="text-sm text-slate-700">
                    {c.currentAmount} / {c.goalAmount}
                  </div>
                </div>
                <p className="text-sm text-slate-600">{c.description}</p>
                <div className="flex items-center gap-2">
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
                  />
                  <Button onClick={() => donate(c._id)}>Donate</Button>
                </div>
              </div>
            ))}
            {campaigns.length === 0 && (
              <div className="text-sm text-slate-500">No campaigns available.</div>
            )}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold">My Donations</h2>
          <div className="mt-4 space-y-2">
            {donations.map((d) => (
              <div
                key={d._id}
                className="flex items-center justify-between rounded-md border border-slate-200 bg-white p-4"
              >
                <div className="font-medium">{d.campaign?.title}</div>
                <div className="text-sm text-slate-700">
                  {d.amount} {d.currency}
                </div>
              </div>
            ))}
            {donations.length === 0 && (
              <div className="text-sm text-slate-500">No donations yet.</div>
            )}
          </div>
        </section>
      </div>
    </ProtectedRoute>
  );
}
