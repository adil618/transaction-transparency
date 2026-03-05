import { Heart } from "lucide-react"
import { SignupForm } from "@/components/signup-form"
import Navbar from "@/components/navbar"
export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Sticky Header */}
      <Navbar/>
      {/* Main Content */}
      <div className="min-h-[calc(100vh-76px)] flex flex-col justify-center items-center px-4 py-12">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-10 animate-fadeIn">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">
              Create Your Account
            </h1>
            <p className="text-lg text-gray-500">
              Join our transparent donation platform and make a real impact
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 p-8 md:p-12 animate-scaleIn border border-gray-100/50">
            <SignupForm />
          </div>

          {/* Footer Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mt-12 mb-8">
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <Heart className="h-10 w-10 text-red-500 fill-red-500" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-1">100% Transparent</h3>
              <p className="text-sm text-gray-500">Track every donation from source to impact</p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-lg">🔒</span>
                </div>
              </div>
              <h3 className="font-semibold text-slate-900 mb-1">Verified & Secure</h3>
              <p className="text-sm text-gray-500">All organizations thoroughly vetted</p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-lg">✨</span>
                </div>
              </div>
              <h3 className="font-semibold text-slate-900 mb-1">Real Impact</h3>
              <p className="text-sm text-gray-500">See the difference you make</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

