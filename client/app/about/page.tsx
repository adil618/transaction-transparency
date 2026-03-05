import Navbar from "@/components/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Heart, Users, Target, TrendingUp, Award } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Navbar />
      
      <div className="mx-auto max-w-7xl px-6 py-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900">
            About Transaction Transparency
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Building a future where every donation creates measurable impact through complete transparency and accountability.
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-20">
          <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
              <p className="text-lg text-center max-w-3xl mx-auto leading-relaxed">
                To revolutionize charitable giving by creating a transparent ecosystem where donors can track their impact, 
                NGOs can demonstrate accountability, and every dollar donated creates measurable change in the lives of beneficiaries.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Story Section */}
        <section className="mb-20">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-slate-700 leading-relaxed">
                <p>
                  Founded in 2024, Transaction Transparency Platform was born from a simple yet powerful idea: 
                  donors deserve to know exactly where their money goes and what impact it creates.
                </p>
                <p>
                  After witnessing the lack of transparency in traditional charitable giving, our founders set out 
                  to build a platform that would bridge the gap between generosity and accountability. Today, we serve 
                  over 10,000 active donors and 500+ verified NGOs, facilitating transparent donations that have 
                  impacted more than 50,000 lives.
                </p>
                <p>
                  Our platform combines cutting-edge technology with a human-centered approach, ensuring that every 
                  transaction is not just a number, but a story of positive change.
                </p>
              </div>
            </div>
            <div className="grid gap-4 grid-cols-2">
              <Card className="border-0 shadow-lg text-center">
                <CardContent className="pt-6">
                  <TrendingUp className="h-10 w-10 text-blue-600 mx-auto mb-2" />
                  <p className="text-3xl font-bold text-slate-900">10K+</p>
                  <p className="text-sm text-slate-600">Active Donors</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg text-center">
                <CardContent className="pt-6">
                  <Users className="h-10 w-10 text-green-600 mx-auto mb-2" />
                  <p className="text-3xl font-bold text-slate-900">500+</p>
                  <p className="text-sm text-slate-600">Verified NGOs</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg text-center">
                <CardContent className="pt-6">
                  <Heart className="h-10 w-10 text-red-600 mx-auto mb-2" />
                  <p className="text-3xl font-bold text-slate-900">$5M+</p>
                  <p className="text-sm text-slate-600">Total Raised</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg text-center">
                <CardContent className="pt-6">
                  <Target className="h-10 w-10 text-purple-600 mx-auto mb-2" />
                  <p className="text-3xl font-bold text-slate-900">50K+</p>
                  <p className="text-sm text-slate-600">Lives Impacted</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Our Core Values</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="pt-6">
                <Shield className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">Transparency</h3>
                <p className="text-slate-600">
                  We believe in complete openness. Every transaction, every campaign, and every impact metric is 
                  visible and verifiable by all stakeholders.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="pt-6">
                <Award className="h-12 w-12 text-green-600 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">Accountability</h3>
                <p className="text-slate-600">
                  NGOs on our platform are held to the highest standards. We ensure that every organization 
                  demonstrates impact and maintains donor trust.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="pt-6">
                <Heart className="h-12 w-12 text-red-600 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">Impact</h3>
                <p className="text-slate-600">
                  At the end of the day, it&apos;s all about creating real, measurable change in the lives of those 
                  who need it most. Impact is our north star.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Leadership Team</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="pt-8">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
                  JD
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">Jane Doe</h3>
                <p className="text-blue-600 font-medium mb-3">Chief Executive Officer</p>
                <p className="text-slate-600 text-sm">
                  Former technology executive with 15+ years in fintech and social impact ventures.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardContent className="pt-8">
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-teal-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
                  MS
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">Michael Smith</h3>
                <p className="text-green-600 font-medium mb-3">Chief Technology Officer</p>
                <p className="text-slate-600 text-sm">
                  Software architect specializing in blockchain, distributed systems, and secure transactions.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardContent className="pt-8">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
                  EJ
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">Emily Johnson</h3>
                <p className="text-purple-600 font-medium mb-3">VP of NGO Relations</p>
                <p className="text-slate-600 text-sm">
                  20+ years in nonprofit sector development and international development programs.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section>
          <Card className="border-0 shadow-xl bg-gradient-to-r from-slate-900 to-blue-900 text-white">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
              <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                Whether you&apos;re a donor looking to make meaningful impact or an NGO seeking transparency tools, 
                we&apos;re here to help you create positive change.
              </p>
              <Link 
                href="/signup" 
                className="inline-block bg-white text-slate-900 px-8 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-all duration-300 hover:scale-105"
              >
                Get Started Today
              </Link>
            </CardContent>
          </Card>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center text-sm text-slate-400">
            <p>&copy; 2026 Transaction Transparency Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
