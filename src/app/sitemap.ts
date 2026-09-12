import type { MetadataRoute } from "next";
import { newsData } from "@/data/news";
import { propertiesData } from "@/data/properties";
import { apartmentsData } from "@/data/apartments";
import { getArticles, getProperties } from "@/lib/firestore";

// Tự động revalidate sitemap mỗi 1 giờ để cập nhật bài viết & dự án mới nhất
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.bdsphamland.com";
  const seenUrls = new Set<string>();
  const sitemapList: MetadataRoute.Sitemap = [];

  const addUrl = (
    url: string,
    priority: number = 0.7,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "weekly",
    lastModified: Date = new Date()
  ) => {
    if (!seenUrls.has(url)) {
      seenUrls.add(url);
      sitemapList.push({
        url,
        lastModified,
        changeFrequency,
        priority,
      });
    }
  };

  // 1. Các trang tĩnh quan trọng
  addUrl(baseUrl, 1.0, "daily");
  addUrl(`${baseUrl}/du-an`, 0.9, "daily");
  addUrl(`${baseUrl}/du-an/da-nang`, 0.85, "daily");
  addUrl(`${baseUrl}/du-an/quang-nam`, 0.85, "daily");
  addUrl(`${baseUrl}/du-an/quang-binh`, 0.85, "daily");
  addUrl(`${baseUrl}/can-ho`, 0.9, "daily");
  addUrl(`${baseUrl}/ky-gui`, 0.8, "weekly");
  addUrl(`${baseUrl}/tin-tuc`, 0.85, "daily");
  addUrl(`${baseUrl}/tin-tuc/tat-ca`, 0.75, "daily");
  addUrl(`${baseUrl}/cam-nang-dau-tu`, 0.75, "weekly");
  addUrl(`${baseUrl}/lien-he`, 0.6, "monthly");
  addUrl(`${baseUrl}/chinh-sach-bao-mat`, 0.3, "yearly");

  // 2. Tự động tạo sitemap cho từng Tin Tức (Static + Firestore)
  // 2.1 Từ file tin tức tĩnh
  newsData.forEach((article) => {
    addUrl(`${baseUrl}/tin-tuc/${article.id}`, 0.75, "weekly");
  });

  // 2.2 Từ cơ sở dữ liệu Firestore
  try {
    const firestoreArticles = await getArticles(100);
    firestoreArticles.forEach((article) => {
      if (article.isPublished !== false) {
        const slug = article.slug || article.id;
        const modifiedDate = article.createdAt?.toDate ? article.createdAt.toDate() : new Date();
        addUrl(`${baseUrl}/tin-tuc/${slug}`, 0.8, "weekly", modifiedDate);
      }
    });
  } catch (error) {
    console.error("Lỗi khi tải bài viết Firestore cho sitemap:", error);
  }

  // 3. Tự động tạo sitemap cho từng Dự Án & Bất Động Sản (Static + Firestore)
  // 3.1 Từ dữ liệu tĩnh nếu có
  propertiesData.forEach((property) => {
    addUrl(`${baseUrl}/du-an/${property.id}`, 0.8, "weekly");
  });
  apartmentsData.forEach((apt) => {
    addUrl(`${baseUrl}/can-ho/${apt.id}`, 0.8, "weekly");
  });

  // 3.2 Từ cơ sở dữ liệu Firestore
  try {
    const firestoreProperties = await getProperties(100);
    firestoreProperties.forEach((property) => {
      const isApartment =
        property.propertyType?.toLowerCase().includes("căn hộ") ||
        property.propertyType?.toLowerCase().includes("apartment");
      const pathPrefix = isApartment ? "can-ho" : "du-an";
      const slugOrId = property.slug || property.id;
      const modifiedDate = property.createdAt?.toDate ? property.createdAt.toDate() : new Date();

      // Thêm đường dẫn chính
      addUrl(`${baseUrl}/${pathPrefix}/${slugOrId}`, 0.85, "daily", modifiedDate);

      // Nếu slug khác id, thêm cả id dự phòng
      if (property.slug && property.slug !== property.id) {
        addUrl(`${baseUrl}/${pathPrefix}/${property.id}`, 0.75, "weekly", modifiedDate);
      }
    });
  } catch (error) {
    console.error("Lỗi khi tải dự án Firestore cho sitemap:", error);
  }

  return sitemapList;
}
