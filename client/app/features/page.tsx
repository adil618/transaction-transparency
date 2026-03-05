import Navbar from "@/components/navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Shield, Users, Target, BarChart3, Heart, CheckCircle, 
  Lock, Bell, FileText, Globe, Zap, RefreshCw,
  ChartBar, TrendingUp, Award, Search, Settings, Database
} from "lucide-react";
import Link from "next/link";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Navbar />
      
      <div className="mx-auto max-w-7xl px-6 py-20">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold text-slate-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900">
            Platform Features
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Comprehensive tools and features designed to create transparency, accountability, and measurable impact.
          </p>
        </div>

        {/* Core Features */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Core Features</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardHeader>
                <div className="h-12 w-12 text-blue-600 mb-4 transition-transform duration-300 group-hover:scale-110">
                  <Shield className="h-full w-full" />
                </div>
                <CardTitle>Transparent Transactions</CardTitle>
                <CardDescription>
                  Every donation is tracked with complete transparency. View transaction history, 
                  amounts, recipients, and timestamps for full accountability.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardHeader>
                <div className="h-12 w-12 text-green-600 mb-4 transition-transform duration-300 group-hover:scale-110">
                  <Users className="h-full w-full" />
                </div>
                <CardTitle>NGO Verification</CardTitle>
                <CardDescription>
                  Rigorous verification process ensures all NGOs are legitimate. Background checks, 
                  document validation, and continuous monitoring.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardHeader>
                <div className="h-12 w-12 text-purple-600 mb-4 transition-transform duration-300 group-hover:scale-110">
                  <Target className="h-full w-full" />
                </div>
                <CardTitle>Impact Tracking</CardTitle>
                <CardDescription>
                  Real-time campaign progress tracking. See exactly how your donations are being 
                  used and the impact they&apos;re creating.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardHeader>
                <div className="h-12 w-12 text-orange-600 mb-4 transition-transform duration-300 group-hover:scale-110">
                  <BarChart3 className="h-full w-full" />
                </div>
                <CardTitle>Advanced Analytics</CardTitle>
                <CardDescription>
                  Comprehensive dashboards with donation patterns, campaign performance metrics, 
                  and beneficiary outcome tracking.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardHeader>
                <div className="h-12 w-12 text-red-600 mb-4 transition-transform duration-300 group-hover:scale-110">
                  <Heart className="h-full w-full" />
                </div>
                <CardTitle>Donor Dashboard</CardTitle>
                <CardDescription>
                  Personalized donor portal to track all contributions, view impact reports, 
                  and manage recurring donations.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardHeader>
                <div className="h-12 w-12 text-teal-600 mb-4 transition-transform duration-300 group-hover:scale-110">
                  <CheckCircle className="h-full w-full" />
                </div>
                <CardTitle>Campaign Approval</CardTitle>
                <CardDescription>
                  Admin verification system ensures only legitimate campaigns are published. 
                  Multi-stage approval workflow.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Security Features */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Security & Trust</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="pt-6">
                <Lock className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                <h3 className="font-bold text-slate-900 mb-2">Secure Payments</h3>
                <p className="text-sm text-slate-600">
                  Bank-grade encryption for all transactions
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardContent className="pt-6">
                <Database className="h-10 w-10 text-green-600 mx-auto mb-3" />
                <h3 className="font-bold text-slate-900 mb-2">Data Protection</h3>
                <p className="text-sm text-slate-600">
                  GDPR compliant with encrypted storage
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardContent className="pt-6">
                <Award className="h-10 w-10 text-purple-600 mx-auto mb-3" />
                <h3 className="font-bold text-slate-900 mb-2">Verified NGOs</h3>
                <p className="text-sm text-slate-600">
                  Thorough background checks and validation
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardContent className="pt-6">
                <FileText className="h-10 w-10 text-orange-600 mx-auto mb-3" />
                <h3 className="font-bold text-slate-900 mb-2">Audit Trail</h3>
                <p className="text-sm text-slate-600">
                  Complete transaction history and logs
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Platform Tools */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Platform Tools</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Bell className="h-8 w-8 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Real-time Notifications</h3>
                    <p className="text-slate-600">
                      Stay updated with instant alerts for donations, campaign milestones, and impact updates. 
                      Customize notification preferences for email and in-app alerts.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <ChartBar className="h-8 w-8 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Custom Reports</h3>
                    <p className="text-slate-600">
                      Generate detailed reports for donations, campaigns, and impact metrics. 
                      Export data in multiple formats for analysis and compliance.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Search className="h-8 w-8 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Advanced Search</h3>
                    <p className="text-slate-600">
                      Powerful search and filtering to find campaigns, NGOs, and beneficiaries. 
                      Filter by category, location, impact area, and more.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <RefreshCw className="h-8 w-8 text-orange-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Recurring Donations</h3>
                    <p className="text-slate-600">
                      Set up automated recurring donations to support causes continuously. 
                      Flexible schedules with easy management and cancellation.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Globe className="h-8 w-8 text-teal-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Multi-currency Support</h3>
                    <p className="text-slate-600">
                      Donate in your local currency with automatic conversion. Support for major 
                      international currencies and real-time exchange rates.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Settings className="h-8 w-8 text-indigo-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Role-based Access</h3>
                    <p className="text-slate-600">
                      Separate portals for donors, NGOs, and administrators. Custom permissions 
                      and access controls for different user types.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Performance Metrics */}
        <section className="mb-20">
          <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-8 text-center">Platform Performance</h2>
              <div className="grid gap-8 md:grid-cols-4 text-center">
                <div>
                  <Zap className="h-10 w-10 mx-auto mb-3" />
                  <p className="text-4xl font-bold mb-2">99.9%</p>
                  <p className="text-sm opacity-90">Uptime</p>
                </div>
                <div>
                  <TrendingUp className="h-10 w-10 mx-auto mb-3" />
                  <p className="text-4xl font-bold mb-2">&lt;2s</p>
                  <p className="text-sm opacity-90">Avg Response Time</p>
                </div>
                <div>
                  <Shield className="h-10 w-10 mx-auto mb-3" />
                  <p className="text-4xl font-bold mb-2">100%</p>
                  <p className="text-sm opacity-90">Secure Transactions</p>
                </div>
                <div>
                  <Award className="h-10 w-10 mx-auto mb-3" />
                  <p className="text-4xl font-bold mb-2">A+</p>
                  <p className="text-sm opacity-90">Security Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA Section */}
        <section>
          <Card className="border-0 shadow-xl bg-gradient-to-r from-slate-900 to-blue-900 text-white">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Experience These Features Today</h2>
              <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                Join thousands of users who trust our platform for transparent, impactful giving.
              </p>
              <div className="flex gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild className="hover:scale-105 transition-all duration-300">
                  <Link href="/signup">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-slate-900 hover:scale-105 transition-all duration-300">
                  <Link href="/contact">Contact Sales</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 mt-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center text-sm text-slate-400">
            <p>&copy; 2026 Transaction Transparency Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
