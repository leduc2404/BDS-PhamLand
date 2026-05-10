"use client";

import { useState, useEffect } from "react";
import PropertyCard from "@/components/PropertyCard";
import { getProperties } from "@/lib/firestore";

export default function CanHoPage() {
  const [firestoreApartments, setFirestoreApartments] = useState<any[]>([]);

  useEffect(() => {
    // Fetch Firestore properties on mount
    getProperties(100).then((data) => {
      // Filter for apartments and map to PropertyCard props
      const apts = data.filter(p => p.propertyType === "apartment");
      const mapped = apts.map((p) => ({
        id: p.slug || p.id,
        title: p.title,
        location: p.location,
        price: p.priceDisplay || `${(p.price / 1000000000).toFixed(1)} Tỷ`,
        area: p.area.toString() + " m²",
        image: p.thumbnailUrl || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
        imageAlt: p.title,
        badge: p.isHot ? { text: "HOT", color: "accent" } : undefined,
        secondLabel: "HƯỚNG",
        secondValue: "Căn hộ", // Identifying it as apartment for routing in PropertyCard
        tags: ["sổ đỏ", "bàn giao ngay"],
        createdAt: p.createdAt?.toMillis?.() || Date.now()
      }));
      
      // Sort newest first
      mapped.sort((a, b) => b.createdAt - a.createdAt);
      setFirestoreApartments(mapped);
    }).catch(console.error);
  }, []);

  const displayProperties = firestoreApartments;

  return (
    <main className="pt-24 md:pt-32 pb-16 md:pb-24 bg-background-light min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header Section */}
        <div className="mb-12 md:mb-16 border-b-2 border-slate-200 pb-6 md:pb-8">
          <p className="text-accent uppercase tracking-[0.2em] font-bold text-xs mb-3 flex items-center gap-2">
            <span className="w-8 h-[1px] bg-accent inline-block"></span>
            Bộ Sưu Tập
          </p>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-primary mb-4">
            Căn Hộ Hạng Sang
          </h1>
          <p className="text-slate-500 max-w-2xl text-base md:text-lg font-light leading-relaxed">
            Khám phá trọn bộ sưu tập những không gian sống đẳng cấp nhất, nơi tinh hoa kiến trúc giao thoa cùng tiện ích xứng tầm thượng lưu tại trung tâm các thành phố đáng sống nhất.
          </p>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {displayProperties.map((property) => (
            <div key={property.id} className="animate-[fadeIn_0.5s_ease-out_both]" style={{ animationDelay: `${Math.random() * 0.2}s` }}>
              <PropertyCard {...property} imageAlt={property.title} />
            </div>
          ))}
        </div>
        
        {displayProperties.length === 0 && (
          <div className="py-20 text-center bg-white rounded-md border border-slate-100 shadow-sm mt-8">
            <span className="material-symbols-outlined text-5xl text-slate-200 mb-4 block font-light">domain_disabled</span>
            <p className="text-slate-500 font-serif text-lg italic">
              Đang cập nhật thêm các siêu phẩm căn hộ mới.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
