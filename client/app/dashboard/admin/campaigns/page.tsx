"use client";

import { useCallback, useEffect, useState } from "react";
import AdminLayout from "@/components/admin/admin-layout";
import ProtectedRoute from "@/components/protected-route";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { apiFetch } from "@/lib/api";
import { Search, Check, Archive } from "lucide-react";
import { toast } from "sonner";

type Campaign = {
  _id: string;
  title: string;
  description?: string;
  goalAmount: number;
  currentAmount: number;
  status: string;
  createdAt: string;
  ngo?: {
    name: string;
  };
};

type CampaignsResponse = {
  campaigns: Campaign[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
};

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<CampaignsResponse["pagination"] | null>(null);

  const loadCampaigns = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        ...(search && { search }),
        ...(statusFilter && { status: statusFilter }),
      });

      const data = await apiFetch<CampaignsResponse>(`/api/admin/campaigns?${params}`);
      setCampaigns(data.campaigns);
      setPagination(data.pagination);
    } catch (error) {
      console.error("Failed to load campaigns:", error);
      toast.error("Failed to load campaigns");
    } finally {
      setLoading(false);
    }
  }, [page, search, statusFilter]);

  useEffect(() => {
    loadCampaigns();
  }, [loadCampaigns]);

  const approveCampaign = async (campaignId: string) => {
    try {
      await apiFetch(`/api/admin/campaigns/${campaignId}/approve`, {
        method: "PUT",
      });
      toast.success("Campaign approved");
      loadCampaigns();
    } catch (error) {
      console.error("Failed to approve campaign:", error);
      toast.error("Failed to approve campaign");
    }
  };

  const archiveCampaign = async (campaignId: string) => {
    try {
      await apiFetch(`/api/admin/campaigns/${campaignId}/archive`, {
        method: "PUT",
      });
      toast.success("Campaign archived");
      loadCampaigns();
    } catch (error) {
      console.error("Failed to archive campaign:", error);
      toast.error("Failed to archive campaign");
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "default" as const;
      case "pending":
        return "secondary" as const;
      case "completed":
        return "outline" as const;
      default:
        return "outline" as const;
    }
  };

  return (
    <ProtectedRoute roles={["admin"]}>
      <AdminLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Campaigns</h1>
            <p className="text-muted-foreground">Review, approve and archive fundraising campaigns.</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
              <CardDescription>Search and filter campaigns by status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search campaigns..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-input bg-background rounded-md"
                >
                  <option value="">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Campaigns ({pagination?.total || 0})</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-12 bg-muted animate-pulse rounded" />
                  ))}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>NGO</TableHead>
                      <TableHead>Goal</TableHead>
                      <TableHead>Raised</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {campaigns.map((campaign) => (
                      <TableRow key={campaign._id}>
                        <TableCell className="font-medium">{campaign.title}</TableCell>
                        <TableCell>{campaign.ngo?.name || "Unknown NGO"}</TableCell>
                        <TableCell>${campaign.goalAmount?.toLocaleString()}</TableCell>
                        <TableCell>${campaign.currentAmount?.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadgeVariant(campaign.status)}>{campaign.status}</Badge>
                        </TableCell>
                        <TableCell>{new Date(campaign.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {campaign.status?.toLowerCase() !== "active" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-green-600 hover:text-green-700"
                                onClick={() => approveCampaign(campaign._id)}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                            )}
                            {campaign.status?.toLowerCase() !== "completed" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-orange-600 hover:text-orange-700"
                                onClick={() => archiveCampaign(campaign._id)}
                              >
                                <Archive className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}

              {pagination && pagination.pages > 1 && (
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-muted-foreground">
                    Showing {(pagination.page - 1) * pagination.limit + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} campaigns
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage((prev) => prev - 1)}
                      disabled={page === 1}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage((prev) => prev + 1)}
                      disabled={page === pagination.pages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
