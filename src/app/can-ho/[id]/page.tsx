import { apartmentsData } from "@/data/apartments";
import PropertyDetailView from "@/components/PropertyDetailView";

export async function generateStaticParams() {
  // Only apartments
  const ids = apartmentsData.map((apartment) => ({
    id: apartment.id.toString(),
  }));
  return ids;
}

export const dynamicParams = true;

export default async function ApartmentDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;

  return <PropertyDetailView id={params.id} />;
}
