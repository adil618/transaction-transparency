"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useAuth } from "@/context/auth-context";
import { apiFetch } from "@/lib/api";
import { EyeIcon, EyeOffIcon, AlertCircle, Upload } from "lucide-react";

type Role = "donor" | "ngo";

export function SignupForm({
  className,
}: React.ComponentProps<"form">) {
  const { register } = useAuth();
  const [role, setRole] = useState<Role>("donor");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileInputRef, setFileInputRef] = useState<HTMLInputElement | null>(null);

  const [donor, setDonor] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    country: "",
  });

  const [ngo, setNgo] = useState({
    organizationName: "",
    registrationNumber: "",
    description: "",
    contactEmail: "",
    contactPhone: "",
    address: "",
    password: "",
    confirmPassword: "",
    documentUrl: "",
    documentFileName: "",
    agreeToTerms: false,
    newsletter: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateDonor = () => {
    if (!donor.firstName.trim() || !donor.lastName.trim()) {
      setError("Please enter your full name.");
      return false;
    }
    if (!donor.email.trim()) {
      setError("Please enter your email.");
      return false;
    }
    if (donor.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return false;
    }
    if (donor.password !== donor.confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    return true;
  };

  const validateNgo = () => {
    if (!ngo.organizationName.trim()) {
      setError("Please enter your organization name.");
      return false;
    }
    if (!ngo.registrationNumber.trim()) {
      setError("Please enter your registration number.");
      return false;
    }
    if (!ngo.contactEmail.trim()) {
      setError("Please enter your contact email.");
      return false;
    }
    if (ngo.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return false;
    }
    if (ngo.password !== ngo.confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    if (!ngo.agreeToTerms) {
      setError("Please agree to the terms and conditions.");
      return false;
    }
    return true;
  };

  const submitDonor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateDonor()) return;

    setLoading(true);
    setError(null);
    try {
      await register({
        name: `${donor.firstName} ${donor.lastName}`,
        email: donor.email,
        password: donor.password,
        role: "donor",
      });
      window.location.href = "/dashboard";
    } catch (err: unknown) {
      const error = err as { message?: string };
      setError(error?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const submitNgo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateNgo()) return;

    setLoading(true);
    setError(null);
    try {
      await register({
        name: ngo.organizationName,
        email: ngo.contactEmail,
        password: ngo.password,
        role: "ngo",
      });

      await apiFetch("/api/ngos", {
        method: "POST",
        body: JSON.stringify({
          name: ngo.organizationName,
          registrationNumber: ngo.registrationNumber,
          description: ngo.description,
          contactEmail: ngo.contactEmail,
          contactPhone: ngo.contactPhone,
          address: ngo.address,
          documents: ngo.documentUrl
            ? [
                {
                  name: ngo.documentFileName || "registration-document",
                  url: ngo.documentUrl,
                },
              ]
            : [],
        }),
      });

      window.location.href = "/dashboard";
    } catch (err: unknown) {
      const error = err as { message?: string };
      setError(error?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("w-full animate-fadeIn", className)}>
      {/* Pill-Style Tab Navigation */}
      <div className="flex gap-2 mb-16 bg-gray-100 p-1.5 rounded-full w-fit mx-auto">
        <button
          onClick={() => {
            setRole("donor");
            setError(null);
          }}
          className={cn(
            "flex items-center gap-2 px-6 py-2.5 font-semibold rounded-full transition-all duration-200 text-sm",
            role === "donor"
              ? "bg-white text-blue-600 shadow-md"
              : "text-gray-600 hover:text-gray-800 bg-transparent"
          )}
        >
          <span>👤</span>
          <span>Donor</span>
        </button>
        <button
          onClick={() => {
            setRole("ngo");
            setError(null);
          }}
          className={cn(
            "flex items-center gap-2 px-6 py-2.5 font-semibold rounded-full transition-all duration-200 text-sm",
            role === "ngo"
              ? "bg-white text-blue-600 shadow-md"
              : "text-gray-600 hover:text-gray-800 bg-transparent"
          )}
        >
          <span>🏢</span>
          <span>NGO</span>
        </button>
      </div>

      {/* Donor Form */}
      {role === "donor" && (
        <form onSubmit={submitDonor} className="animate-fadeIn">
          <FieldGroup className="gap-7">
            {/* Name Row */}
            <div className="grid grid-cols-2 gap-6">
              <Field>
                <FieldLabel className="font-semibold text-slate-900 text-sm mb-2 block">
                  First Name <span className="text-red-500">*</span>
                </FieldLabel>
                <Input
                  placeholder="John"
                  value={donor.firstName}
                  onChange={(e) =>
                    setDonor({ ...donor, firstName: e.target.value })
                  }
                  required
                  className="transition-all duration-200 h-11"
                />
              </Field>
              <Field>
                <FieldLabel className="font-semibold text-slate-900 text-sm mb-2 block">
                  Last Name <span className="text-red-500">*</span>
                </FieldLabel>
                <Input
                  placeholder="Doe"
                  value={donor.lastName}
                  onChange={(e) =>
                    setDonor({ ...donor, lastName: e.target.value })
                  }
                  required
                  className="transition-all duration-200 h-11"
                />
              </Field>
            </div>

            {/* Email */}
            <Field>
              <FieldLabel className="font-semibold text-slate-900 text-sm mb-2 block">
                Email Address <span className="text-red-500">*</span>
              </FieldLabel>
              <Input
                type="email"
                placeholder="john@example.com"
                value={donor.email}
                onChange={(e) => setDonor({ ...donor, email: e.target.value })}
                required
                className="transition-all duration-200 h-11"
              />
                <FieldDescription className="text-gray-500 text-xs mt-1.5">
                  We&apos;ll send receipts and updates to this address
                </FieldDescription>
            </Field>

            {/* Phone */}
            <Field>
              <FieldLabel className="font-semibold text-slate-900 text-sm mb-2 block">
                Phone Number
              </FieldLabel>
              <Input
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={donor.phone}
                onChange={(e) => setDonor({ ...donor, phone: e.target.value })}
                className="transition-all duration-200 h-11"
              />
            </Field>

            {/* Country */}
            <Field>
              <FieldLabel className="font-semibold text-slate-900 text-sm mb-2 block">
                Country
              </FieldLabel>
              <Input
                placeholder="United States"
                value={donor.country}
                onChange={(e) => setDonor({ ...donor, country: e.target.value })}
                className="transition-all duration-200 h-11"
              />
            </Field>

            {/* Password Row */}
            <div className="grid grid-cols-2 gap-6">
              <Field>
                <FieldLabel className="font-semibold text-slate-900 text-sm mb-2 block">
                  Password <span className="text-red-500">*</span>
                </FieldLabel>
                <InputGroup className="transition-all duration-200">
                  <InputGroupInput
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={donor.password}
                    onChange={(e) =>
                      setDonor({ ...donor, password: e.target.value })
                    }
                    required
                    className="h-11"
                  />
                  <InputGroupAddon
                    align="inline-end"
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-4 w-4 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-4 w-4 text-gray-400" />
                    )}
                  </InputGroupAddon>
                </InputGroup>
                <FieldDescription className="text-gray-500 text-xs mt-1.5">
                  Min 8 characters
                </FieldDescription>
              </Field>

              <Field>
                <FieldLabel className="font-semibold text-slate-900 text-sm mb-2 block">
                  Confirm Password <span className="text-red-500">*</span>
                </FieldLabel>
                <InputGroup className="transition-all duration-200">
                  <InputGroupInput
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={donor.confirmPassword}
                    onChange={(e) =>
                      setDonor({ ...donor, confirmPassword: e.target.value })
                    }
                    required
                    className="h-11"
                  />
                  <InputGroupAddon
                    align="inline-end"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOffIcon className="h-4 w-4 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-4 w-4 text-gray-400" />
                    )}
                  </InputGroupAddon>
                </InputGroup>
              </Field>
            </div>

            {/* Checkboxes */}
            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="donor-terms"
                  className="mt-1 w-4 h-4 rounded border-gray-300 bg-gray-50 accent-blue-600 cursor-pointer"
                />
                <label htmlFor="donor-terms" className="text-sm text-gray-700 leading-relaxed">
                  I agree to the{" "}
                  <Link href="#" className="text-blue-600 hover:underline font-medium">
                    Terms & Conditions
                  </Link>
                </label>
              </div>
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="donor-newsletter"
                  className="mt-1 w-4 h-4 rounded border-gray-300 bg-gray-50 accent-blue-600 cursor-pointer"
                />
                <label htmlFor="donor-newsletter" className="text-sm text-gray-700 leading-relaxed">
                  Keep me updated about campaigns and impact
                </label>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex gap-3 p-4 rounded-lg bg-red-50 border border-red-200 animate-fadeIn">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-gradient-to-r from-slate-900 to-blue-900 hover:shadow-lg transition-all duration-200 font-semibold text-white rounded-lg"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating Account...
                </span>
              ) : (
                "Create Your Account"
              )}
            </Button>

            {/* Sign In */}
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:underline font-semibold">
                Sign In
              </Link>
            </div>
          </FieldGroup>
        </form>
      )}

      {/* NGO Form */}
      {role === "ngo" && (
        <form onSubmit={submitNgo} className="animate-fadeIn">
          <FieldGroup className="gap-12">
            {/* Verification Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3">
              <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800 space-y-1">
                <strong className="block">Verification Process</strong>
                <p className="leading-relaxed">Your organization will be verified within 48 hours. You&apos;ll receive email confirmation once approved.</p>
              </div>
            </div>

            {/* Organization Info Title */}
            <div className="text-base font-semibold text-slate-900 -mb-8">Organization Information</div>

            {/* Organization Name */}
            <Field>
              <FieldLabel className="font-semibold text-slate-900 text-sm mb-2 block">
                Organization Name <span className="text-red-500">*</span>
              </FieldLabel>
              <Input
                placeholder="Hope Foundation"
                value={ngo.organizationName}
                onChange={(e) =>
                  setNgo({ ...ngo, organizationName: e.target.value })
                }
                required
                className="transition-all duration-200 h-11"
              />
            </Field>

            {/* Registration Number */}
            <Field>
              <FieldLabel className="font-semibold text-slate-900 text-sm mb-2 block">
                Registration Number <span className="text-red-500">*</span>
              </FieldLabel>
              <Input
                placeholder="REG-2024-001"
                value={ngo.registrationNumber}
                onChange={(e) =>
                  setNgo({ ...ngo, registrationNumber: e.target.value })
                }
                required
                className="transition-all duration-200 h-11"
              />
              <FieldDescription className="text-gray-500 text-xs mt-1.5">
                Your official government registration ID
              </FieldDescription>
            </Field>

            {/* Organization Description */}
            <Field>
              <FieldLabel className="font-semibold text-slate-900 text-sm mb-2 block">
                Organization Description <span className="text-red-500">*</span>
              </FieldLabel>
              <Input
                placeholder="Brief description of your NGO's mission"
                value={ngo.description}
                onChange={(e) => setNgo({ ...ngo, description: e.target.value })}
                required
                className="transition-all duration-200 h-11"
              />
            </Field>

            {/* Contact Details Title */}
            <div className="text-base font-semibold text-slate-900 -mb-8">Contact Details</div>

            {/* Email & Phone Row */}
            <div className="grid grid-cols-2 gap-6">
              <Field>
                <FieldLabel className="font-semibold text-slate-900 text-sm mb-2 block">
                  Email <span className="text-red-500">*</span>
                </FieldLabel>
                <Input
                  type="email"
                  placeholder="contact@ngo.org"
                  value={ngo.contactEmail}
                  onChange={(e) =>
                    setNgo({ ...ngo, contactEmail: e.target.value })
                  }
                  required
                  className="transition-all duration-200 h-11"
                />
              </Field>
              <Field>
                <FieldLabel className="font-semibold text-slate-900 text-sm mb-2 block">
                  Phone <span className="text-red-500">*</span>
                </FieldLabel>
                <Input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={ngo.contactPhone}
                  onChange={(e) =>
                    setNgo({ ...ngo, contactPhone: e.target.value })
                  }
                  required
                  className="transition-all duration-200 h-11"
                />
              </Field>
            </div>

            {/* Office Address */}
            <Field>
              <FieldLabel className="font-semibold text-slate-900 text-sm mb-2 block">
                Office Address <span className="text-red-500">*</span>
              </FieldLabel>
              <Input
                placeholder="123 Main Street, City, Country"
                value={ngo.address}
                onChange={(e) => setNgo({ ...ngo, address: e.target.value })}
                required
                className="transition-all duration-200 h-11"
              />
            </Field>

            {/* Security Title */}
            <div className="text-base font-semibold text-slate-900 -mb-8">Security</div>

            {/* Password & Confirm Password Row */}
            <div className="grid grid-cols-2 gap-6">
              <Field>
                <FieldLabel className="font-semibold text-slate-900 text-sm mb-2 block">
                  Password <span className="text-red-500">*</span>
                </FieldLabel>
                <InputGroup className="transition-all duration-200">
                  <InputGroupInput
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={ngo.password}
                    onChange={(e) =>
                      setNgo({ ...ngo, password: e.target.value })
                    }
                    required
                    className="h-11"
                  />
                  <InputGroupAddon
                    align="inline-end"
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-4 w-4 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-4 w-4 text-gray-400" />
                    )}
                  </InputGroupAddon>
                </InputGroup>
                <FieldDescription className="text-gray-500 text-xs mt-1.5">
                  Min 8 characters
                </FieldDescription>
              </Field>

              <Field>
                <FieldLabel className="font-semibold text-slate-900 text-sm mb-2 block">
                  Confirm Password <span className="text-red-500">*</span>
                </FieldLabel>
                <InputGroup className="transition-all duration-200">
                  <InputGroupInput
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={ngo.confirmPassword}
                    onChange={(e) =>
                      setNgo({ ...ngo, confirmPassword: e.target.value })
                    }
                    required
                    className="h-11"
                  />
                  <InputGroupAddon
                    align="inline-end"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOffIcon className="h-4 w-4 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-4 w-4 text-gray-400" />
                    )}
                  </InputGroupAddon>
                </InputGroup>
              </Field>
            </div>

            {/* Documents Title */}
            <div className="text-base font-semibold text-slate-900 -mb-8">Required Documents</div>

            {/* Document Upload */}
            <Field>
              <FieldLabel className="font-semibold text-slate-900 text-sm mb-2 block">
                Upload Registration Document
              </FieldLabel>
              <div 
                onClick={() => fileInputRef?.click()}
                className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 hover:bg-blue-50/30 transition-all duration-200 cursor-pointer"
              >
                <div className="flex justify-center mb-2">
                  <Upload className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-sm font-medium text-slate-900 mb-1">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  PDF, PNG, JPG (Max 10MB)
                </p>
                <input
                  ref={setFileInputRef}
                  type="file"
                  onChange={(e) =>
                    setNgo({
                      ...ngo,
                      documentFileName: e.target.files?.[0]?.name || "",
                    })
                  }
                  className="hidden"
                  accept=".pdf,.png,.jpg,.jpeg"
                />
              </div>
              {ngo.documentFileName && (
                <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                  <span>✓</span>
                  <span>{ngo.documentFileName}</span>
                </p>
              )}
              <FieldDescription className="text-gray-500 text-xs mt-2">
                Registration certificate or proof of status
              </FieldDescription>
            </Field>

            {/* Document Link */}
            <Field>
              <FieldLabel className="font-semibold text-slate-900 text-sm mb-2 block">
                Document Link (Optional)
              </FieldLabel>
              <Input
                placeholder="https://drive.google.com/..."
                value={ngo.documentUrl}
                onChange={(e) => setNgo({ ...ngo, documentUrl: e.target.value })}
                className="transition-all duration-200 h-11"
              />
              <FieldDescription className="text-gray-500 text-xs mt-1.5">
                Or provide a link to your document
              </FieldDescription>
            </Field>

            {/* Checkboxes */}
            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="ngo-terms"
                  checked={ngo.agreeToTerms}
                  onChange={(e) =>
                    setNgo({ ...ngo, agreeToTerms: e.target.checked })
                  }
                  className="mt-1 w-4 h-4 rounded border-gray-300 bg-gray-50 accent-blue-600 cursor-pointer"
                />
                <label htmlFor="ngo-terms" className="text-sm text-gray-700 leading-relaxed">
                  I verify all information is accurate and agree to the{" "}
                  <Link href="#" className="text-blue-600 hover:underline font-medium">
                    Terms & Conditions
                  </Link>
                </label>
              </div>
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="ngo-newsletter"
                  checked={ngo.newsletter}
                  onChange={(e) =>
                    setNgo({ ...ngo, newsletter: e.target.checked })
                  }
                  className="mt-1 w-4 h-4 rounded border-gray-300 bg-gray-50 accent-blue-600 cursor-pointer"
                />
                <label htmlFor="ngo-newsletter" className="text-sm text-gray-700 leading-relaxed">
                  Send me platform updates and feature announcements
                </label>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex gap-3 p-4 rounded-lg bg-red-50 border border-red-200 animate-fadeIn">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-lg transition-all duration-200 font-semibold text-white rounded-lg"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating Account...
                </span>
              ) : (
                "Register Your Organization"
              )}
            </Button>

            {/* Sign In */}
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:underline font-semibold">
                Sign In
              </Link>
            </div>
          </FieldGroup>
        </form>
      )}
    </div>
  );
}
