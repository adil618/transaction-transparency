"use client";

import { useState } from "react";
import AdminLayout from "@/components/admin/admin-layout";
import ProtectedRoute from "@/components/protected-route";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function SettingsPage() {
  const [platformName, setPlatformName] = useState("Transaction Transparency");
  const [supportEmail, setSupportEmail] = useState("support@example.com");
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const saveSettings = () => {
    toast.success("Settings saved locally");
  };

  return (
    <ProtectedRoute roles={["admin"]}>
      <AdminLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground">Manage basic admin panel preferences.</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Platform Settings</CardTitle>
              <CardDescription>Update basic platform configuration.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 max-w-xl">
              <div className="space-y-2">
                <Label htmlFor="platformName">Platform Name</Label>
                <Input
                  id="platformName"
                  value={platformName}
                  onChange={(e) => setPlatformName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="supportEmail">Support Email</Label>
                <Input
                  id="supportEmail"
                  type="email"
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="font-medium">Maintenance Mode</p>
                  <p className="text-sm text-muted-foreground">Temporarily disable user activity during maintenance.</p>
                </div>
                <input
                  type="checkbox"
                  checked={maintenanceMode}
                  onChange={(event) => setMaintenanceMode(event.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 accent-blue-600"
                />
              </div>

              <Button onClick={saveSettings}>Save Changes</Button>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
