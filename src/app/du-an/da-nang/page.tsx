import PropertyListingPage from "@/components/PropertyListingPage";

export const metadata = {
  title: "Đất Nền Đà Nẵng | Pham Land",
  description: "Dự án đất nền, căn hộ, biệt thự tại Đà Nẵng — vị trí vàng, pháp lý minh bạch.",
};

export default function DaNangPage() {
  return (
    <PropertyListingPage
      region="da-nang"
      title="Đất Nền Đà Nẵng"
      subtitle="Tuyển chọn các dự án tiềm năng nhất tại thành phố đáng sống."
    />
  );
}
