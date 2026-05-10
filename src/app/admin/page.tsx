"use client";

import { useEffect, useState } from "react";
import { Building2, FileText, MessageSquare, TrendingUp, ArrowUpRight, Plus } from "lucide-react";
import Link from "next/link";
import { getDashboardStats, getProperties, getConsignments, Property, Consignment } from "@/lib/firestore";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

interface Stats {
  totalProperties: number;
  totalArticles: number;
  totalConsignments: number;
  newConsignments: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentProperties, setRecentProperties] = useState<Property[]>([]);
  const [recentContacts, setRecentContacts] = useState<Consignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [statsData, properties, contacts] = await Promise.all([
          getDashboardStats(),
          getProperties(5),
          getConsignments(5),
        ]);
        setStats(statsData);
        setRecentProperties(properties);
        setRecentContacts(contacts);
      } catch (error) {
        console.error("Error loading dashboard:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-white/[0.03] rounded-2xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-80 bg-white/[0.03] rounded-2xl" />
          <div className="h-80 bg-white/[0.03] rounded-2xl" />
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: "Bất động sản",
      value: stats?.totalProperties || 0,
      icon: Building2,
      color: "from-blue-500 to-blue-600",
      shadow: "shadow-blue-500/20",
      href: "/admin/properties",
    },
    {
      title: "Bài viết",
      value: stats?.totalArticles || 0,
      icon: FileText,
      color: "from-emerald-500 to-emerald-600",
      shadow: "shadow-emerald-500/20",
      href: "/admin/articles",
    },
    {
      title: "Yêu cầu ký gửi",
      value: stats?.totalConsignments || 0,
      icon: MessageSquare,
      color: "from-violet-500 to-violet-600",
      shadow: "shadow-violet-500/20",
      href: "/admin/consignments",
    },
    {
      title: "Chưa xử lý",
      value: stats?.newConsignments || 0,
      icon: TrendingUp,
      color: "from-amber-500 to-amber-600",
      shadow: "shadow-amber-500/20",
      href: "/admin/consignments",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white">Dashboard</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Tổng quan hệ thống quản trị Pham Land
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/properties/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm font-medium rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30"
          >
            <Plus className="w-4 h-4" />
            Thêm BĐS
          </Link>
          <Link
            href="/admin/articles/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.06] hover:bg-white/[0.1] text-slate-300 text-sm font-medium rounded-xl border border-white/[0.08]"
          >
            <Plus className="w-4 h-4" />
            Thêm bài viết
          </Link>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="group relative bg-white/[0.03] hover:bg-white/[0.05] border border-white/[0.06] rounded-2xl p-5 overflow-hidden"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                  {card.title}
                </p>
                <p className="text-2xl font-bold text-white mt-2">
                  {card.value}
                </p>
              </div>
              <div
                className={`w-10 h-10 bg-gradient-to-br ${card.color} rounded-xl flex items-center justify-center shadow-lg ${card.shadow}`}
              >
                <card.icon className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="absolute bottom-2 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight className="w-4 h-4 text-slate-500" />
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Properties */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">
              BĐS mới nhất
            </h3>
            <Link
              href="/admin/properties"
              className="text-xs text-amber-400 hover:text-amber-300"
            >
              Xem tất cả →
            </Link>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {recentProperties.length === 0 ? (
              <div className="p-8 text-center text-sm text-slate-500">
                Chưa có bất động sản nào
              </div>
            ) : (
              recentProperties.map((property) => (
                <div
                  key={property.id}
                  className="px-5 py-3.5 flex items-center gap-3 hover:bg-white/[0.02]"
                >
                  <div className="w-10 h-10 bg-slate-800 rounded-lg flex-shrink-0 overflow-hidden">
                    {property.thumbnailUrl ? (
                      <img
                        src={property.thumbnailUrl}
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Building2 className="w-4 h-4 text-slate-600" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate">
                      {property.title}
                    </p>
                    <p className="text-xs text-slate-500">
                      {property.priceDisplay} · {property.location}
                    </p>
                  </div>
                  {property.isHot && (
                    <span className="px-2 py-0.5 bg-red-500/10 text-red-400 text-[10px] font-semibold rounded-full">
                      HOT
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Contacts / Consignments */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">
              Ký gửi / Liên hệ mới
            </h3>
            <Link
              href="/admin/consignments"
              className="text-xs text-amber-400 hover:text-amber-300"
            >
              Xem tất cả →
            </Link>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {recentContacts.length === 0 ? (
              <div className="p-8 text-center text-sm text-slate-500">
                Chưa có yêu cầu nào
              </div>
            ) : (
              recentContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="px-5 py-3.5 flex items-center gap-3 hover:bg-white/[0.02]"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-violet-500/20 to-violet-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-violet-400">
                      {contact.fullName?.charAt(0) || "?"}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate">
                      {contact.fullName}
                    </p>
                    <p className="text-xs text-slate-500">
                      {contact.consultationType} ·{" "}
                      {contact.createdAt
                        ? format(contact.createdAt.toDate(), "dd/MM/yyyy", {
                            locale: vi,
                          })
                        : "N/A"}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${
                      contact.status === "new"
                        ? "bg-amber-500/10 text-amber-400"
                        : contact.status === "contacted"
                        ? "bg-blue-500/10 text-blue-400"
                        : "bg-emerald-500/10 text-emerald-400"
                    }`}
                  >
                    {contact.status === "new"
                      ? "Mới"
                      : contact.status === "contacted"
                      ? "Đã liên hệ"
                      : "Hoàn tất"}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
