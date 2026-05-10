"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getArticles, deleteArticle, Article } from "@/lib/firestore";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import toast from "react-hot-toast";
import { Plus, Search, Pencil, Trash2, FileText, Eye } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    setLoading(true);
    try {
      const data = await getArticles(100);
      setArticles(data);
    } catch (error) {
      console.error(error);
      toast.error("Không thể tải danh sách bài viết");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await deleteArticle(deleteId);
      setArticles((prev) => prev.filter((a) => a.id !== deleteId));
      toast.success("Đã xóa bài viết");
    } catch {
      toast.error("Lỗi khi xóa");
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  const filtered = articles.filter(
    (a) =>
      a.title?.toLowerCase().includes(search.toLowerCase()) ||
      a.author?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white">Bài viết</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Quản lý bài viết / tin tức trên website
          </p>
        </div>
        <Link
          href="/admin/articles/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm font-medium rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 w-fit"
        >
          <Plus className="w-4 h-4" />
          Thêm bài viết
        </Link>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input
          type="text"
          placeholder="Tìm theo tiêu đề, tác giả..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/30"
        />
      </div>

      {/* Table */}
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-8 h-8 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-slate-400">Đang tải...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <FileText className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <p className="text-sm text-slate-400">
              {search ? "Không tìm thấy kết quả" : "Chưa có bài viết nào"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Bài viết
                  </th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden md:table-cell">
                    Tác giả
                  </th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden lg:table-cell">
                    Trạng thái
                  </th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden xl:table-cell">
                    Ngày tạo
                  </th>
                  <th className="text-right px-5 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {filtered.map((article) => (
                  <tr
                    key={article.id}
                    className="hover:bg-white/[0.02] group"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-slate-800 rounded-xl flex-shrink-0 overflow-hidden">
                          {article.thumbnailUrl ? (
                            <img
                              src={article.thumbnailUrl}
                              alt={article.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <FileText className="w-5 h-5 text-slate-600" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-white truncate max-w-[250px]">
                            {article.title}
                          </p>
                          <p className="text-xs text-slate-500 truncate max-w-[250px] mt-0.5">
                            {article.summary}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 hidden md:table-cell text-slate-400">
                      {article.author}
                    </td>
                    <td className="px-5 py-3.5 hidden lg:table-cell">
                      <span
                        className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${
                          article.isPublished
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-slate-500/10 text-slate-400"
                        }`}
                      >
                        {article.isPublished ? "Đã đăng" : "Nháp"}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 hidden xl:table-cell text-slate-500 text-xs">
                      {article.createdAt
                        ? format(article.createdAt.toDate(), "dd/MM/yyyy", {
                            locale: vi,
                          })
                        : "—"}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/tin-tuc/${article.slug || article.id}`}
                          target="_blank"
                          className="p-2 text-slate-500 hover:text-blue-400 rounded-lg hover:bg-blue-500/10"
                          title="Xem trên website"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/articles/${article.id}/edit`}
                          className="p-2 text-slate-500 hover:text-amber-400 rounded-lg hover:bg-amber-500/10"
                          title="Sửa"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setDeleteId(article.id)}
                          className="p-2 text-slate-500 hover:text-red-400 rounded-lg hover:bg-red-500/10 cursor-pointer"
                          title="Xóa"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {!loading && filtered.length > 0 && (
        <p className="text-xs text-slate-500">
          Hiển thị {filtered.length} bài viết
        </p>
      )}

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Xóa bài viết"
        message="Bạn có chắc muốn xóa bài viết này? Hành động này không thể hoàn tác."
        loading={deleting}
      />
    </div>
  );
}
