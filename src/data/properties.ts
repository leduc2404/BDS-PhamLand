import { PropertyCardProps } from "@/components/PropertyCard";

export interface PropertyDetails extends PropertyCardProps {
  region: string;
  description: React.ReactNode;
  gallery: string[];
  features: { icon: string; text: string }[];
  overview: { label: string; value: string }[];
}

// Ensure the ID is a string or number as required by PropertyCardProps
export const propertiesData: PropertyDetails[] = [
  {
    id: "dat-nen-my-khe-1",
    region: "da-nang",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRNPa_7_WJ85J9HgRhbcOlfUB-3hQ5Xs0nn-O54xtO2GXT5DA7wE2w7OxyFsGVu_Esg61iJOMyIQ_VooQgWhHs7eeyWS--fORglOOqwm0XvcLqTuQnI2u83lGCrt8QjmgFmDDDh0g7ruNq5p8mUZ9QWXLGb8gmQxymNb2kjolaIV49k7l55LT6h3L2dDvGLeCuG2i6HgG-uGi_Oki5fPzg7UJ86Vzl97mKCVIKh8UeiX8tswTOZ_PCfDXjBMAwd9iq-dH3LBie2nSe",
    imageAlt: "Đất nền ven biển Mỹ Khê - Võ Nguyên Giáp",
    title: "Đất nền ven biển Mỹ Khê - Võ Nguyên Giáp",
    location: "Ngũ Hành Sơn, Đà Nẵng",
    area: "105 m²",
    secondLabel: "HƯỚNG",
    secondValue: "Đông Nam",
    price: "4.8 Tỷ",
    badge: { text: "Premium", color: "accent" },
    tags: ["Sổ hồng riêng", "Xây tự do"],
    description: "Tọa lạc tại vị trí kim cương liền kề trục đường tỷ đô Võ Nguyên Giáp, lô đất nền Mỹ Khê mang đến cơ hội sở hữu bất động sản ven biển hiếm hoi còn sót lại. Nơi đây không chỉ là mảnh đất vàng để phát triển các loại hình dịch vụ lưu trú cao cấp như boutique hotel, homestay mà còn là tài sản tích lũy truyền đời với giá trị gia tăng bền vững theo thời gian.",
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBRNPa_7_WJ85J9HgRhbcOlfUB-3hQ5Xs0nn-O54xtO2GXT5DA7wE2w7OxyFsGVu_Esg61iJOMyIQ_VooQgWhHs7eeyWS--fORglOOqwm0XvcLqTuQnI2u83lGCrt8QjmgFmDDDh0g7ruNq5p8mUZ9QWXLGb8gmQxymNb2kjolaIV49k7l55LT6h3L2dDvGLeCuG2i6HgG-uGi_Oki5fPzg7UJ86Vzl97mKCVIKh8UeiX8tswTOZ_PCfDXjBMAwd9iq-dH3LBie2nSe",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBRNPa_7_WJ85J9HgRhbcOlfUB-3hQ5Xs0nn-O54xtO2GXT5DA7wE2w7OxyFsGVu_Esg61iJOMyIQ_VooQgWhHs7eeyWS--fORglOOqwm0XvcLqTuQnI2u83lGCrt8QjmgFmDDDh0g7ruNq5p8mUZ9QWXLGb8gmQxymNb2kjolaIV49k7l55LT6h3L2dDvGLeCuG2i6HgG-uGi_Oki5fPzg7UJ86Vzl97mKCVIKh8UeiX8tswTOZ_PCfDXjBMAwd9iq-dH3LBie2nSe",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBRNPa_7_WJ85J9HgRhbcOlfUB-3hQ5Xs0nn-O54xtO2GXT5DA7wE2w7OxyFsGVu_Esg61iJOMyIQ_VooQgWhHs7eeyWS--fORglOOqwm0XvcLqTuQnI2u83lGCrt8QjmgFmDDDh0g7ruNq5p8mUZ9QWXLGb8gmQxymNb2kjolaIV49k7l55LT6h3L2dDvGLeCuG2i6HgG-uGi_Oki5fPzg7UJ86Vzl97mKCVIKh8UeiX8tswTOZ_PCfDXjBMAwd9iq-dH3LBie2nSe",
    ],
    features: [
      { icon: "beach_access", text: "Cách bãi biển Mỹ Khê 200m" },
      { icon: "verified", text: "Sổ đỏ sở hữu lâu dài" },
      { icon: "directions_car", text: "Mặt tiền đường nhựa 7.5m" },
      { icon: "domain", text: "Được phép xây dựng cao tầng" },
    ],
    overview: [
      { label: "Mã sản phẩm", value: "MK-082" },
      { label: "Pháp lý", value: "Sổ hồng trao tay" },
      { label: "Lộ giới", value: "Đường 7.5m, Lề 3m" },
      { label: "Quy chuẩn XD", value: "Tối đa 7 tầng" },
    ]
  },
  {
    id: "khu-do-thi-sun-river-city-2",
    region: "quang-nam",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRNPa_7_WJ85J9HgRhbcOlfUB-3hQ5Xs0nn-O54xtO2GXT5DA7wE2w7OxyFsGVu_Esg61iJOMyIQ_VooQgWhHs7eeyWS--fORglOOqwm0XvcLqTuQnI2u83lGCrt8QjmgFmDDDh0g7ruNq5p8mUZ9QWXLGb8gmQxymNb2kjolaIV49k7l55LT6h3L2dDvGLeCuG2i6HgG-uGi_Oki5fPzg7UJ86Vzl97mKCVIKh8UeiX8tswTOZ_PCfDXjBMAwd9iq-dH3LBie2nSe",
    imageAlt: "Khu đô thị sinh thái Sun River City",
    title: "Khu đô thị sinh thái Sun River City",
    location: "Điện Bàn, Quảng Nam",
    area: "120 m²",
    secondLabel: "MẶT TIỀN",
    secondValue: "7.5m",
    price: "1.25 Tỷ",
    badge: { text: "Phân khu VIP", color: "primary" },
    tags: ["Hạ tầng 100%", "Ven sông Cổ Cò"],
    description: "Sở hữu vị trí kề giang cận hải, Sun River City là kiệt tác khu đô thị ven sông Cổ Cò được dòng chảy tài lộc bao quanh. Với quy hoạch đồng bộ, điện âm toàn khu và dải công viên ven sông trải dài, dự án hứa hẹn mang đến chuẩn mực sống sinh thái đẳng cấp bậc nhất khu vực Nam Đà Nẵng - Bắc Hội An.",
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBRNPa_7_WJ85J9HgRhbcOlfUB-3hQ5Xs0nn-O54xtO2GXT5DA7wE2w7OxyFsGVu_Esg61iJOMyIQ_VooQgWhHs7eeyWS--fORglOOqwm0XvcLqTuQnI2u83lGCrt8QjmgFmDDDh0g7ruNq5p8mUZ9QWXLGb8gmQxymNb2kjolaIV49k7l55LT6h3L2dDvGLeCuG2i6HgG-uGi_Oki5fPzg7UJ86Vzl97mKCVIKh8UeiX8tswTOZ_PCfDXjBMAwd9iq-dH3LBie2nSe",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBRNPa_7_WJ85J9HgRhbcOlfUB-3hQ5Xs0nn-O54xtO2GXT5DA7wE2w7OxyFsGVu_Esg61iJOMyIQ_VooQgWhHs7eeyWS--fORglOOqwm0XvcLqTuQnI2u83lGCrt8QjmgFmDDDh0g7ruNq5p8mUZ9QWXLGb8gmQxymNb2kjolaIV49k7l55LT6h3L2dDvGLeCuG2i6HgG-uGi_Oki5fPzg7UJ86Vzl97mKCVIKh8UeiX8tswTOZ_PCfDXjBMAwd9iq-dH3LBie2nSe",
    ],
    features: [
      { icon: "water", text: "Quy hoạch công viên ven sông" },
      { icon: "local_hospital", text: "Trạm y tế nội khu" },
      { icon: "shopping_basket", text: "Trung tâm thương mại" },
      { icon: "security", text: "An ninh khép kín 24/7" },
    ],
    overview: [
      { label: "Quy mô", value: "45 Hecta" },
      { label: "Loại hình", value: "Đất nền liền kề, Biệt thự" },
      { label: "Bàn giao", value: "Nền đất, hạ tầng hoàn thiện" },
      { label: "Phân khu", value: "Diamond Riverside" },
    ]
  },
  {
    id: "biet-thu-riverside-hoian-3",
    region: "quang-nam",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRNPa_7_WJ85J9HgRhbcOlfUB-3hQ5Xs0nn-O54xtO2GXT5DA7wE2w7OxyFsGVu_Esg61iJOMyIQ_VooQgWhHs7eeyWS--fORglOOqwm0XvcLqTuQnI2u83lGCrt8QjmgFmDDDh0g7ruNq5p8mUZ9QWXLGb8gmQxymNb2kjolaIV49k7l55LT6h3L2dDvGLeCuG2i6HgG-uGi_Oki5fPzg7UJ86Vzl97mKCVIKh8UeiX8tswTOZ_PCfDXjBMAwd9iq-dH3LBie2nSe",
    imageAlt: "Biệt thự Riverside Thủy Tú Hội An",
    title: "Biệt thự Riverside Thủy Tú Hội An",
    location: "TP. Hội An, Quảng Nam",
    area: "350 m²",
    secondLabel: "MẶT TIỀN",
    secondValue: "15m",
    price: "12.5 Tỷ",
    badge: { text: "Limited", color: "accent" },
    tags: ["Bến du thuyền", "An ninh 24/7"],
    description: "Khẳng định đẳng cấp sống thượng lưu với những căn biệt thự Riverside phiên bản giới hạn tại Thủy Tú Hội An. Mỗi căn biệt thự đều sở hữu bến du thuyền riêng trước nhà, mang đậm kiến trúc Đông Dương hoài cổ nhưng vẫn ngập tràn hơi thở đương đại.",
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBRNPa_7_WJ85J9HgRhbcOlfUB-3hQ5Xs0nn-O54xtO2GXT5DA7wE2w7OxyFsGVu_Esg61iJOMyIQ_VooQgWhHs7eeyWS--fORglOOqwm0XvcLqTuQnI2u83lGCrt8QjmgFmDDDh0g7ruNq5p8mUZ9QWXLGb8gmQxymNb2kjolaIV49k7l55LT6h3L2dDvGLeCuG2i6HgG-uGi_Oki5fPzg7UJ86Vzl97mKCVIKh8UeiX8tswTOZ_PCfDXjBMAwd9iq-dH3LBie2nSe",
    ],
    features: [
      { icon: "sailing", text: "Bến du thuyền tư gia" },
      { icon: "pool", text: "Hồ bơi riêng biệt" },
      { icon: "restaurant", text: "Clubhouse 5 sao" },
    ],
    overview: [
      { label: "Mã sản phẩm", value: "VIL-LIMITED" },
      { label: "Thiết kế", value: "Indochine" },
      { label: "Bàn giao", value: "Hoàn thiện mặt ngoài" },
    ]
  },
  {
    id: "bao-ninh-resort-quang-binh-4",
    region: "quang-binh",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRNPa_7_WJ85J9HgRhbcOlfUB-3hQ5Xs0nn-O54xtO2GXT5DA7wE2w7OxyFsGVu_Esg61iJOMyIQ_VooQgWhHs7eeyWS--fORglOOqwm0XvcLqTuQnI2u83lGCrt8QjmgFmDDDh0g7ruNq5p8mUZ9QWXLGb8gmQxymNb2kjolaIV49k7l55LT6h3L2dDvGLeCuG2i6HgG-uGi_Oki5fPzg7UJ86Vzl97mKCVIKh8UeiX8tswTOZ_PCfDXjBMAwd9iq-dH3LBie2nSe",
    imageAlt: "Đất nền trung tâm Bảo Ninh Resort",
    title: "Đất nền trung tâm Bảo Ninh Resort",
    location: "Bán đảo Bảo Ninh, Đồng Hới",
    area: "160 m²",
    secondLabel: "LỘ GIỚI",
    secondValue: "20m",
    price: "3.2 Tỷ",
    tags: ["Ven biển", "Kề sân Golf"],
    description: "Nằm kề cận quần thể resort và sân golf đẳng cấp quốc tế trên dải cát trắng Bảo Ninh. Đây là quỹ đất sinh lời phi mã trong tương lai khi du lịch Quảng Bình đang cất cánh mạnh mẽ.",
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBRNPa_7_WJ85J9HgRhbcOlfUB-3hQ5Xs0nn-O54xtO2GXT5DA7wE2w7OxyFsGVu_Esg61iJOMyIQ_VooQgWhHs7eeyWS--fORglOOqwm0XvcLqTuQnI2u83lGCrt8QjmgFmDDDh0g7ruNq5p8mUZ9QWXLGb8gmQxymNb2kjolaIV49k7l55LT6h3L2dDvGLeCuG2i6HgG-uGi_Oki5fPzg7UJ86Vzl97mKCVIKh8UeiX8tswTOZ_PCfDXjBMAwd9iq-dH3LBie2nSe",
    ],
    features: [
      { icon: "golf_course", text: "Gần sân Golf quốc tế" },
      { icon: "flight", text: "Cách sân bay Đồng Hới 15p" },
    ],
    overview: [
      { label: "Pháp lý", value: "Sổ đỏ 100%" },
      { label: "Hiện trạng", value: "Đã có sổ" },
    ]
  },
  {
    id: "fpt-city-da-nang-5",
    region: "da-nang",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRNPa_7_WJ85J9HgRhbcOlfUB-3hQ5Xs0nn-O54xtO2GXT5DA7wE2w7OxyFsGVu_Esg61iJOMyIQ_VooQgWhHs7eeyWS--fORglOOqwm0XvcLqTuQnI2u83lGCrt8QjmgFmDDDh0g7ruNq5p8mUZ9QWXLGb8gmQxymNb2kjolaIV49k7l55LT6h3L2dDvGLeCuG2i6HgG-uGi_Oki5fPzg7UJ86Vzl97mKCVIKh8UeiX8tswTOZ_PCfDXjBMAwd9iq-dH3LBie2nSe",
    imageAlt: "Khu đô thị FPT City - Nam Đà Nẵng",
    title: "Khu đô thị FPT City - Nam Đà Nẵng",
    location: "Ngũ Hành Sơn, Đà Nẵng",
    area: "90 m²",
    secondLabel: "MẶT TIỀN",
    secondValue: "5m",
    price: "2.5 Tỷ",
    badge: { text: "Hot Deal", color: "accent" },
    tags: ["Gần làng Đại học"],
    description: "Trở thành cư dân của đô thị công nghệ FPT City với hệ thống giáo dục quốc tế từ mầm non đến đại học nội khu. Môi trường tri thức, cộng đồng văn minh và tỷ lệ cây xanh phủ kín mang đến nguồn cảm hứng sống tuyệt vời.",
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBRNPa_7_WJ85J9HgRhbcOlfUB-3hQ5Xs0nn-O54xtO2GXT5DA7wE2w7OxyFsGVu_Esg61iJOMyIQ_VooQgWhHs7eeyWS--fORglOOqwm0XvcLqTuQnI2u83lGCrt8QjmgFmDDDh0g7ruNq5p8mUZ9QWXLGb8gmQxymNb2kjolaIV49k7l55LT6h3L2dDvGLeCuG2i6HgG-uGi_Oki5fPzg7UJ86Vzl97mKCVIKh8UeiX8tswTOZ_PCfDXjBMAwd9iq-dH3LBie2nSe",
    ],
    features: [
      { icon: "school", text: "Trường đua liên cấp FPT" },
      { icon: "work", text: "FPT Complex" },
    ],
    overview: [
      { label: "Trạng thái", value: "Đang giao dịch" },
      { label: "Mật độ XD", value: "40%" },
    ]
  },
  {
    id: "shophouse-hoi-an-6",
    region: "quang-nam",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRNPa_7_WJ85J9HgRhbcOlfUB-3hQ5Xs0nn-O54xtO2GXT5DA7wE2w7OxyFsGVu_Esg61iJOMyIQ_VooQgWhHs7eeyWS--fORglOOqwm0XvcLqTuQnI2u83lGCrt8QjmgFmDDDh0g7ruNq5p8mUZ9QWXLGb8gmQxymNb2kjolaIV49k7l55LT6h3L2dDvGLeCuG2i6HgG-uGi_Oki5fPzg7UJ86Vzl97mKCVIKh8UeiX8tswTOZ_PCfDXjBMAwd9iq-dH3LBie2nSe",
    imageAlt: "Shophouse khối đế phố cổ Hội An",
    title: "Shophouse khối đế phố cổ Hội An",
    location: "Cẩm Phô, Hội An",
    area: "200 m²",
    secondLabel: "PHÁP LÝ",
    secondValue: "Sổ hồng",
    price: "15.0 Tỷ",
    tags: ["Thương mại cao", "2 mặt tiền"],
    description: "Nhà phố thương mại (Shophouse) ngay vùng lõi phố cổ Hội An di sản. Vị trí độc tôn, số lượng khan hiếm, cam kết mang lại dòng doanh thu cho thuê ổn định và thặng dư vốn cực lớn.",
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBRNPa_7_WJ85J9HgRhbcOlfUB-3hQ5Xs0nn-O54xtO2GXT5DA7wE2w7OxyFsGVu_Esg61iJOMyIQ_VooQgWhHs7eeyWS--fORglOOqwm0XvcLqTuQnI2u83lGCrt8QjmgFmDDDh0g7ruNq5p8mUZ9QWXLGb8gmQxymNb2kjolaIV49k7l55LT6h3L2dDvGLeCuG2i6HgG-uGi_Oki5fPzg7UJ86Vzl97mKCVIKh8UeiX8tswTOZ_PCfDXjBMAwd9iq-dH3LBie2nSe",
    ],
    features: [
      { icon: "storefront", text: "Kinh doanh đa ngành nghề" },
      { icon: "festival", text: "Trung tâm du lịch" },
    ],
    overview: [
      { label: "Mặt tiền", value: "2 Mặt tiền" },
      { label: "Thu nhập Lợi nhuận", value: "12%/năm" },
    ]
  },
];

export async function getPropertyById(id: string): Promise<PropertyDetails | undefined> {
  // Simulate an async fetch (backend ready)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(propertiesData.find((p) => p.id.toString() === id));
    }, 100);
  });
}
