import { PropertyCardProps } from "@/components/PropertyCard";

export interface PropertyDetails extends PropertyCardProps {
  region: string;
  description: React.ReactNode;
  gallery: string[];
  features: { icon: string; text: string }[];
  overview: { label: string; value: string }[];
}

// 100% dynamic - no static mock data
export const propertiesData: PropertyDetails[] = [];

export function getPropertiesByRegion(region: string): Promise<PropertyDetails[]> {
  return Promise.resolve(propertiesData.filter((p) => p.region === region));
}

export function getPropertyById(id: string): Promise<PropertyDetails | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(propertiesData.find((p) => p.id.toString() === id));
    }, 50);
  });
}
