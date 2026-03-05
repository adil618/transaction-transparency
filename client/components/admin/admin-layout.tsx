"use client";

import { useState, memo } from "react";
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

interface SidebarProps {
  className?: string;
  pathname: string;
  onLinkClick?: () => void;
}

const Sidebar = memo(function Sidebar({ className, pathname, onLinkClick }: SidebarProps) {
  return (
    <div className={cn("flex h-full flex-col bg-white border-r border-gray-200 shadow-lg", className)}>
      <div className="flex h-16 items-center border-b border-gray-200 px-6 bg-gradient-to-r from-slate-50 to-white">
        <Link href="/dashboard/admin" className="flex items-center gap-2 font-bold text-black group transition-all duration-300 hover:scale-105">
          <div className="p-1.5 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg transition-transform duration-300 group-hover:rotate-12">
            <BarChart3 className="h-5 w-5 text-white" />
          </div>
          <span className="tracking-tight">Admin</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {sidebarItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-300 animate-fadeIn opacity-0",
                isActive
                  ? "bg-gradient-to-r from-slate-900 to-blue-900 text-white shadow-lg scale-105"
                  : "text-gray-700 hover:bg-gradient-to-r hover:from-slate-100 hover:to-blue-50 hover:translate-x-1"
              )}
              style={{animationDelay: `${index * 0.05}s`}}
              onClick={onLinkClick}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-gray-200 p-4 bg-gradient-to-r from-slate-50 to-white">
        <div className="text-xs text-gray-500">© 2026 Transaction Transparency</div>
      </div>
    </div>
  );
});

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const handleCloseSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex h-screen bg-white">
      {/* Desktop Sidebar */}
      <div className="hidden w-64 lg:block">
        <Sidebar pathname={pathname} />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <Sidebar pathname={pathname} onLinkClick={handleCloseSidebar} />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Topbar */}
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white/80 backdrop-blur-md px-6 shadow-sm sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-black hover:bg-gray-100 lg:hidden transition-all duration-300 hover:scale-110"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle sidebar</span>
                </Button>
              </SheetTrigger>
            </Sheet>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-blue-600 hidden md:block">
              Transaction Transparency
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="relative h-10 w-10 rounded-full p-0 hover:bg-gray-100 transition-all duration-300 hover:scale-110"
                >
                  <Avatar className="h-10 w-10 ring-2 ring-transparent hover:ring-blue-500 transition-all duration-300">
                    <AvatarImage src="" alt={user?.name} />
                    <AvatarFallback className="bg-gradient-to-br from-slate-900 to-blue-900 text-white font-semibold">
                      {user?.name?.split(" ").map((n) => n[0]).join("").toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 animate-fadeIn" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-semibold text-black">{user?.name}</p>
                    <p className="text-xs text-gray-600">
                      {user?.email}
                    </p>
                    <p className="text-xs font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                      Administrator
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-200" />
                <DropdownMenuItem className="cursor-pointer hover:bg-blue-50 transition-colors duration-200">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-blue-50 transition-colors duration-200">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-200" />
                <DropdownMenuItem 
                  onClick={logout}
                  className="cursor-pointer text-red-600 hover:bg-red-50 transition-colors duration-200"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-gradient-to-br from-slate-50 via-white to-blue-50 p-6">
          <div className="max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}