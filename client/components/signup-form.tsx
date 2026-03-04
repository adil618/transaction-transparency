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
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useAuth } from "@/context/auth-context";
import { apiFetch } from "@/lib/api";
import { EyeIcon, EyeOffIcon } from "lucide-react";

type Role = "donor" | "ngo";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { register } = useAuth();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<Role>("donor");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [account, setAccount] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [ngoDetails, setNgoDetails] = useState({
    name: "",
    registrationNumber: "",
    description: "",
    contactEmail: "",
    contactPhone: "",
    address: "",
    documentUrl: "",
    documentFileName: "",
  });

  const [donorDetails, setDonorDetails] = useState({
    phone: "",
    preferredCause: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const nextStep = () => {
    setError(null);
    if (!account.name || !account.email || !account.password) {
      setError("Please complete all required fields.");
      return;
    }
    if (account.password !== account.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setStep(2);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await register({
        name: account.name,
        email: account.email,
        password: account.password,
        role,
      });

      if (role === "ngo") {
        await apiFetch("/api/ngos", {
          method: "POST",
          body: JSON.stringify({
            name: ngoDetails.name,
            registrationNumber: ngoDetails.registrationNumber,
            description: ngoDetails.description,
            contactEmail: ngoDetails.contactEmail,
            contactPhone: ngoDetails.contactPhone,
            address: ngoDetails.address,
            documents: ngoDetails.documentUrl
              ? [
                  {
                    name: ngoDetails.documentFileName || "document",
                    url: ngoDetails.documentUrl,
                  },
                ]
              : [],
          }),
        });
      }
    } catch (err: any) {
      setError(err?.message || "Registration failed");
      return;
    } finally {
      setLoading(false);
    }
    window.location.href = "/dashboard";
  };

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={submit}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Step {step} of 2
          </p>
        </div>

        {step === 1 && (
          <>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={account.name}
                onChange={(e) =>
                  setAccount({ ...account, name: e.target.value })
                }
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={account.email}
                onChange={(e) =>
                  setAccount({ ...account, email: e.target.value })
                }
                required
              />
              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={account.password}
                  onChange={(e) =>
                    setAccount({ ...account, password: e.target.value })
                  }
                  required
                />
                <InputGroupAddon
                  align="inline-end"
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer"
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </InputGroupAddon>
              </InputGroup>
              <FieldDescription>Must be at least 8 characters long.</FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  value={account.confirmPassword}
                  onChange={(e) =>
                    setAccount({ ...account, confirmPassword: e.target.value })
                  }
                  required
                />
                <InputGroupAddon
                  align="inline-end"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="cursor-pointer"
                >
                  {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                </InputGroupAddon>
              </InputGroup>
              <FieldDescription>Please confirm your password.</FieldDescription>
            </Field>
            <Field>
              <FieldLabel>Role</FieldLabel>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={role === "donor" ? "default" : "outline"}
                  onClick={() => setRole("donor")}
                >
                  Donor
                </Button>
                <Button
                  type="button"
                  variant={role === "ngo" ? "default" : "outline"}
                  onClick={() => setRole("ngo")}
                >
                  NGO
                </Button>
              </div>
            </Field>
            {error && <FieldDescription className="text-red-600">{error}</FieldDescription>}
            <Field>
              <Button type="button" onClick={nextStep}>
                Continue
              </Button>
            </Field>
          </>
        )}

        {step === 2 && role === "donor" && (
          <>
            <Field>
              <FieldLabel>Phone (Optional)</FieldLabel>
              <Input
                placeholder="+1-555-0101"
                value={donorDetails.phone}
                onChange={(e) =>
                  setDonorDetails({ ...donorDetails, phone: e.target.value })
                }
              />
            </Field>
            <Field>
              <FieldLabel>Preferred Cause (Optional)</FieldLabel>
              <Input
                placeholder="Education, Relief, Food"
                value={donorDetails.preferredCause}
                onChange={(e) =>
                  setDonorDetails({
                    ...donorDetails,
                    preferredCause: e.target.value,
                  })
                }
              />
            </Field>
            {error && <FieldDescription className="text-red-600">{error}</FieldDescription>}
            <Field>
              <Button type="submit" disabled={loading}>
                {loading ? "Creating..." : "Create Account"}
              </Button>
            </Field>
          </>
        )}

        {step === 2 && role === "ngo" && (
          <>
            <Field>
              <FieldLabel>NGO Name</FieldLabel>
              <Input
                placeholder="Hope Foundation"
                value={ngoDetails.name}
                onChange={(e) =>
                  setNgoDetails({ ...ngoDetails, name: e.target.value })
                }
                required
              />
            </Field>
            <Field>
              <FieldLabel>Registration Number</FieldLabel>
              <Input
                placeholder="REG-2025-001"
                value={ngoDetails.registrationNumber}
                onChange={(e) =>
                  setNgoDetails({
                    ...ngoDetails,
                    registrationNumber: e.target.value,
                  })
                }
                required
              />
            </Field>
            <Field>
              <FieldLabel>Description</FieldLabel>
              <Input
                placeholder="Focus on relief and education."
                value={ngoDetails.description}
                onChange={(e) =>
                  setNgoDetails({ ...ngoDetails, description: e.target.value })
                }
                required
              />
            </Field>
            <Field>
              <FieldLabel>Contact Email</FieldLabel>
              <Input
                placeholder="contact@ngo.org"
                value={ngoDetails.contactEmail}
                onChange={(e) =>
                  setNgoDetails({ ...ngoDetails, contactEmail: e.target.value })
                }
                required
              />
            </Field>
            <Field>
              <FieldLabel>Contact Phone</FieldLabel>
              <Input
                placeholder="+1-555-1111"
                value={ngoDetails.contactPhone}
                onChange={(e) =>
                  setNgoDetails({ ...ngoDetails, contactPhone: e.target.value })
                }
                required
              />
            </Field>
            <Field>
              <FieldLabel>Address</FieldLabel>
              <Input
                placeholder="123 Main St, Austin, TX"
                value={ngoDetails.address}
                onChange={(e) =>
                  setNgoDetails({ ...ngoDetails, address: e.target.value })
                }
                required
              />
            </Field>
            <Field>
              <FieldLabel>Document Upload</FieldLabel>
              <Input
                type="file"
                onChange={(e) =>
                  setNgoDetails({
                    ...ngoDetails,
                    documentFileName: e.target.files?.[0]?.name || "",
                  })
                }
              />
              <FieldDescription>
                Upload registration proof (stored as metadata in this demo).
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel>Document URL (Optional)</FieldLabel>
              <Input
                placeholder="https://drive.google.com/..."
                value={ngoDetails.documentUrl}
                onChange={(e) =>
                  setNgoDetails({ ...ngoDetails, documentUrl: e.target.value })
                }
              />
            </Field>
            {error && <FieldDescription className="text-red-600">{error}</FieldDescription>}
            <Field>
              <Button type="submit" disabled={loading}>
                {loading ? "Creating..." : "Create Account"}
              </Button>
            </Field>
          </>
        )}

        <FieldSeparator>Already have an account?</FieldSeparator>
        <Field>
          <Button variant="outline" type="button" asChild>
            <Link href="/login">Sign in</Link>
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
