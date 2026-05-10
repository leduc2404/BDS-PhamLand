"use client";

import { useEffect, useState } from "react";
import {
  getConsignments,
  updateConsignmentStatus,
  Consignment,
} from "@/lib/firestore";
import toast from "react-hot-toast";
import {
  MessageSquare,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
} from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

export default function ConsignmentsPage() {
  const [consignments, setConsignments] = useState<Consignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getConsignments(100);
      setConsignments(data);
    } catch (error) {
      console.error(error);
      toast.error("Không thể tải dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      await updateConsignmentStatus(id, newStatus);
      setConsignments((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
      );
      toast.success("Đã cập nhật trạng thái");
    } catch {
      toast.error("Lỗi khi cập nhật");
    } finally {
      setUpdatingId(null);
    }
  };

  const filtered =
    filter === "all"
      ? consignments
      : consignments.filter((c) => c.status === filter);

  const statusCounts = {
    all: consignments.length,
    new: consignments.filter((c) => c.status === "new").length,
    contacted: consignments.filter((c) => c.status === "contacted").length,
    done: consignments.filter((c) => c.status === "done").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-white">Liên hệ & Ký gửi</h1>
        <p className="text-sm text-slate-400 mt-0.5">
          Quản lý yêu cầu tư vấn và ký gửi từ khách hàng
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {[
          { key: "all", label: "Tất cả", count: statusCounts.all },
          { key: "new", label: "Mới", count: statusCounts.new },
          {
            key: "contacted",
            label: "Đã liên hệ",
            count: statusCounts.contacted,
          },
          { key: "done", label: "Hoàn tất", count: statusCounts.done },
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => setFilter(item.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border cursor-pointer ${
              filter === item.key
                ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                : "bg-white/[0.03] text-slate-400 border-white/[0.06] hover:bg-white/[0.06]"
            }`}
          >
            {item.label}
            <span className="ml-1.5 text-[10px] opacity-60">
              {item.count}
            </span>
          </button>
        ))}
      </div>

      {/* Cards */}
      {loading ? (
        <div className="p-12 text-center">
          <div className="w-8 h-8 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-400">Đang tải...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center bg-white/[0.03] border border-white/[0.06] rounded-2xl">
          <MessageSquare className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <p className="text-sm text-slate-400">Không có yêu cầu nào</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 hover:bg-white/[0.04]"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-violet-500/20 to-violet-600/20 rounded-xl flex items-center justify-center">
                    <span className="text-sm font-bold text-violet-400">
                      {item.fullName?.charAt(0) || "?"}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {item.fullName}
                    </p>
                    <p className="text-xs text-slate-500">
                      {item.consultationType}
                    </p>
                  </div>
                </div>

                {/* Status badge */}
                <span
                  className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${
                    item.status === "new"
                      ? "bg-amber-500/10 text-amber-400"
                      : item.status === "contacted"
                      ? "bg-blue-500/10 text-blue-400"
                      : "bg-emerald-500/10 text-emerald-400"
                  }`}
                >
                  {item.status === "new"
                    ? "Mới"
                    : item.status === "contacted"
                    ? "Đã liên hệ"
                    : "Hoàn tất"}
                </span>
              </div>

              {/* Contact info */}
              <div className="space-y-1.5 mb-3">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Phone className="w-3.5 h-3.5" />
                  <a
                    href={`tel:${item.phone}`}
                    className="hover:text-amber-400"
                  >
                    {item.phone}
                  </a>
                </div>
                {item.email && (
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Mail className="w-3.5 h-3.5" />
                    <a
                      href={`mailto:${item.email}`}
                      className="hover:text-amber-400"
                    >
                      {item.email}
                    </a>
                  </div>
                )}
                {item.createdAt && (
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Clock className="w-3.5 h-3.5" />
                    {format(item.createdAt.toDate(), "dd/MM/yyyy HH:mm", {
                      locale: vi,
                    })}
                  </div>
                )}
              </div>

              {/* Details */}
              {item.details && (
                <p className="text-xs text-slate-400 bg-white/[0.03] rounded-lg p-3 mb-3 italic">
                  &ldquo;{item.details}&rdquo;
                </p>
              )}

              {/* Source */}
              {item.source && (
                <p className="text-[10px] text-slate-600 mb-3">
                  Nguồn: {item.source}
                </p>
              )}

              {/* Actions */}
              <div className="flex items-center gap-2 pt-3 border-t border-white/[0.04]">
                {item.status === "new" && (
                  <button
                    onClick={() =>
                      handleStatusChange(item.id, "contacted")
                    }
                    disabled={updatingId === item.id}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 text-blue-400 text-xs font-medium rounded-lg hover:bg-blue-500/20 border border-blue-500/10 cursor-pointer disabled:opacity-50"
                  >
                    <AlertCircle className="w-3.5 h-3.5" />
                    Đánh dấu đã liên hệ
                  </button>
                )}
                {item.status === "contacted" && (
                  <button
                    onClick={() => handleStatusChange(item.id, "done")}
                    disabled={updatingId === item.id}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 text-emerald-400 text-xs font-medium rounded-lg hover:bg-emerald-500/20 border border-emerald-500/10 cursor-pointer disabled:opacity-50"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Hoàn tất
                  </button>
                )}
                {item.status !== "new" && (
                  <div className="relative ml-auto">
                    <select
                      value={item.status}
                      onChange={(e) =>
                        handleStatusChange(item.id, e.target.value)
                      }
                      disabled={updatingId === item.id}
                      className="appearance-none px-3 py-1.5 pr-7 bg-white/[0.04] text-slate-400 text-xs rounded-lg border border-white/[0.06] cursor-pointer focus:outline-none disabled:opacity-50"
                    >
                      <option value="new" className="bg-slate-800">
                        Mới
                      </option>
                      <option value="contacted" className="bg-slate-800">
                        Đã liên hệ
                      </option>
                      <option value="done" className="bg-slate-800">
                        Hoàn tất
                      </option>
                    </select>
                    <ChevronDown className="w-3 h-3 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
