import Navbar from "@/components/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Users, Heart, CheckCircle, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-20 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-sm mb-6">
                <Shield className="h-4 w-4" />
                100% Transparent Donations
              </div>
              <h1 className="text-5xl lg:text-6xl mb-6">
                Donate with <span className="text-rose-600">Confidence</span> and <span className="text-rose-600">Transparency</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Track every donation from source to impact. Our blockchain-powered platform ensures complete transparency and accountability for NGOs, donors, and administrators.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/login">
                  <Button size="lg" className="gap-2 bg-rose-600 hover:bg-rose-700">
                    Start Donating <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
              <div className="flex gap-8 mt-12">
                <div>
                  <div className="text-3xl font-semibold text-rose-600">$50M+</div>
                  <div className="text-gray-600">Total Donated</div>
                </div>
                <div>
                  <div className="text-3xl font-semibold text-rose-600">1,200+</div>
                  <div className="text-gray-600">NGOs Verified</div>
                </div>
                <div>
                  <div className="text-3xl font-semibold text-rose-600">50K+</div>
                  <div className="text-gray-600">Active Donors</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1560220604-1985ebfe28b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt="People helping community"
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4">Why Choose Us?</h2>
            <p className="text-xl text-gray-600">Complete transparency and trust in every donation</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="h-12 w-12 bg-rose-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-rose-600" />
                </div>
                <h3 className="text-xl mb-3">100% Transparency</h3>
                <p className="text-gray-600">Track every penny from your donation to its final destination. Complete visibility into fund allocation and usage.</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl mb-3">Verified NGOs</h3>
                <p className="text-gray-600">All NGOs are thoroughly verified and monitored. Only legitimate organizations with proven track records.</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl mb-3">Real-Time Impact</h3>
                <p className="text-gray-600">See the real-time impact of your donations with detailed reports and updates from NGOs.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple, secure, and transparent donation process</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 bg-rose-600 text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4">1</div>
              <h3 className="text-xl mb-3">Choose an NGO</h3>
              <p className="text-gray-600">Browse verified NGOs and select causes that matter to you</p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 bg-rose-600 text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4">2</div>
              <h3 className="text-xl mb-3">Make a Donation</h3>
              <p className="text-gray-600">Donate securely with multiple payment options</p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 bg-rose-600 text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4">3</div>
              <h3 className="text-xl mb-3">Track Impact</h3>
              <p className="text-gray-600">Monitor how your donation is used with real-time updates</p>
            </div>
          </div>
        </div>
      </section>

      {/* Three Dashboards Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4">Built for Everyone</h2>
            <p className="text-xl text-gray-600">Specialized dashboards for every stakeholder</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 border-rose-200 hover:border-rose-400 transition-colors">
              <CardContent className="p-8">
                <Users className="h-12 w-12 text-rose-600 mb-4" />
                <h3 className="text-2xl mb-3">Donor Dashboard</h3>
                <ul className="space-y-2 text-gray-600 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Browse verified NGOs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Track donation history</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>View impact reports</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Manage recurring donations</span>
                  </li>
                </ul>
                <Link href="/login">
                  <Button variant="outline" className="w-full">Access Donor Portal</Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="border-2 border-blue-200 hover:border-blue-400 transition-colors">
              <CardContent className="p-8">
                <Heart className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-2xl mb-3">NGO Dashboard</h3>
                <ul className="space-y-2 text-gray-600 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Receive donations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Create campaigns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Submit transparency reports</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Manage beneficiaries</span>
                  </li>
                </ul>
                <Link href="/login">
                  <Button variant="outline" className="w-full">Access NGO Portal</Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="border-2 border-purple-200 hover:border-purple-400 transition-colors">
              <CardContent className="p-8">
                <Shield className="h-12 w-12 text-purple-600 mb-4" />
                <h3 className="text-2xl mb-3">Admin Dashboard</h3>
                <ul className="space-y-2 text-gray-600 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Verify NGOs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Monitor transactions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Analytics and reporting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Manage platform</span>
                  </li>
                </ul>
                <Link href="/login">
                  <Button variant="outline" className="w-full">Access Admin Portal</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1655720359248-eeace8c709c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt="People making impact"
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
            <div>
              <h2 className="text-4xl mb-6">Creating Real Impact Together</h2>
              <p className="text-xl text-gray-600 mb-8">
                Join thousands of donors and NGOs creating positive change through transparent, accountable giving.
              </p>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="h-12 w-12 bg-rose-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Heart className="h-6 w-6 text-rose-600" />
                  </div>
                  <div>
                    <h3 className="text-xl mb-2">Education Programs</h3>
                    <p className="text-gray-600">Funded 500+ schools and educated 100,000+ children</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl mb-2">Healthcare Access</h3>
                    <p className="text-gray-600">Provided medical care to 250,000+ people</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl mb-2">Community Development</h3>
                    <p className="text-gray-600">Built infrastructure for 1,000+ communities</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-rose-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 text-rose-50">
            Join our transparent donation platform today and start creating real impact
          </p>
          <Link href="/signup">
            <Button size="lg" variant="secondary" className="gap-2">
              Get Started Now <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="h-6 w-6 text-rose-600 fill-rose-600" />
                <span className="text-white font-semibold">DonateTransparently</span>
              </div>
              <p className="text-sm">Making charity transparent and accountable for everyone.</p>
            </div>
            <div>
              <h4 className="text-white mb-4">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/login" className="hover:text-white">For Donors</Link></li>
                <li><Link href="/login" className="hover:text-white">For NGOs</Link></li>
                <li><Link href="/login" className="hover:text-white">For Admins</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/features" className="hover:text-white">Features</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2026 DonateTransparently. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
