"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { getArticleById, updateArticle } from "@/lib/firestore";
import ImageUploader from "@/components/admin/ImageUploader";
import toast from "react-hot-toast";
import { ArrowLeft, Save, Loader2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [author, setAuthor] = useState("");
  const [isPublished, setIsPublished] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const article = await getArticleById(id);
        if (article) {
          setTitle(article.title || "");
          setSlug(article.slug || "");
          setSummary(article.summary || "");
          setContent(article.content || "");
          setThumbnailUrl(article.thumbnailUrl || "");
          setAuthor(article.author || "");
          setIsPublished(article.isPublished ?? true);
        } else {
          toast.error("Không tìm thấy bài viết");
          router.push("/admin/articles");
        }
      } catch {
        toast.error("Lỗi khi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Vui lòng nhập tiêu đề");
      return;
    }

    setSaving(true);
    try {
      await updateArticle(id, {
        title,
        slug,
        summary,
        content,
        thumbnailUrl,
        author,
        isPublished,
      });
      toast.success("Đã cập nhật bài viết!");
      router.push("/admin/articles");
    } catch (error) {
      console.error(error);
      toast.error("Lỗi khi cập nhật");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-12 text-center">
        <Loader2 className="w-8 h-8 text-amber-500 animate-spin mx-auto mb-3" />
        <p className="text-sm text-slate-400">Đang tải dữ liệu...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/articles"
          className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/[0.06]"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-white">Sửa bài viết</h1>
          <p className="text-sm text-slate-400 mt-0.5 truncate max-w-md">
            {title}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 space-y-5">
          <h2 className="text-sm font-semibold text-white">Thông tin bài viết</h2>

          <div className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                Tiêu đề *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                Slug (URL)
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                Tác giả
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30"
              />
            </div>

            <ImageUploader
              value={thumbnailUrl}
              onChange={setThumbnailUrl}
              label="Ảnh bìa"
            />

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                Tóm tắt
              </label>
              <textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                rows={2}
                className="w-full px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                Nội dung (HTML)
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={12}
                className="w-full px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 resize-y font-mono text-xs"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsPublished(!isPublished)}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border cursor-pointer ${
                  isPublished
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    : "bg-slate-500/10 text-slate-400 border-slate-500/20"
                }`}
              >
                {isPublished ? (
                  <>
                    <Eye className="w-3.5 h-3.5" /> Đã đăng
                  </>
                ) : (
                  <>
                    <EyeOff className="w-3.5 h-3.5" /> Bản nháp
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Link
            href="/admin/articles"
            className="px-5 py-2.5 text-sm font-medium text-slate-300 rounded-xl border border-white/[0.08] hover:bg-white/[0.04]"
          >
            Hủy
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm font-semibold rounded-xl shadow-lg shadow-amber-500/20 disabled:opacity-50 cursor-pointer"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Đang lưu...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Cập nhật
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
