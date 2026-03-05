"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useAuth } from "@/context/auth-context";
import Navbar from "@/components/navbar";
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Navbar />
      <div className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-lg p-8 shadow-2xl animate-scaleIn">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-blue-600">
              Welcome back
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Sign in to continue your journey
            </p>
          </div>
          <form className="space-y-6" onSubmit={onSubmit}>
            <Field>
              <FieldLabel htmlFor="email" className="text-slate-700 font-medium">Email</FieldLabel>
              <InputGroup className="transition-all duration-300 focus-within:scale-[1.02]">
                <InputGroupAddon align="inline-start">
                  <MailIcon className="h-4 w-4 text-slate-500" />
                </InputGroupAddon>
                <InputGroupInput
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="transition-all duration-300"
                />
              </InputGroup>
            </Field>
            <Field>
              <FieldLabel htmlFor="password" className="text-slate-700 font-medium">Password</FieldLabel>
              <InputGroup className="transition-all duration-300 focus-within:scale-[1.02]">
                <InputGroupAddon align="inline-start">
                  <LockIcon className="h-4 w-4 text-slate-500" />
                </InputGroupAddon>
                <InputGroupInput
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="transition-all duration-300"
                />
                <InputGroupAddon
                  align="inline-end"
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer hover:bg-slate-100 transition-colors duration-200"
                >
                  {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                </InputGroupAddon>
              </InputGroup>
            </Field>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200 animate-fadeIn">
                {error}
              </div>
            )}
            <Button 
              type="submit" 
              className="w-full transition-all duration-300 hover:scale-105 hover:shadow-xl bg-gradient-to-r from-slate-900 to-blue-900" 
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Signing in...
                </span>
              ) : (
                "Login"
              )}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm text-slate-600">
            New here?{" "}
            <Link className="text-blue-600 hover:text-blue-700 font-semibold underline transition-colors duration-300" href="/signup">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
