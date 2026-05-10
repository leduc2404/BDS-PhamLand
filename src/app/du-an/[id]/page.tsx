import { propertiesData } from "@/data/properties";
import PropertyDetailView from "@/components/PropertyDetailView";

export async function generateStaticParams() {
  // Only non-apartments
  const ids = propertiesData.map((property) => ({
    id: property.id.toString(),
  }));
  return ids;
}

export const dynamicParams = true;

export default async function ProjectDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;

  return <PropertyDetailView id={params.id} />;
}
