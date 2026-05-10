import { PropertyDetails } from "./properties";

// 100% dynamic - no static mock data
export const apartmentsData: PropertyDetails[] = [];

export function getAllApartments(): Promise<PropertyDetails[]> {
  return Promise.resolve(apartmentsData);
}

export function getApartmentById(id: string): Promise<PropertyDetails | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(apartmentsData.find((a) => a.id.toString() === id));
    }, 50);
  });
}
