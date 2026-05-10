import { propertiesData } from "@/data/properties";
import { apartmentsData } from "@/data/apartments";
import PropertyDetailView from "@/components/PropertyDetailView";

export async function generateStaticParams() {
  const allIds = [...propertiesData, ...apartmentsData].map((property) => ({
    id: property.id.toString(),
  }));
  return allIds;
}

export const dynamicParams = true;

export default async function PropertyDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;

  return <PropertyDetailView id={params.id} />;
}
