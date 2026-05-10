"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AuthProvider, useAuth } from "@/lib/auth-context";
import Sidebar from "@/components/admin/Sidebar";
import { Toaster } from "react-hot-toast";
import { Menu, Loader2 } from "lucide-react";

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!loading && !user && !isLoginPage) {
      router.push("/admin/login");
    }
    if (!loading && user && isLoginPage) {
      router.push("/admin");
    }
  }, [user, loading, isLoginPage, router]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-amber-500 animate-spin mx-auto mb-3" />
          <p className="text-slate-400 text-sm">Đang tải...</p>
        </div>
      </div>
    );
  }

  // Login page - no sidebar
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Not authenticated
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      {/* Main content */}
      <div
        className={`transition-all duration-300 ${
          sidebarCollapsed ? "lg:ml-[68px]" : "lg:ml-60"
        }`}
      >
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-slate-950/80 backdrop-blur-xl border-b border-white/[0.06]">
          <div className="flex items-center justify-between px-4 lg:px-6 h-14">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/[0.06] cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="hidden lg:block">
              <h2 className="text-sm font-medium text-slate-300">
                {getPageTitle(pathname)}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-500 hover:text-amber-400 px-3 py-1.5 rounded-lg border border-white/[0.06] hover:border-amber-500/20"
              >
                Xem website →
              </a>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}

function getPageTitle(pathname: string): string {
  const titles: Record<string, string> = {
    "/admin": "Dashboard",
    "/admin/properties": "Quản lý Bất động sản",
    "/admin/properties/new": "Thêm Bất động sản",
    "/admin/articles": "Quản lý Bài viết",
    "/admin/articles/new": "Thêm Bài viết",
    "/admin/consignments": "Liên hệ & Ký gửi",
  };
  // Check for edit pages  
  if (pathname.includes("/properties/") && pathname.endsWith("/edit")) {
    return "Sửa Bất động sản";
  }
  if (pathname.includes("/articles/") && pathname.endsWith("/edit")) {
    return "Sửa Bài viết";
  }
  return titles[pathname] || "Admin";
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1e293b",
            color: "#f1f5f9",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "12px",
            fontSize: "14px",
          },
          success: {
            iconTheme: { primary: "#f59e0b", secondary: "#1e293b" },
          },
          error: {
            iconTheme: { primary: "#ef4444", secondary: "#1e293b" },
          },
        }}
      />
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </AuthProvider>
  );
}
