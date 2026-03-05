"use client";

import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/features", label: "Features" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-bold text-lg tracking-tight text-black hover:text-blue-600 transition-colors duration-300">
            Transaction Transparency
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {!user && navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <div className="flex items-center gap-2 text-sm animate-fadeIn">
                  <span className="font-medium text-black">{user.name}</span>
                  <span className="text-gray-500">•</span>
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-semibold uppercase tracking-wide">
                    {user.role}
                  </span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => logout()}
                  className="border-gray-300 text-black hover:bg-gray-50 hover:border-gray-900 transition-all duration-300 hover:scale-105"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link className="text-sm text-gray-600 hover:text-black transition-all duration-300 hover:scale-105 inline-block" href="/login">
                  Login
                </Link>
                <Button asChild size="sm" className="transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <Link href="/signup">Get Started</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 animate-fadeIn">
            {!user && navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <div className="space-y-3 pt-3 border-t">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-black">{user.name}</span>
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-semibold uppercase tracking-wide">
                    {user.role}
                  </span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => logout()}
                  className="w-full border-gray-300 text-black hover:bg-gray-50 hover:border-gray-900"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 pt-3 border-t">
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild size="sm" className="w-full">
                  <Link href="/signup">Get Started</Link>
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
