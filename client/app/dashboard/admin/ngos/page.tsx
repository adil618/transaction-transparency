"use client";

import { useEffect, useState } from "react";
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
import { Search, Check, X } from "lucide-react";
import { toast } from "sonner";

type Ngo = {
  _id: string;
  name: string;
  description?: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
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
      </div>
    </AdminLayout>
  </ProtectedRoute>
  );
}