import Navbar from "@/components/navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Users, Target, BarChart3, Heart, CheckCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navbar />
      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-900 mb-6">
            Transaction Transparency Platform
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            A production-ready platform for transparent donations, auditable
            campaigns, and accountable NGOs. Donors can track impact, NGOs can
            manage beneficiaries, and admins can approve and monitor every
            transaction.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="/signup">Get Started</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="/login">Sign in</a>
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Shield className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle>Transparent Transactions</CardTitle>
              <CardDescription>
                Every donation is tracked with blockchain-like transparency,
                ensuring funds reach their intended recipients.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Users className="h-12 w-12 text-green-600 mb-4" />
              <CardTitle>NGO Accountability</CardTitle>
              <CardDescription>
                NGOs are verified and monitored, with detailed reporting on
                how donations are used to help beneficiaries.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Target className="h-12 w-12 text-purple-600 mb-4" />
              <CardTitle>Impact Tracking</CardTitle>
              <CardDescription>
                Donors can see real-time progress on campaigns and the direct
                impact of their contributions.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <BarChart3 className="h-12 w-12 text-orange-600 mb-4" />
              <CardTitle>Comprehensive Analytics</CardTitle>
              <CardDescription>
                Detailed dashboards provide insights into donation patterns,
                campaign performance, and beneficiary outcomes.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Heart className="h-12 w-12 text-red-600 mb-4" />
              <CardTitle>Donor Engagement</CardTitle>
              <CardDescription>
                Interactive platform that keeps donors informed and engaged
                with the causes they care about.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CheckCircle className="h-12 w-12 text-teal-600 mb-4" />
              <CardTitle>Verified Campaigns</CardTitle>
              <CardDescription>
                All campaigns undergo rigorous verification to ensure they are
                legitimate and aligned with NGO missions.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* CTA Section */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of donors and NGOs creating transparent, impactful change.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <a href="/signup">Start Your Journey</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
