import PropertyListingPage from "@/components/PropertyListingPage";

export const metadata = {
  title: "Đất Nền Quảng Nam | Pham Land",
  description: "Dự án đất nền, biệt thự ven sông tại Quảng Nam — Hội An, Điện Bàn và các vùng lân cận.",
};

export default function QuangNamPage() {
  return (
    <PropertyListingPage
      region="quang-nam"
      title="Đất Nền Quảng Nam"
      subtitle="Hội An, Điện Bàn và các dự án ven sông Cổ Cò."
    />
  );
}
