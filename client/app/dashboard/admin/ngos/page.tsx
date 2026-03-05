"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/admin-layout";
import ProtectedRoute from "@/components/protected-route";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { apiFetch } from "@/lib/api";
import { Search, Check, X, FileText, Send } from "lucide-react";
import { toast } from "sonner";

type Ngo = {
  _id: string;
  name: string;
  description?: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  documents?: {
    name?: string;
    url?: string;
  }[];
  user: {
    _id: string;
    name: string;
    email: string;
    status: string;
  };
};

type NgosResponse = {
  ngos: Ngo[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
};

export default function NgosPage() {
  const [ngos, setNgos] = useState<Ngo[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<NgosResponse['pagination'] | null>(null);
  
  // Payout dialog state
  const [payoutDialogOpen, setPayoutDialogOpen] = useState(false);
  const [selectedNgo, setSelectedNgo] = useState<Ngo | null>(null);
  const [payoutAmount, setPayoutAmount] = useState("");
  const [payoutDescription, setPayoutDescription] = useState("");
  const [payoutLoading, setPayoutLoading] = useState(false);

  const loadNgos = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        ...(search && { search }),
        ...(statusFilter && { status: statusFilter }),
      });

      const data = await apiFetch<NgosResponse>(`/api/admin/ngos?${params}`);
      setNgos(data.ngos);
      setPagination(data.pagination);
    } catch (error) {
      console.error("Failed to load NGOs:", error);
      toast.error("Failed to load NGOs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNgos();
  }, [page, search, statusFilter]);

  const handleApprove = async (ngoId: string) => {
    try {
      await apiFetch(`/api/admin/ngos/${ngoId}/approve`, {
        method: "PUT",
      });

      toast.success("NGO approved successfully");
      loadNgos();
    } catch (error) {
      console.error("Failed to approve NGO:", error);
      toast.error("Failed to approve NGO");
    }
  };

  const handleReject = async (ngoId: string) => {
    try {
      await apiFetch(`/api/admin/ngos/${ngoId}/reject`, {
        method: "PUT",
      });

      toast.success("NGO rejected successfully");
      loadNgos();
    } catch (error) {
      console.error("Failed to reject NGO:", error);
      toast.error("Failed to reject NGO");
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "approved":
        return "default";
      case "rejected":
        return "destructive";
      case "pending":
        return "secondary";
      default:
        return "outline";
    }
  };

  const openFirstDocument = (ngo: Ngo) => {
    const firstDocUrl = ngo.documents?.[0]?.url;
    if (!firstDocUrl) {
      toast.info("No documents uploaded for this NGO");
      return;
    }
    window.open(firstDocUrl, "_blank", "noopener,noreferrer");
  };

  const openPayoutDialog = (ngo: Ngo) => {
    if (ngo.status !== "approved") {
      toast.error("Only approved NGOs can receive payouts");
      return;
    }
    setSelectedNgo(ngo);
    setPayoutAmount("");
    setPayoutDescription("");
    setPayoutDialogOpen(true);
  };

  const handlePayout = async () => {
    if (!selectedNgo) return;

    const amount = parseFloat(payoutAmount);
    if (!amount || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    if (!payoutDescription.trim()) {
      toast.error("Please enter a description");
      return;
    }

    try {
      setPayoutLoading(true);
      await apiFetch(`/api/admin/ngos/${selectedNgo._id}/payout`, {
        method: "POST",
        body: JSON.stringify({
          amount,
          description: payoutDescription,
          currency: "USD"
        }),
      });

      toast.success(`Payout of $${amount} sent to ${selectedNgo.name}`);
      setPayoutDialogOpen(false);
      setSelectedNgo(null);
      setPayoutAmount("");
      setPayoutDescription("");
    } catch (error: any) {
      console.error("Failed to create payout:", error);
      toast.error(error?.message || "Failed to create payout");
    } finally {
      setPayoutLoading(false);
    }
  };

  return (
    <ProtectedRoute roles={["admin"]}>
      <AdminLayout>
        <div className="space-y-6">
          <div>
          <h1 className="text-3xl font-bold tracking-tight">NGOs</h1>
          <p className="text-muted-foreground">
            Manage NGO registrations and approvals.
          </p>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
            <CardDescription>Filter NGOs by status or search</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search NGOs..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-input bg-background rounded-md"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* NGOs Table */}
        <Card>
          <CardHeader>
            <CardTitle>NGOs ({pagination?.total || 0})</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-12 bg-muted animate-pulse rounded"></div>
                ))}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Organization</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ngos.map((ngo) => (
                    <TableRow key={ngo._id}>
                      <TableCell className="font-medium">{ngo.name}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{ngo.user?.name || "N/A"}</p>
                          <p className="text-sm text-muted-foreground">{ngo.user?.email || "N/A"}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="max-w-xs truncate">
                          {ngo.description || "No description"}
                        </p>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(ngo.status)}>
                          {ngo.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(ngo.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openFirstDocument(ngo)}
                            className="text-blue-600 hover:text-blue-700"
                            title="View uploaded document"
                          >
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openPayoutDialog(ngo)}
                            className="text-indigo-600 hover:text-indigo-700"
                            title="Send money to NGO"
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                          {ngo.status === "pending" && (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleApprove(ngo._id)}
                                className="text-green-600 hover:text-green-700"
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleReject(ngo._id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}

            {/* Pagination */}
            {pagination && pagination.pages > 1 && (
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-muted-foreground">
                  Showing {((pagination.page - 1) * pagination.limit) + 1} to{" "}
                  {Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
                  {pagination.total} NGOs
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(page + 1)}
                    disabled={page === pagination.pages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Payout Dialog */}
        <Dialog open={payoutDialogOpen} onOpenChange={setPayoutDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Send Money to NGO</DialogTitle>
              <DialogDescription>
                Send a payout to {selectedNgo?.name}. This will create a transaction record.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (USD)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={payoutAmount}
                  onChange={(e) => setPayoutAmount(e.target.value)}
                  min="0.01"
                  step="0.01"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter payout description"
                  value={payoutDescription}
                  onChange={(e) => setPayoutDescription(e.target.value)}
                  rows={3}
                />
              </div>
              {selectedNgo && (
                <div className="rounded-lg bg-muted p-3 text-sm">
                  <p className="font-medium">NGO Details:</p>
                  <p className="text-muted-foreground">{selectedNgo.name}</p>
                  <p className="text-muted-foreground text-xs">{selectedNgo.user?.email}</p>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setPayoutDialogOpen(false)}
                disabled={payoutLoading}
              >
                Cancel
              </Button>
              <Button
                onClick={handlePayout}
                disabled={payoutLoading}
              >
                {payoutLoading ? "Processing..." : "Send Money"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  </ProtectedRoute>
  );
}