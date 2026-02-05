"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import ProtectedRoute from "@/components/protected-route";
import { apiFetch } from "@/lib/api";
import { Button } from "@/components/ui/button";

type Ngo = {
  _id: string;
  name: string;
  status: string;
  user?: { _id: string; name: string; email: string; status?: string };
};

type Donation = {
  _id: string;
  amount: number;
  currency: string;
  transactionRef: string;
  campaign?: { title: string };
  ngo?: { name: string };
  donor?: { name: string; email: string };
};

export default function AdminDashboard() {
  const [ngos, setNgos] = useState<Ngo[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);

  const load = async () => {
    const ngoData = await apiFetch<Ngo[]>("/api/admin/ngos");
    const donationData = await apiFetch<Donation[]>("/api/donations/all");
    setNgos(ngoData);
    setDonations(donationData);
  };

  useEffect(() => {
    load();
  }, []);

  const approveNgo = async (id: string) => {
    await apiFetch(`/api/ngos/approve/${id}`, { method: "PUT" });
    await load();
  };

  const rejectNgo = async (id: string) => {
    await apiFetch(`/api/ngos/reject/${id}`, { method: "PUT" });
    await load();
  };

  const blockUser = async (id: string) => {
    await apiFetch(`/api/admin/users/${id}/block`, { method: "PUT" });
    await load();
  };

  const unblockUser = async (id: string) => {
    await apiFetch(`/api/admin/users/${id}/unblock`, { method: "PUT" });
    await load();
  };

  return (
    <ProtectedRoute roles={["ADMIN"]}>
      <Navbar />
      <div className="p-6 space-y-8">
        <section>
          <h2 className="text-xl font-semibold">NGO Approvals</h2>
          <div className="mt-4 space-y-3">
            {ngos.map((ngo) => (
              <div
                key={ngo._id}
                className="flex items-center justify-between rounded-md border border-slate-200 bg-white p-4"
              >
                <div>
                  <div className="font-medium">{ngo.name}</div>
                  <div className="text-sm text-slate-600">
                    {ngo.user?.email} · {ngo.status} · {ngo.user?.status || "active"}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => approveNgo(ngo._id)}>Approve</Button>
                  <Button variant="outline" onClick={() => rejectNgo(ngo._id)}>
                    Reject
                  </Button>
                  {ngo.user?._id && ngo.user?.status !== "blocked" && (
                    <Button variant="outline" onClick={() => blockUser(ngo.user!._id)}>
                      Block
                    </Button>
                  )}
                  {ngo.user?._id && ngo.user?.status === "blocked" && (
                    <Button variant="outline" onClick={() => unblockUser(ngo.user!._id)}>
                      Unblock
                    </Button>
                  )}
                </div>
              </div>
            ))}
            {ngos.length === 0 && (
              <div className="text-sm text-slate-500">No NGOs found.</div>
            )}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold">All Transactions</h2>
          <div className="mt-4 space-y-2">
            {donations.map((d) => (
              <div
                key={d._id}
                className="flex items-center justify-between rounded-md border border-slate-200 bg-white p-4"
              >
                <div>
                  <div className="font-medium">
                    {d.campaign?.title} · {d.ngo?.name}
                  </div>
                  <div className="text-sm text-slate-600">
                    {d.donor?.name} · {d.donor?.email}
                  </div>
                </div>
                <div className="text-right text-sm text-slate-700">
                  {d.amount} {d.currency}
                  <div className="text-xs text-slate-500">{d.transactionRef}</div>
                </div>
              </div>
            ))}
            {donations.length === 0 && (
              <div className="text-sm text-slate-500">No transactions yet.</div>
            )}
          </div>
        </section>
      </div>
    </ProtectedRoute>
  );
}
