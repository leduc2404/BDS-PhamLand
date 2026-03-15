import HeroSection from "@/components/HeroSection";
import dynamic from "next/dynamic";

const InvestmentHotspots = dynamic(() => import("@/components/InvestmentHotspots"));
const WhyChooseUs = dynamic(() => import("@/components/WhyChooseUs"));
const ApartmentCarousel = dynamic(() => import("@/components/ApartmentCarousel"));
const LeadCaptureForm = dynamic(() => import("@/components/LeadCaptureForm"));

export default function Home() {
  const jsonLdItemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Đất nền tiềm năng Miền Trung",
    description: "Danh sách các lô đất nền tiềm năng tại Đà Nẵng, Quảng Nam, Quảng Bình",
    numberOfItems: 3,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "RealEstateListing",
          name: "Đất nền ven biển Mỹ Khê - Võ Nguyên Giáp",
          description: "Lô đất 105m² ven biển Mỹ Khê, hướng Đông Nam, sổ hồng riêng, xây tự do",
          url: "https://phamland.vn",
          offers: {
            "@type": "Offer",
            price: "4800000000",
            priceCurrency: "VND",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "RealEstateListing",
          name: "Khu đô thị Sun River City - GĐ 2",
          description: "Lô đất 120m² tại Điện Ngọc, hạ tầng 100% hoàn thiện",
          url: "https://phamland.vn",
          offers: {
            "@type": "Offer",
            price: "1250000000",
            priceCurrency: "VND",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "RealEstateListing",
          name: "Biệt thự ven sông Hội An Riverside",
          description: "Biệt thự 250m² ven sông Cổ Cò tại Cẩm Hà, Hội An",
          url: "https://phamland.vn",
          offers: {
            "@type": "Offer",
            price: "12500000000",
            priceCurrency: "VND",
          },
        },
      },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdItemList) }}
      />
      <HeroSection />
      <InvestmentHotspots />
      <WhyChooseUs />
      <ApartmentCarousel />
      <LeadCaptureForm />
    </main>
  );
}
