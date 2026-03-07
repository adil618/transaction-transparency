"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Heart, User, Building2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/auth-context";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("donor");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <Heart className="h-10 w-10 text-rose-600 fill-rose-600" />
            <span className="text-2xl font-semibold">DonateTransparently</span>
          </Link>
          <h1 className="text-3xl mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to access your dashboard</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="donor" className="gap-2">
              <User className="h-4 w-4" />
              Donor
            </TabsTrigger>
            <TabsTrigger value="ngo" className="gap-2">
              <Building2 className="h-4 w-4" />
              NGO
            </TabsTrigger>
            <TabsTrigger value="admin" className="gap-2">
              <Shield className="h-4 w-4" />
              Admin
            </TabsTrigger>
          </TabsList>

          <TabsContent value="donor">
            <Card>
              <CardHeader>
                <CardTitle>Donor Login</CardTitle>
                <CardDescription>Access your donor dashboard to make donations and track your impact</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="donor-email">Email</Label>
                    <Input id="donor-email" type="email" placeholder="donor@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="donor-password">Password</Label>
                    <Input id="donor-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  </div>
                  {error && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">{error}</p>}
                  <div className="flex items-center justify-between">
                    <a href="#" className="text-sm text-rose-600 hover:underline">Forgot password?</a>
                  </div>
                  <Button type="submit" className="w-full bg-rose-600 hover:bg-rose-700" disabled={loading}>
                    {loading ? "Signing in..." : "Sign In as Donor"}
                  </Button>
                  <p className="text-sm text-center text-gray-600">
                    Don&apos;t have an account? <Link href="/signup" className="text-rose-600 hover:underline">Sign up</Link>
                  </p>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ngo">
            <Card>
              <CardHeader>
                <CardTitle>NGO Login</CardTitle>
                <CardDescription>Access your NGO dashboard to manage campaigns and receive donations</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="ngo-email">Organization Email</Label>
                    <Input id="ngo-email" type="email" placeholder="contact@ngo.org" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ngo-password">Password</Label>
                    <Input id="ngo-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  </div>
                  {error && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">{error}</p>}
                  <div className="flex items-center justify-between">
                    <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
                    {loading ? "Signing in..." : "Sign In as NGO"}
                  </Button>
                  <p className="text-sm text-center text-gray-600">
                    New organization? <Link href="/signup" className="text-blue-600 hover:underline">Register your NGO</Link>
                  </p>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="admin">
            <Card>
              <CardHeader>
                <CardTitle>Admin Login</CardTitle>
                <CardDescription>Access the admin panel to manage the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">Admin Email</Label>
                    <Input id="admin-email" type="email" placeholder="admin@donatetransparently.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-password">Password</Label>
                    <Input id="admin-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  </div>
                  {error && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">{error}</p>}
                  <div className="flex items-center justify-between">
                    <a href="#" className="text-sm text-purple-600 hover:underline">Forgot password?</a>
                  </div>
                  <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={loading}>
                    {loading ? "Signing in..." : "Sign In as Admin"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center">
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
            â† Back to home
          </Link>
        </div>
      </div>
    </div>
  );

}
