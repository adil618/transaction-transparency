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
      <div className="p-6 space-y-8">
        <section className="grid gap-6 lg:grid-cols-2">
          <form
            className="rounded-md border border-slate-200 bg-white p-4 space-y-3"
            onSubmit={createCampaign}
          >
            <h2 className="text-lg font-semibold">Create Campaign</h2>
            <Input
              placeholder="Title"
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
              placeholder="Goal Amount"
              type="number"
              value={campaignForm.goalAmount}
              onChange={(e) =>
                setCampaignForm({ ...campaignForm, goalAmount: e.target.value })
              }
              required
            />
            <Button type="submit">Create</Button>
          </form>

          <form
            className="rounded-md border border-slate-200 bg-white p-4 space-y-3"
            onSubmit={createBeneficiary}
          >
            <h2 className="text-lg font-semibold">Add Beneficiary</h2>
            <Input
              placeholder="Name"
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
            <Button type="submit">Add</Button>
          </form>
        </section>

        <section>
          <h2 className="text-xl font-semibold">My Campaigns</h2>
          <div className="mt-4 space-y-2">
            {campaigns.map((c) => (
              <div
                key={c._id}
                className="flex items-center justify-between rounded-md border border-slate-200 bg-white p-4"
              >
                <div>
                  <div className="font-medium">{c.title}</div>
                  <div className="text-sm text-slate-600">{c.status}</div>
                </div>
                <div className="text-sm text-slate-700">
                  {c.currentAmount} / {c.goalAmount}
                </div>
              </div>
            ))}
            {campaigns.length === 0 && (
              <div className="text-sm text-slate-500">No campaigns yet.</div>
            )}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Beneficiaries</h2>
          <div className="mt-4 space-y-2">
            {beneficiaries.map((b) => (
              <div
                key={b._id}
                className="flex items-center justify-between rounded-md border border-slate-200 bg-white p-4"
              >
                <div>
                  <div className="font-medium">{b.name}</div>
                  <div className="text-sm text-slate-600">{b.needDescription}</div>
                </div>
                <div className="text-sm text-slate-700">{b.status}</div>
              </div>
            ))}
            {beneficiaries.length === 0 && (
              <div className="text-sm text-slate-500">No beneficiaries yet.</div>
            )}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Recent Donations</h2>
          <div className="mt-4 space-y-2">
            {transactions.map((t) => (
              <div
                key={t._id}
                className="flex items-center justify-between rounded-md border border-slate-200 bg-white p-4"
              >
                <div>
                  <div className="font-medium">{t.campaign?.title}</div>
                  <div className="text-sm text-slate-600">
                    {t.donor?.name} · {t.donor?.email}
                  </div>
                </div>
                <div className="text-sm text-slate-700">
                  {t.amount} {t.currency}
                </div>
              </div>
            ))}
            {transactions.length === 0 && (
              <div className="text-sm text-slate-500">No donations yet.</div>
            )}
          </div>
        </section>
      </div>
    </ProtectedRoute>
  );
}
