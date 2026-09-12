import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCfHcD-u9-FELdAz0zKBFe0P-cjoPeTSis",
  authDomain: "bdsphamland.firebaseapp.com",
  projectId: "bdsphamland",
  storageBucket: "bdsphamland.firebasestorage.app",
  messagingSenderId: "650348714557",
  appId: "1:650348714557:web:6119491efaf84a1a232854",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Helper to extract area (m2)
function extractArea(text) {
  const match = text.match(/([0-9]+[.,]?[0-9]*)\s*m[²2]/i);
  if (match) {
    return parseFloat(match[1].replace(",", "."));
  }
  return 100;
}

// Helper to extract price display & numeric VND
function extractPrice(title, content) {
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

// Helper to extract location
function extractLocation(title, content) {
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

// Helper to extract property type
function extractPropertyType(title, content) {
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

// Extract images
function extractImages(content, thumb) {
  const images = [];
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

async function convertNewsToProperties() {
  const email = process.argv[2];
  const password = process.argv[3];

  if (email && password) {
    console.log(`Đang đăng nhập với tài khoản: ${email}...`);
    await signInWithEmailAndPassword(auth, email, password);
    console.log("Đăng nhập thành công!");
  } else {
    console.log("Chạy ở chế độ không đăng nhập (Lưu ý: Firestore cần cấp quyền ghi nếu không có tài khoản).");
    console.log("Cách chạy có tài khoản: node scripts/convert_news_to_properties.mjs <email> <password>");
  }

  console.log("\n=== BẮT ĐẦU CHUYỂN ĐỔI TIN TỨC SANG DANH MỤC DỰ ÁN ===");
  const snapshot = await getDocs(collection(db, "news"));
  console.log(`Tìm thấy ${snapshot.docs.length} bài viết.`);

  let convertedCount = 0;

  for (const docSnap of snapshot.docs) {
    const data = docSnap.data();
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

    if (!isListing) {
      console.log(`Bỏ qua (tin thị trường): ${title}`);
      continue;
    }

    const area = extractArea(`${title} ${content}`);
    const { price, priceDisplay } = extractPrice(title, content);
    const location = extractLocation(title, content);
    const propertyType = extractPropertyType(title, content);
    const images = extractImages(content, thumb);

    const propertyPayload = {
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
      convertedFromNewsId: docId,
    };

    console.log(`\n-> [Chuyển đổi ${docId}]`);
    console.log(`   Tiêu đề: ${title}`);
    console.log(`   Giá: ${priceDisplay} (${price.toLocaleString()} VND)`);
    console.log(`   Diện tích: ${area} m2`);
    console.log(`   Vị trí: ${location}`);
    console.log(`   Loại BĐS: ${propertyType}`);
    console.log(`   Ảnh: ${images.length} ảnh`);

    await setDoc(doc(db, "properties", docId), propertyPayload, { merge: true });
    convertedCount++;
  }

  console.log(`\n=== HOÀN TẤT: Đã chuyển đổi thành công ${convertedCount} BĐS vào danh mục dự án! ===`);
}

convertNewsToProperties().catch(console.error);
