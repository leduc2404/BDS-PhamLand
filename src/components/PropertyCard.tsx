import Image from "next/image";
import Link from "next/link";

export interface PropertyCardProps {
  id: string | number;
  image: string;
  imageAlt: string;
  title: string;
  location: string;
  area: string;
  secondLabel: string;
  secondValue: string;
  price: string;
  badge?: { text: string; color: "accent" | "primary" };
  tags?: string[];
}

export default function PropertyCard({
  id,
  image,
  imageAlt,
  title,
  location,
  area,
  secondLabel,
  secondValue,
  price,
  badge,
  tags,
}: PropertyCardProps) {
  const isApartment = secondValue.toLowerCase() === "căn hộ";
  const href = isApartment ? `/can-ho/${id}` : `/du-an/${id}`;

  return (
    <Link href={href} className="block h-full group cursor-pointer">
      <article className="bg-surface rounded-lg overflow-hidden border border-slate-200/60 shadow-sm hover:shadow-lux-hover transition-all duration-700 flex flex-col h-full transform group-hover:-translate-y-1.5">
        {/* Image Container */}
        <div className="relative h-[280px] overflow-hidden">
          <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        
        {/* Gradient overlay for depth */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Premium Hover Overlay */}
        <div className="absolute inset-0 bg-primary/20 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
          <div className="flex items-center gap-2 px-6 py-3 bg-white text-primary font-medium uppercase tracking-widest text-[11px] rounded-sm shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-[400ms] overflow-hidden">
            <span className="relative z-10 flex items-center gap-2">
              Xem chi tiết
              <span className="material-symbols-outlined text-[14px] font-bold" aria-hidden="true">
                arrow_outward
              </span>
            </span>
          </div>
        </div>

        {/* Badge */}
        {badge && (
          <div
            className={`absolute top-4 left-4 border ${
              badge.color === "accent" 
                ? "border-accent/50 text-accent" 
                : "border-white/50 text-white"
            } bg-primary/80 backdrop-blur-sm text-[9px] font-bold px-3 py-1.5 uppercase tracking-widest rounded-[2px] z-10`}
          >
            {badge.text}
          </div>
        )}
        
        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 z-10 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-primary/70 backdrop-blur-md border border-white/20 text-white text-[9px] font-medium px-2.5 py-1 uppercase tracking-wider rounded-[2px] shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      
      {/* Content Area */}
      <div className="p-6 md:p-8 flex flex-col flex-grow bg-white relative">
        <h3 className="text-xl md:text-2xl font-serif font-medium text-primary mb-3 line-clamp-2 group-hover:text-accent transition-colors">
          {title}
        </h3>
        
        <div className="flex items-center gap-1.5 text-slate-500 text-sm mb-6 font-light">
          <span className="material-symbols-outlined text-sm text-accent" aria-hidden="true">
            location_on
          </span>
          {location}
        </div>
        
        <div className="grid grid-cols-2 gap-4 py-5 border-t border-slate-100 mt-auto mb-5">
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-[0.15em]">Diện tích</span>
            <span className="font-medium text-slate-800 text-[15px]">{area}</span>
          </div>
          <div className="flex flex-col gap-1.5 border-l border-slate-100 pl-5">
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-[0.15em]">{secondLabel}</span>
            <span className="font-medium text-slate-800 text-[15px]">{secondValue}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <div className="text-accent text-3xl font-serif font-medium tracking-tight">
            {price}
          </div>
          
          {/* Animated arrow circle */}
          <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-500">
            <span className="material-symbols-outlined text-base text-slate-400 group-hover:text-white transition-colors" aria-hidden="true">
              arrow_outward
            </span>
          </div>
        </div>
        </div>
      </article>
    </Link>
  );
}
