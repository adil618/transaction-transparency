import Navbar from "@/components/navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Users, Target, BarChart3, Heart, CheckCircle, TrendingUp, Award, Clock, Globe } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Navbar />
      
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center mb-16 space-y-6">
          <h1 className="text-6xl font-bold text-slate-900 mb-6 animate-fadeIn bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900">
            Transaction Transparency Platform
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto animate-fadeIn opacity-0 [animation-delay:0.2s]">
            A production-ready platform for transparent donations, auditable
            campaigns, and accountable NGOs. Donors can track impact, NGOs can
            manage beneficiaries, and admins can approve and monitor every
            transaction.
          </p>
          <div className="flex gap-4 justify-center animate-fadeIn opacity-0 [animation-delay:0.4s]">
            <Button size="lg" asChild className="transition-all duration-300 hover:scale-105 hover:shadow-xl bg-gradient-to-r from-slate-900 to-slate-700">
              <Link href="/signup">Get Started</Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <Link href="/login">Sign in</Link>
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid gap-6 md:grid-cols-4 mb-20 animate-fadeIn opacity-0 [animation-delay:0.6s]">
          <Card className="border-0 shadow-md text-center">
            <CardContent className="pt-6">
              <TrendingUp className="h-10 w-10 text-blue-600 mx-auto mb-2" />
              <p className="text-3xl font-bold text-slate-900">10,000+</p>
              <p className="text-sm text-slate-600">Active Donors</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md text-center">
            <CardContent className="pt-6">
              <Globe className="h-10 w-10 text-green-600 mx-auto mb-2" />
              <p className="text-3xl font-bold text-slate-900">500+</p>
              <p className="text-sm text-slate-600">Verified NGOs</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md text-center">
            <CardContent className="pt-6">
              <Heart className="h-10 w-10 text-red-600 mx-auto mb-2" />
              <p className="text-3xl font-bold text-slate-900">$5M+</p>
              <p className="text-sm text-slate-600">Funds Raised</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md text-center">
            <CardContent className="pt-6">
              <Users className="h-10 w-10 text-purple-600 mx-auto mb-2" />
              <p className="text-3xl font-bold text-slate-900">50,000+</p>
              <p className="text-sm text-slate-600">Lives Impacted</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Why Choose Us</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our platform provides everything you need for transparent, impactful giving
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group animate-fadeIn opacity-0 [animation-delay:0.1s]">
              <CardHeader>
                <div className="h-12 w-12 text-blue-600 mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Shield className="h-full w-full" />
                </div>
                <CardTitle className="text-xl">Transparent Transactions</CardTitle>
                <CardDescription className="text-base">
                  Every donation is tracked with blockchain-like transparency,
                  ensuring funds reach their intended recipients.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group animate-fadeIn opacity-0 [animation-delay:0.2s]">
              <CardHeader>
                <div className="h-12 w-12 text-green-600 mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Users className="h-full w-full" />
                </div>
                <CardTitle className="text-xl">NGO Accountability</CardTitle>
                <CardDescription className="text-base">
                  NGOs are verified and monitored, with detailed reporting on
                  how donations are used to help beneficiaries.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group animate-fadeIn opacity-0 [animation-delay:0.3s]">
              <CardHeader>
                <div className="h-12 w-12 text-purple-600 mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Target className="h-full w-full" />
                </div>
                <CardTitle className="text-xl">Impact Tracking</CardTitle>
                <CardDescription className="text-base">
                  Donors can see real-time progress on campaigns and the direct
                  impact of their contributions.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group animate-fadeIn opacity-0 [animation-delay:0.4s]">
              <CardHeader>
                <div className="h-12 w-12 text-orange-600 mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <BarChart3 className="h-full w-full" />
                </div>
                <CardTitle className="text-xl">Comprehensive Analytics</CardTitle>
                <CardDescription className="text-base">
                  Detailed dashboards provide insights into donation patterns,
                  campaign performance, and beneficiary outcomes.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group animate-fadeIn opacity-0 [animation-delay:0.5s]">
              <CardHeader>
                <div className="h-12 w-12 text-red-600 mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Heart className="h-full w-full" />
                </div>
                <CardTitle className="text-xl">Donor Engagement</CardTitle>
                <CardDescription className="text-base">
                  Interactive platform that keeps donors informed and engaged
                  with the causes they care about.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group animate-fadeIn opacity-0 [animation-delay:0.6s]">
              <CardHeader>
                <div className="h-12 w-12 text-teal-600 mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <CheckCircle className="h-full w-full" />
                </div>
                <CardTitle className="text-xl">Verified Campaigns</CardTitle>
                <CardDescription className="text-base">
                  All campaigns undergo rigorous verification to ensure they are
                  legitimate and aligned with NGO missions.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">How It Works</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Simple steps to create transparency and impact
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Sign Up</h3>
              <p className="text-slate-600">
                Register as a donor, NGO, or admin. Complete your profile with required information.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Browse & Donate</h3>
              <p className="text-slate-600">
                Explore verified campaigns, review NGO profiles, and contribute to causes you care about.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Track Impact</h3>
              <p className="text-slate-600">
                Monitor your donations in real-time and see the tangible impact on beneficiaries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">What People Say</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Hear from our community of donors and NGOs
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Award key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-slate-700 mb-4 italic">
                  "This platform has revolutionized how we track our donations. The transparency gives me complete confidence in where my money goes."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">
                    SM
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Sarah Mitchell</p>
                    <p className="text-sm text-slate-600">Regular Donor</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Award key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-slate-700 mb-4 italic">
                  "As an NGO director, this system has streamlined our operations and boosted donor trust significantly. Highly recommended!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center font-bold text-green-600">
                    JK
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">James Kowalski</p>
                    <p className="text-sm text-slate-600">NGO Director</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Award key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-slate-700 mb-4 italic">
                  "The analytics and reporting features are phenomenal. We can now demonstrate our impact with concrete data to all stakeholders."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center font-bold text-purple-600">
                    LP
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Lisa Park</p>
                    <p className="text-sm text-slate-600">Campaign Manager</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <Card className="border-0 shadow-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white animate-fadeIn opacity-0 [animation-delay:0.7s] overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform translate-x-[-200%] group-hover:translate-x-[200%] transition-all duration-1000"></div>
          <CardContent className="p-12 text-center relative z-10">
            <h2 className="text-4xl font-bold mb-4 animate-float">Ready to Make a Difference?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of donors and NGOs creating transparent, impactful change.
            </p>
            <Button size="lg" variant="secondary" asChild className="transition-all duration-300 hover:scale-110 hover:shadow-2xl">
              <Link href="/signup">Start Your Journey</Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-4 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Transaction Transparency</h3>
              <p className="text-slate-400 text-sm">
                Building trust through transparent donations and accountable giving.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Users</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/login" className="hover:text-white transition-colors">Login</Link></li>
                <li><Link href="/signup" className="hover:text-white transition-colors">Sign Up</Link></li>
                <li><Link href="/dashboard/donor" className="hover:text-white transition-colors">Donor Portal</Link></li>
                <li><Link href="/dashboard/ngo" className="hover:text-white transition-colors">NGO Portal</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  24/7 Support
                </li>
                <li>support@transactiontransparency.org</li>
                <li>+1 (555) 123-4567</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
            <p>&copy; 2026 Transaction Transparency Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
