"use client";

import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <div className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
      <Link href="/" className="font-semibold text-slate-900">
        Transaction Transparency
      </Link>
      <div className="flex items-center gap-3">
        {user ? (
          <>
            <span className="text-sm text-slate-600">
              {user.name} · {user.role}
            </span>
            <Button variant="outline" onClick={() => logout()}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link className="text-sm text-slate-600" href="/login">
              Login
            </Link>
            <Button asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
