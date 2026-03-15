import { Metadata } from "next";
import PropertyCard from "@/components/PropertyCard";
import { apartmentsData } from "@/data/apartments";

export const metadata: Metadata = {
  title: "Căn Hộ Hạng Sang | Pham Land - Tinh Hoa Bất Động Sản",
  description: "Bộ sưu tập các căn hộ hạng sang, shophouse đẳng cấp tại Đà Nẵng, Hội An, miền Trung được phân phối bởi Pham Land.",
};

export default function CanHoPage() {
  const displayProperties = apartmentsData;

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
