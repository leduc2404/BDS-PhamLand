import { getPropertyById as getStaticPropertyById, propertiesData } from "@/data/properties";
import { getApartmentById, apartmentsData } from "@/data/apartments";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { doc, getDoc, collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import PropertyGallery from "@/components/PropertyGallery";
import SidebarContactForm from "@/components/SidebarContactForm";
import DOMPurify from "isomorphic-dompurify";

async function getFirestoreProperty(idOrSlug: string) {
  try {
    const docRef = doc(db, "properties", idOrSlug);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }

    const q = query(
      collection(db, "properties"),
      where("slug", "==", idOrSlug),
      limit(1)
    );
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const docData = snapshot.docs[0];
      return { id: docData.id, ...docData.data() };
    }
  } catch {
    // fall through
  }
  return null;
}

export default async function PropertyDetailView({ id }: { id: string }) {
  let property = await getStaticPropertyById(id);
  if (!property) {
    property = await getApartmentById(id);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let firestoreProperty: any = null;
  if (!property) {
    firestoreProperty = await getFirestoreProperty(id);
  }

  if (!property && !firestoreProperty) {
    notFound();
  }

  if (firestoreProperty) {
    const fp = firestoreProperty;
    return (
      <main className="min-h-screen bg-background-light pt-24">
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <div className="flex items-center justify-between">
            <nav className="flex items-center gap-2 text-[13px] text-slate-400 font-light">
              <Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link>
              <span className="text-slate-300">/</span>
              <Link href="/#dat-nen" className="hover:text-primary transition-colors">Dự án</Link>
              <span className="text-slate-300">/</span>
              <span className="text-primary font-medium truncate max-w-[180px] md:max-w-xs">{fp.title}</span>
            </nav>
            <Link href="/" className="hidden md:flex items-center gap-1.5 text-[13px] font-medium text-slate-500 hover:text-accent transition-colors">
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              Quay lại
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-10">
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {fp.isHot && (
                <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm border border-accent/30 text-accent bg-accent/5">HOT</span>
              )}
              <span className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-sm bg-slate-100 text-slate-500">
                {fp.propertyType === "land" ? "Đất nền" : fp.propertyType === "apartment" ? "Căn hộ" : fp.propertyType === "villa" ? "Biệt thự" : fp.propertyType === "shophouse" ? "Shophouse" : "Nhà phố"}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-primary leading-tight mb-5">{fp.title}</h1>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-slate-200">
              <div className="flex items-center gap-2 text-slate-500 font-light">
                <span className="material-symbols-outlined text-accent text-[20px]">location_on</span>
                {fp.location}
              </div>
              <div className="text-3xl font-serif font-medium text-accent">
                {fp.priceDisplay || `${(fp.price / 1_000_000_000).toFixed(1)} Tỷ`}
              </div>
            </div>
          </header>

          <PropertyGallery 
            thumbnailUrl={fp.thumbnailUrl} 
            images={fp.images || []} 
            title={fp.title} 
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 space-y-10">
              <section className="bg-white rounded-sm p-6 sm:p-8 border border-slate-100">
                <h2 className="text-lg font-serif font-medium text-primary mb-5 flex items-center gap-2">
                  <span className="material-symbols-outlined text-accent text-[20px]">info</span> Thông tin cơ bản
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Diện tích</span>
                    <span className="font-medium text-primary text-lg">{fp.area} m²</span>
                  </div>
                  <div className="flex flex-col gap-1 border-l border-slate-100 pl-4">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Giá</span>
                    <span className="font-medium text-primary text-lg">{fp.priceDisplay || `${(fp.price / 1_000_000_000).toFixed(1)} Tỷ`}</span>
                  </div>
                  <div className="flex flex-col gap-1 border-l border-slate-100 pl-4">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Loại</span>
                    <span className="font-medium text-primary text-lg">{fp.propertyType === "land" ? "Đất nền" : fp.propertyType === "apartment" ? "Căn hộ" : fp.propertyType === "villa" ? "Biệt thự" : fp.propertyType === "shophouse" ? "Shophouse" : "Nhà phố"}</span>
                  </div>
                </div>
              </section>

              {fp.description && (
                <section>
                  <h2 className="text-xl font-serif font-medium text-primary mb-4">Tổng Quan</h2>
                  <div className="w-8 h-[2px] bg-accent mb-6"></div>
                  <div className="text-slate-600 font-light leading-relaxed space-y-4">
                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(fp.description.replace(/\n/g, '<br/>')) }} />
                  </div>
                </section>
              )}
            </div>

            <aside className="lg:col-span-4">
              <div className="sticky top-28 bg-[#0a1128] rounded-sm p-6 sm:p-8 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] ring-1 ring-white/10">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
                <div className="relative z-10 text-center mb-8 pb-8 border-b border-white/10">
                  <p className="text-[10px] uppercase tracking-widest text-accent font-bold mb-3 flex items-center justify-center gap-2">
                    <span className="w-4 h-[1px] bg-accent/50"></span> Giá tham khảo <span className="w-4 h-[1px] bg-accent/50"></span>
                  </p>
                  <div className="text-3xl lg:text-4xl font-serif font-bold text-white mb-3 tracking-tight">{fp.priceDisplay || `${(fp.price / 1_000_000_000).toFixed(1)} Tỷ`}</div>
                  <p className="text-[11px] font-medium text-emerald-400/90 flex items-center justify-center gap-1.5 uppercase tracking-wider">
                    <span className="material-symbols-outlined text-[14px]">verified_user</span> Pháp lý minh bạch 100%
                  </p>
                </div>
                <div className="relative z-10">
                  <h3 className="text-sm font-serif font-medium text-white mb-6 text-center">Đăng ký nhận quỹ căn độc quyền</h3>
                  <SidebarContactForm propertyTitle={fp.title} propertyPrice={fp.priceDisplay || `${(fp.price / 1_000_000_000).toFixed(1)} Tỷ`} propertyUrl={`https://phamland.vn/du-an/${fp.slug || fp.id}`} />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    );
  }

  const p = property!;

  return (
    <main className="min-h-screen bg-background-light pt-24">
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <div className="flex items-center justify-between">
          <nav className="flex items-center gap-2 text-[13px] text-slate-400 font-light">
            <Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link>
            <span className="text-slate-300">/</span>
            <Link href="/#dat-nen" className="hover:text-primary transition-colors">Dự án</Link>
            <span className="text-slate-300">/</span>
            <span className="text-primary font-medium truncate max-w-[180px] md:max-w-xs">{p.title}</span>
          </nav>
          <Link href="/" className="hidden md:flex items-center gap-1.5 text-[13px] font-medium text-slate-500 hover:text-accent transition-colors">
            <span className="material-symbols-outlined text-[16px]">arrow_back</span> Quay lại
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {p.badge && (
              <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm border ${p.badge.color === "accent" ? "border-accent/30 text-accent bg-accent/5" : "border-primary/20 text-primary bg-primary/5"}`}>
                {p.badge.text}
              </span>
            )}
            <span className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-sm bg-slate-100 text-slate-500">{p.id}</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-primary leading-tight mb-5">{p.title}</h1>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-slate-200">
            <div className="flex items-center gap-2 text-slate-500 font-light">
              <span className="material-symbols-outlined text-accent text-[20px]">location_on</span> {p.location}
            </div>
            <div className="text-3xl font-serif font-medium text-accent">{p.price}</div>
          </div>
        </header>

        <PropertyGallery 
          thumbnailUrl={p.image} 
          images={p.gallery || []} 
          title={p.title} 
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-10">
            <section className="bg-white rounded-sm p-6 sm:p-8 border border-slate-100">
              <h2 className="text-lg font-serif font-medium text-primary mb-5 flex items-center gap-2">
                <span className="material-symbols-outlined text-accent text-[20px]">info</span> Thông tin cơ bản
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Diện tích</span>
                  <span className="font-medium text-primary text-lg">{p.area}</span>
                </div>
                <div className="flex flex-col gap-1 border-l border-slate-100 pl-4">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">{p.secondLabel}</span>
                  <span className="font-medium text-primary text-lg">{p.secondValue}</span>
                </div>
              </div>
            </section>
            
            {p.overview && p.overview.length > 0 && (
              <section>
                <h2 className="text-xl font-serif font-medium text-primary mb-4">Tổng Quan</h2>
                <div className="w-8 h-[2px] bg-accent mb-6"></div>
                <div className="text-slate-600 font-light leading-relaxed space-y-4">
                  {p.overview.map((item: any, idx: number) => (
                    typeof item === 'string' ? (
                      <p key={idx}>{item}</p>
                    ) : (
                      <p key={idx}><span className="font-medium text-slate-800">{item.label}:</span> {item.value}</p>
                    )
                  ))}
                </div>
              </section>
            )}
            
            {p.description && (
              <section>
                <h2 className="text-xl font-serif font-medium text-primary mb-4">Mô tả chi tiết</h2>
                <div className="w-8 h-[2px] bg-accent mb-6"></div>
                <div className="text-slate-600 font-light leading-relaxed space-y-4">
                  {typeof p.description === "string" ? (
                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(p.description.replace(/\n/g, '<br/>')) }} />
                  ) : (
                    <div>{p.description}</div>
                  )}
                </div>
              </section>
            )}
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-28 bg-[#0a1128] rounded-sm p-6 sm:p-8 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] ring-1 ring-white/10">
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
              <div className="relative z-10 text-center mb-8 pb-8 border-b border-white/10">
                <p className="text-[10px] uppercase tracking-widest text-accent font-bold mb-3 flex items-center justify-center gap-2">
                  <span className="w-4 h-[1px] bg-accent/50"></span> Giá tham khảo <span className="w-4 h-[1px] bg-accent/50"></span>
                </p>
                <div className="text-3xl lg:text-4xl font-serif font-bold text-white mb-3 tracking-tight">{p.price}</div>
                <p className="text-[11px] font-medium text-emerald-400/90 flex items-center justify-center gap-1.5 uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[14px]">verified_user</span> Pháp lý minh bạch 100%
                </p>
              </div>
              <div className="relative z-10">
                <h3 className="text-sm font-serif font-medium text-white mb-6 text-center">Đăng ký nhận quỹ căn độc quyền</h3>
                  <SidebarContactForm propertyTitle={p.title} propertyPrice={p.price} propertyUrl={`https://phamland.vn/du-an/${p.id}`} />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
