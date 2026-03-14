import PropertyListingPage from "@/components/PropertyListingPage";

export const metadata = {
  title: "Đất Nền Quảng Bình | Pham Land",
  description: "Dự án đất nền ven biển Quảng Bình — Bảo Ninh, Đồng Hới và khối tài sản tiềm năng.",
};

export default function QuangBinhPage() {
  return (
    <PropertyListingPage
      region="quang-binh"
      title="Đất Nền Quảng Bình"
      subtitle="Bảo Ninh, Đồng Hới — đầu tư du lịch biển tiềm năng."
    />
  );
}
