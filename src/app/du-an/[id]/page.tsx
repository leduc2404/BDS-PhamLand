import { Metadata } from "next";
import { propertiesData, getPropertyById } from "@/data/properties";
import PropertyDetailView from "@/components/PropertyDetailView";
import { doc, getDoc, collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function generateStaticParams() {
  const ids = propertiesData.map((property) => ({
    id: property.id.toString(),
  }));
  return ids;
}

export const dynamicParams = true;

async function getPropertyData(idOrSlug: string) {
  const staticProp = await getPropertyById(idOrSlug);
  if (staticProp) return staticProp;

  try {
    const docRef = doc(db, "properties", idOrSlug);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as any;
    }

    const q = query(
      collection(db, "properties"),
      where("slug", "==", idOrSlug),
      limit(1)
    );
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const docData = snapshot.docs[0];
      return { id: docData.id, ...docData.data() } as any;
    }
  } catch {
    // ignore
  }
  return null;
}

export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  try {
    const params = await props.params;
    const property = await getPropertyData(params.id);

    if (!property) {
      return {
        title: "Chi tiết bất động sản | Pham Land",
        description: "Xem thông tin chi tiết dự án bất động sản phân phối bởi Pham Land.",
      };
    }

    const title = `${property.title} | Pham Land`;
    const description =
      property.description?.toString().replace(/<[^>]*>/g, "").slice(0, 160) ||
      `Thông tin chi tiết ${property.title} tại ${property.location || "Miền Trung"}. Giá: ${property.priceDisplay || "Thỏa thuận"}`;
    const image = property.thumbnailUrl || property.image || "https://www.bdsphamland.com/og-image.jpg";

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `https://www.bdsphamland.com/du-an/${params.id}`,
        images: [{ url: image, alt: property.title }],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [image],
      },
    };
  } catch {
    return {
      title: "Chi tiết bất động sản | Pham Land",
      description: "Xem thông tin chi tiết dự án bất động sản phân phối bởi Pham Land.",
    };
  }
}

export default async function ProjectDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  return <PropertyDetailView id={params.id} />;
}
