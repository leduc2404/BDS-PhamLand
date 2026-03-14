import PropertyListingPage from "@/components/PropertyListingPage";

export const metadata = {
  title: "Tất Cả Dự Án | Pham Land",
  description: "Tổng hợp toàn bộ dự án đất nền, căn hộ, biệt thự tại Đà Nẵng, Quảng Nam, Quảng Bình.",
};

export default function AllProjectsPage() {
  return (
    <PropertyListingPage
      title="Tất Cả Dự Án"
      subtitle="Tổng hợp toàn bộ bất động sản đang giao dịch tại khu vực miền Trung."
    />
  );
}
