import { Heart, Shield, CheckCircle } from "lucide-react"
import { SignupForm } from "@/components/signup-form"
import Link from "next/link"
export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-blue-50 flex items-center justify-center p-4">
      {/* Main Content */}
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <Heart className="h-10 w-10 text-rose-600 fill-rose-600" />
            <span className="text-2xl font-semibold">DonateTransparently</span>
          </Link>
          <h1 className="text-3xl mb-2">Create Your Account</h1>
          <p className="text-gray-600">
            Join our transparent donation platform
          </p>
        </div>

        {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-100">
            <SignupForm />
          </div>

          {/* Footer Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mt-12 mb-8">
            <div className="text-center">
              <div className="h-12 w-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-6 w-6 text-rose-600" />
              </div>
              <h3 className="font-semibold mb-1">100% Transparent</h3>
              <p className="text-sm text-gray-600">Track every donation from source to impact</p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-1">Verified & Secure</h3>
              <p className="text-sm text-gray-600">All organizations thoroughly vetted</p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Heart className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-1">Real Impact</h3>
              <p className="text-sm text-gray-600">See the difference you make</p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
  )
};

