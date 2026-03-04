"use client";

import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
      <Link href="/" className="font-bold text-lg tracking-tight text-black">
        Transaction Transparency
      </Link>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium text-black">{user.name}</span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-600 capitalize">{user.role}</span>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => logout()}
              className="border-gray-300 text-black hover:bg-gray-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link className="text-sm text-gray-600 hover:text-black transition-colors" href="/login">
              Login
            </Link>
            <Button asChild size="sm">
              <Link href="/signup">Get Started</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
