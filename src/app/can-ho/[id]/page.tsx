import { Metadata } from "next";
import { apartmentsData, getApartmentById } from "@/data/apartments";
import PropertyDetailView from "@/components/PropertyDetailView";
import { doc, getDoc, collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function generateStaticParams() {
  const ids = apartmentsData.map((apartment) => ({
    id: apartment.id.toString(),
  }));
  return ids;
}

export const dynamicParams = true;

async function getApartmentData(idOrSlug: string) {
  const staticApt = await getApartmentById(idOrSlug);
  if (staticApt) return staticApt;

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
    const apt = await getApartmentData(params.id);

    if (!apt) {
      return {
        title: "Chi tiết căn hộ | Pham Land",
        description: "Xem thông tin chi tiết căn hộ cao cấp phân phối bởi Pham Land.",
      };
    }

    const title = `${apt.title} | Pham Land`;
    const description =
      apt.description?.toString().replace(/<[^>]*>/g, "").slice(0, 160) ||
      `Thông tin chi tiết căn hộ ${apt.title} tại ${apt.location || "Miền Trung"}. Giá: ${apt.priceDisplay || "Thỏa thuận"}`;
    const image = apt.thumbnailUrl || apt.image || "https://www.bdsphamland.com/og-image.jpg";

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `https://www.bdsphamland.com/can-ho/${params.id}`,
        images: [{ url: image, alt: apt.title }],
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
      title: "Chi tiết căn hộ | Pham Land",
      description: "Xem thông tin chi tiết căn hộ cao cấp phân phối bởi Pham Land.",
    };
  }
}

export default async function ApartmentDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  return <PropertyDetailView id={params.id} />;
}
