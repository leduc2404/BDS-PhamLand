"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProperty } from "@/lib/firestore";
import ImageUploader, {
  MultiImageUploader,
} from "@/components/admin/ImageUploader";
import toast from "react-hot-toast";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";

export default function NewPropertyPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [area, setArea] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [priceDisplay, setPriceDisplay] = useState("");
  const [propertyType, setPropertyType] = useState("land");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [isHot, setIsHot] = useState(false);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    setSlug(generateSlug(value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return toast.error("Vui lòng nhập tiêu đề");
    if (!thumbnailUrl) return toast.error("Vui lòng upload ảnh đại diện");

    setSaving(true);
    try {
      await createProperty({
        title,
        slug,
        description,
        location,
        area,
        price,
        priceDisplay,
        propertyType,
        thumbnailUrl,
        images: images.filter(Boolean),
        isHot,
      });
      toast.success("Đã thêm bất động sản mới!");
      router.push("/admin/properties");
    } catch (error) {
      console.error(error);
      toast.error("Lỗi khi thêm bất động sản");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/properties" className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/[0.06]">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-white">Thêm bất động sản</h1>
          <p className="text-sm text-slate-400 mt-0.5">Điền thông tin để thêm BĐS mới</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 space-y-5">
          <h2 className="text-sm font-semibold text-white">Thông tin cơ bản</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Tiêu đề *</label>
              <input type="text" value={title} onChange={(e) => handleTitleChange(e.target.value)} placeholder="VD: Đất nền biệt thự view sông Aqua City" required className="w-full px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Slug (URL)</label>
              <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Loại BĐS</label>
              <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)} className="w-full px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 cursor-pointer">
                <option value="land" className="bg-slate-800">Đất nền</option>
                <option value="apartment" className="bg-slate-800">Căn hộ</option>
                <option value="villa" className="bg-slate-800">Biệt thự</option>
                <option value="shophouse" className="bg-slate-800">Shophouse</option>
                <option value="townhouse" className="bg-slate-800">Nhà phố</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Vị trí</label>
              <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="VD: Khu đô thị Aqua City, Đồng Nai" className="w-full px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Diện tích (m²)</label>
              <input type="number" value={area || ""} onChange={(e) => setArea(Number(e.target.value))} placeholder="200" className="w-full px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Giá (VNĐ)</label>
              <input type="number" value={price || ""} onChange={(e) => setPrice(Number(e.target.value))} placeholder="12000000000" className="w-full px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Giá hiển thị</label>
              <input type="text" value={priceDisplay} onChange={(e) => setPriceDisplay(e.target.value)} placeholder="VD: 12 Tỷ" className="w-full px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30" />
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" id="isHot" checked={isHot} onChange={(e) => setIsHot(e.target.checked)} className="w-4 h-4 rounded accent-amber-500 cursor-pointer" />
              <label htmlFor="isHot" className="text-sm text-slate-300 cursor-pointer">
                Đánh dấu là <span className="text-red-400 font-semibold">HOT</span>
              </label>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Mô tả</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} placeholder="Mô tả chi tiết về bất động sản..." className="w-full px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 resize-none" />
            </div>
          </div>
        </div>

        {/* Images - Upload */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 space-y-5">
          <h2 className="text-sm font-semibold text-white">Hình ảnh</h2>
          <ImageUploader
            value={thumbnailUrl}
            onChange={setThumbnailUrl}
            label="Ảnh đại diện *"
          />
          <MultiImageUploader
            values={images}
            onChange={setImages}
            label="Gallery (ảnh bổ sung)"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <Link href="/admin/properties" className="px-5 py-2.5 text-sm font-medium text-slate-300 hover:text-white rounded-xl border border-white/[0.08] hover:bg-white/[0.04]">
            Hủy
          </Link>
          <button type="submit" disabled={saving} className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm font-semibold rounded-xl shadow-lg shadow-amber-500/20 disabled:opacity-50 cursor-pointer">
            {saving ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Đang lưu...</>
            ) : (
              <><Save className="w-4 h-4" /> Lưu bất động sản</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
