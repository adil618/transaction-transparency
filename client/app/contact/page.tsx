"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast.success("Thank you! We will get back to you within 24 hours.");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setSubmitting(false);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Navbar />
      
      <div className="mx-auto max-w-7xl px-6 py-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900">
            Get in Touch
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-2 mb-20">
          {/* Contact Form */}
          <Card className="border-0 shadow-xl">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us more about your inquiry..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={submitting}
                >
                  {submitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Email</h3>
                    <p className="text-slate-600">support@transactiontransparency.org</p>
                    <p className="text-slate-600">info@transactiontransparency.org</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Phone</h3>
                    <p className="text-slate-600">+1 (555) 123-4567</p>
                    <p className="text-slate-600">+1 (555) 987-6543</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <MapPin className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Address</h3>
                    <p className="text-slate-600">123 Impact Street</p>
                    <p className="text-slate-600">San Francisco, CA 94105</p>
                    <p className="text-slate-600">United States</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Business Hours</h3>
                    <p className="text-slate-600">Monday - Friday: 9:00 AM - 6:00 PM PST</p>
                    <p className="text-slate-600">Saturday: 10:00 AM - 4:00 PM PST</p>
                    <p className="text-slate-600">Sunday: Closed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Frequently Asked Questions</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-2">How do I register as a donor?</h3>
                <p className="text-slate-600">
                  Click on &quot;Get Started&quot; or &quot;Sign Up&quot; in the navigation menu, select &quot;Donor&quot; as your role, 
                  and complete the registration form. You&apos;ll receive a confirmation email to verify your account.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-2">How can NGOs join the platform?</h3>
                <p className="text-slate-600">
                  NGOs can sign up through the registration page, select &quot;NGO&quot; as the role, and submit required 
                  documentation. Our team will review and verify your organization within 48 hours.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Are donations tax-deductible?</h3>
                <p className="text-slate-600">
                  Yes, donations made to verified 501(c)(3) organizations are tax-deductible. You&apos;ll receive 
                  a receipt after each donation for your tax records.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-2">How can I track my donation&apos;s impact?</h3>
                <p className="text-slate-600">
                  Log in to your donor dashboard to view real-time updates on all campaigns you&apos;ve supported. 
                  You&apos;ll see progress reports, photos, and detailed impact metrics.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-2">What payment methods are accepted?</h3>
                <p className="text-slate-600">
                  We accept all major credit cards, debit cards, PayPal, and bank transfers. All transactions 
                  are secured with bank-grade encryption.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-2">How are NGOs verified?</h3>
                <p className="text-slate-600">
                  Our team conducts thorough background checks including legal registration verification, 
                  financial audits, and reference checks before approving any NGO on the platform.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Support Section */}
        <section>
          <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Need Immediate Assistance?</h2>
              <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                Our support team is available 24/7 to help you with any questions or issues.
              </p>
              <div className="flex gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <a href="mailto:support@transactiontransparency.org">
                    Email Support
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Us
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
