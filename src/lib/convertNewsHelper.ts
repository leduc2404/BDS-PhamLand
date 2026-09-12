import { db } from "@/lib/firebase";
import { collection, getDocs, doc, setDoc, Timestamp } from "firebase/firestore";

export interface ParsedPropertyData {
  id: string;
  title: string;
  slug: string;
  description: string;
  location: string;
  area: number;
  price: number;
  priceDisplay: string;
  propertyType: string;
  thumbnailUrl: string;
  images: string[];
  isHot: boolean;
  createdAt: Timestamp;
}

export function extractArea(text: string): number {
  const match = text.match(/([0-9]+[.,]?[0-9]*)\s*m[²2]/i);
  if (match) {
    return parseFloat(match[1].replace(",", "."));
  }
  return 100;
}

export function extractPrice(title: string, content: string): { price: number; priceDisplay: string } {
  const combined = `${title} ${content}`;
  const priceRegex = /([0-9]+(?:[.,][0-9xX]+)?)\s*t[ỷy]/i;
  const match = combined.match(priceRegex);

  if (match) {
    const rawVal = match[1];
    const display = `${rawVal} Tỷ`;
    if (rawVal.toLowerCase().includes("x")) {
      const base = parseFloat(rawVal.replace(/x/gi, "5").replace(",", "."));
      return {
        priceDisplay: display,
        price: Math.round(base * 1_000_000_000),
      };
    } else {
      const num = parseFloat(rawVal.replace(",", "."));
      return {
        priceDisplay: display,
        price: Math.round(num * 1_000_000_000),
      };
    }
  }

  return { priceDisplay: "Thỏa thuận", price: 0 };
}

export function extractLocation(title: string, content: string): string {
  const text = `${title} ${content}`.toLowerCase();
  if (text.includes("quảng bình") || text.includes("đồng hới") || text.includes("bảo ninh")) {
    if (text.includes("bảo ninh")) return "Bảo Ninh, Đồng Hới, Quảng Bình";
    if (text.includes("đồng hới")) return "Đồng Hới, Quảng Bình";
    return "Quảng Bình";
  }
  if (text.includes("đà nẵng") || text.includes("hải châu") || text.includes("liên chiểu") || text.includes("hoà cường")) {
    if (text.includes("hải châu")) return "Hải Châu, Đà Nẵng";
    if (text.includes("liên chiểu")) return "Liên Chiểu, Đà Nẵng";
    return "Đà Nẵng";
  }
  if (text.includes("quảng nam") || text.includes("tam kỳ") || text.includes("hội an") || text.includes("điện ngọc")) {
    if (text.includes("tam kỳ")) return "Tam Kỳ, Quảng Nam";
    if (text.includes("hội an")) return "Hội An, Quảng Nam";
    return "Quảng Nam";
  }
  return "Miền Trung";
}

export function extractPropertyType(title: string, content: string): string {
  const text = `${title} ${content}`.toLowerCase();
  if (text.includes("khách sạn") || text.includes("hotel")) return "commercial";
  if (
    text.includes("căn 4 tầng") ||
    text.includes("căn 3 tầng") ||
    text.includes("căn 2 tầng") ||
    text.includes("nhà 3 tầng") ||
    text.includes("nhà 2 tầng") ||
    text.includes("căn nhà")
  )
    return "house";
  if (text.includes("biệt thự") || text.includes("lô bt") || text.includes("cặp lô bt")) return "villa";
  if (text.includes("căn hộ") || text.includes("chung cư")) return "apartment";
  if (text.includes("shophouse")) return "shophouse";
  return "land";
}

export function extractImages(content: string, thumb: string): string[] {
  const images: string[] = [];
  if (thumb) images.push(thumb);

  const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi;
  let m;
  while ((m = imgRegex.exec(content)) !== null) {
    if (m[1] && !images.includes(m[1])) {
      images.push(m[1]);
    }
  }

  const urlRegex = /(https?:\/\/[^\s"'<>]+\.(?:jpg|jpeg|png|webp))/gi;
  while ((m = urlRegex.exec(content)) !== null) {
    if (m[1] && !images.includes(m[1])) {
      images.push(m[1]);
    }
  }

  return images;
}

export async function convertAllNewsToProperties(): Promise<{ count: number; items: ParsedPropertyData[] }> {
  const snapshot = await getDocs(collection(db, "news"));
  const convertedItems: ParsedPropertyData[] = [];

  for (const docSnap of snapshot.docs) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = docSnap.data();
    const docId = docSnap.id;
    const title = data.title || "";
    const content = data.content || "";
    const slug = data.slug || docId;
    const thumb = data.thumbnailUrl || data.imageUrl || "";

    const isListing =
      title.toLowerCase().includes("bán") ||
      title.toLowerCase().includes("lô") ||
      title.toLowerCase().includes("đất") ||
      title.toLowerCase().includes("nhà") ||
      title.toLowerCase().includes("kđt") ||
      title.toLowerCase().includes("biệt thự") ||
      title.toLowerCase().includes("khách sạn");

    if (!isListing) continue;

    const area = extractArea(`${title} ${content}`);
    const { price, priceDisplay } = extractPrice(title, content);
    const location = extractLocation(title, content);
    const propertyType = extractPropertyType(title, content);
    const images = extractImages(content, thumb);

    const payload: ParsedPropertyData = {
      id: docId,
      title,
      slug,
      description: content || data.summary || data.excerpt || "",
      location,
      area,
      price,
      priceDisplay,
      propertyType,
      thumbnailUrl: thumb || (images.length > 0 ? images[0] : ""),
      images: images.length > 0 ? images : [thumb],
      isHot: true,
      createdAt: data.createdAt || Timestamp.now(),
    };

    await setDoc(doc(db, "properties", docId), payload, { merge: true });
    convertedItems.push(payload);
  }

  return { count: convertedItems.length, items: convertedItems };
}
