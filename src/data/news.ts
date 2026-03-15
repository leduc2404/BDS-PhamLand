export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string; // HTML or Markdown for actual body
  imageUrl: string;
  date: string;
  category: "Thị trường" | "Phân tích đầu tư" | "Cẩm nang bất động sản" | "Chính sách pháp lý";
  author: string;
  readTime: number; // in minutes
  featured?: boolean;
}

export const newsData: NewsArticle[] = [
  {
    id: "phan-tich-song-bds-ven-song-2024",
    title: "Giải Mã Sức Hút Bất Động Sản Ven Sông: Cú Hích Trị Giá Hàng Triệu Đô",
    excerpt: "Nguồn cung khan hiếm cùng với nhu cầu sở hữu không gian sống sinh thái, riêng tư đang đẩy giá trị các dự án bất động sản ven sông bước vào một chu kỳ tăng trưởng mới bứt phá tại các đô thị lớn.",
    content: "<p>Nội dung chi tiết bài viết sẽ được bổ sung từ Backend / CMS sau này.</p>",
    imageUrl: "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80/AB6AXuCQ_jDH4IJ2nfsCqr_kIaPODF3tcArPT8wJpmje3I_KbaUZEiaqdzKWAkz8O56pxZI0gzNN77PpV8tFQBlpWB5yFm2F3KviEKvYkw7l3brUEd1FCKLQ1Bo9nbQvZ4W4TTl6u5x0eSRprtkn8P2lqmBvEaR8EpzS-AVQHGp6wivojvsxrJf6GqPE2sfPJH70yC-vkE5b_1zBP1OaNXjrv7s9m0PSmos40K1u62zyfyvS0b5yIuFn5Ck986s55Qa7sKsgFUafBSSRIsfp", // Cinematic luxury view
    date: "14/03/2026",
    category: "Phân tích đầu tư",
    author: "Chuyên gia Pham Land",
    readTime: 5,
    featured: true, // This one will show up huge at the top
  },
  {
    id: "luat-dat-dai-2024-dong-thai-thi-truong",
    title: "Biến Động Của Thị Trường Sau Khi Luật Đất Đai Cập Nhật Chính Thức Có Hiệu Lực",
    excerpt: "Sửa đổi phương pháp định giá đất, siết chặt việc phân lô bán nền: Cơ hội nào mở ra cho các nhà đầu tư sở hữu dòng vốn mạnh với định hướng dài hạn trong bối cảnh thị trường tự thanh lọc?",
    content: "<p>Nội dung chi tiết bài viết sẽ được bổ sung từ Backend / CMS sau này.</p>",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80/AB6AXuDrJd_oQk0V2eID_T48gWvL4S8Gry-OItDttd0E9xS_A5vjB-Hj0Z5fB_PoyGgZ2F6k6GjEDe2j_q8R_yqFmE05xN2bV9mJ70N0hP3L4iZ-O731-M2e0Lg9RkH2k1f4T4tI9Mv-2rJ-2pD3f1zD2eB_jZ-8uE7Dk-xV12-p_1F9sO6pI092N28eZ_N1_9-E65_nZ_mN6y", // Corporate/Legal abstract
    date: "10/03/2026",
    category: "Chính sách pháp lý",
    author: "Luật sư nội bộ",
    readTime: 7,
  },
  {
    id: "ban-tin-thi-truong-da-nang-quy-1",
    title: "Đà Nẵng Quý I/2026: Dòng Vốn Lớn Rục Rịch Đổ Về Cửa Ngõ Du Lịch",
    excerpt: "Khảo sát mới nhất cho thấy sự gia tăng đột biến của các nhà đầu tư phía Bắc rót tiền vào các quỹ đất ven biển tại Đà Nẵng, chuẩn bị cho cú nổ của du lịch siêu sang.",
    content: "<p>Nội dung chi tiết bài viết sẽ được bổ sung từ Backend / CMS sau này.</p>",
    imageUrl: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80/AB6AXuD-1v0N4G8k6z1V7oRzJ4e2Z_kO7wR2D0A-7v93P_-XmS0E8IIfTj9T8yI1y1N4pX9sZkO5f1G0eR5E_f2V1-2qP45fL82E-Y-pD80F1sM-n9v_2-E7I9E7-VqK_bXk3R-h1_rK8pB_A12E_-3oZ-0A-v_L7jF-Xv0V9XvO0Q_z5R-S7kF4s-A47E_-V81A8-L1_Z9m-E10p", // Resort/Hotel view
    date: "28/02/2026",
    category: "Thị trường",
    author: "Phòng Nghiên Cứu",
    readTime: 4,
  },
  {
    id: "nghe-thuat-lua-chon-shophouse-ha-tang",
    title: "Tiêu Chí Lõi Khi Lựa Chọn Shophouse Khối Đế Để Đạt Lợi Nhuận Cho Thuê Cao",
    excerpt: "Tối ưu dòng tiền với Shophouse không chỉ nằm ở vị trí. 5 yếu tố quan trọng quyết định tỷ suất sinh lời mà hầu hết nhà đầu tư sơ cấp thường xuyên bỏ sót.",
    content: "<p>Nội dung chi tiết bài viết sẽ được bổ sung từ Backend / CMS sau này.</p>",
    imageUrl: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80/AB6AXuD9Zq-bQfX9tS8rC3rM-fG7kH6wO8jI9F9qF-5D5jU4-sF1uH7iT-zT4i_oK0vWzP02iO3E62I62-H-7L8n1zD9eX0cQ2I6-F6_X72xH_0A2kM_D1tZ8eQfL_-V8-rZ90lV58yJ0rZ7wA1jE2-N1E1pI0A4-R_-8B7-E8V9rX4-eB72sR-_20cQvG-qT0R7wZ_F2-vN03-K-k6N",// Commercial center vibe
    date: "15/02/2026",
    category: "Cẩm nang bất động sản",
    author: "Chuyên gia Môi giới",
    readTime: 6,
  },
];

// Helper functions for components to use (mocks what an API would do)
export const getAllNews = () => newsData.sort((a, b) => {
  // Rough sort by date string (DD/MM/YYYY) for demo purposes
  const [dayA, monthA, yearA] = a.date.split('/');
  const [dayB, monthB, yearB] = b.date.split('/');
  return new Date(`${yearB}-${monthB}-${dayB}`).getTime() - new Date(`${yearA}-${monthA}-${dayA}`).getTime();
});

export const getFeaturedArticle = () => newsData.find(article => article.featured);

export const getOtherArticles = () => newsData.filter(article => !article.featured);

export const getArticleById = (id: string) => newsData.find((article) => article.id === id);
