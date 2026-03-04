"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BarChart3,
  Users,
  Building2,
  Target,
  UserCheck,
  CreditCard,
  Settings,
  Menu,
  LogOut,
  User,
} from "lucide-react";
import { useAuth } from "@/context/auth-context";

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard/admin",
    icon: BarChart3,
  },
  {
    title: "Users",
    href: "/dashboard/admin/users",
    icon: Users,
  },
  {
    title: "NGOs",
    href: "/dashboard/admin/ngos",
    icon: Building2,
  },
  {
    title: "Campaigns",
    href: "/dashboard/admin/campaigns",
    icon: Target,
  },
  {
    title: "Beneficiaries",
    href: "/dashboard/admin/beneficiaries",
    icon: UserCheck,
  },
  {
    title: "Transactions",
    href: "/dashboard/admin/transactions",
    icon: CreditCard,
  },
  {
    title: "Settings",
    href: "/dashboard/admin/settings",
    icon: Settings,
  },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const Sidebar = ({ className }: { className?: string }) => (
    <div className={cn("flex h-full flex-col bg-white border-r border-gray-200", className)}>
      <div className="flex h-16 items-center border-b border-gray-200 px-6">
        <Link href="/dashboard/admin" className="flex items-center gap-2 font-bold text-black">
          <BarChart3 className="h-5 w-5" />
          <span className="tracking-tight">Admin</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all",
                isActive
                  ? "bg-black text-white shadow-sm"
                  : "text-gray-700 hover:bg-gray-100"
              )}
              onClick={() => setSidebarOpen(false)}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-gray-200 p-4">
        <div className="text-xs text-gray-500">© 2026 Transaction Transparency</div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-white">
      {/* Desktop Sidebar */}
      <div className="hidden w-64 lg:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <Sidebar />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Topbar */}
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 shadow-sm">
          <div className="flex items-center gap-4">
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-black hover:bg-gray-100 lg:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle sidebar</span>
                </Button>
              </SheetTrigger>
            </Sheet>
            <h1 className="text-xl font-bold text-black hidden md:block">Transaction Transparency</h1>
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="relative h-10 w-10 rounded-full p-0 hover:bg-gray-100"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="" alt={user?.name} />
                    <AvatarFallback className="bg-black text-white font-semibold">
                      {user?.name?.split(" ").map((n) => n[0]).join("").toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-semibold text-black">{user?.name}</p>
                    <p className="text-xs text-gray-600">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-200" />
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-200" />
                <DropdownMenuItem 
                  onClick={logout}
                  className="cursor-pointer text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-white p-6">
          <div className="max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}