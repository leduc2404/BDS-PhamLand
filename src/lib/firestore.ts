import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
  where,
  Timestamp,
  DocumentData,
  QueryConstraint,
  startAfter,
  getCountFromServer,
} from "firebase/firestore";
import { db } from "./firebase";

// ==========================================
// TYPES matching actual Firestore schema
// ==========================================

export interface Property {
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

export interface Article {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  thumbnailUrl: string;
  author: string;
  isPublished: boolean;
  createdAt: Timestamp;
}

export interface Consignment {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  consultationType: string;
  details: string;
  source: string;
  status: string;
  createdAt: Timestamp;
}

// ==========================================
// GENERIC CRUD HELPERS
// ==========================================

export async function getDocuments<T>(
  collectionName: string,
  constraints: QueryConstraint[] = []
): Promise<T[]> {
  const q = query(collection(db, collectionName), ...constraints);
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as T[];
}

export async function getDocumentById<T>(
  collectionName: string,
  docId: string
): Promise<T | null> {
  const docRef = doc(db, collectionName, docId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as T;
  }
  return null;
}

export async function createDocument(
  collectionName: string,
  data: DocumentData
): Promise<string> {
  const docRef = await addDoc(collection(db, collectionName), {
    ...data,
    createdAt: Timestamp.now(),
  });
  return docRef.id;
}

export async function updateDocument(
  collectionName: string,
  docId: string,
  data: DocumentData
): Promise<void> {
  const docRef = doc(db, collectionName, docId);
  await updateDoc(docRef, {
    ...data,
    updatedAt: Timestamp.now(),
  });
}

export async function deleteDocument(
  collectionName: string,
  docId: string
): Promise<void> {
  const docRef = doc(db, collectionName, docId);
  await deleteDoc(docRef);
}

export async function getCollectionCount(
  collectionName: string
): Promise<number> {
  const coll = collection(db, collectionName);
  const snapshot = await getCountFromServer(coll);
  return snapshot.data().count;
}

// ==========================================
// PROPERTIES
// ==========================================

export async function getProperties(
  pageSize: number = 20,
  lastDoc?: DocumentData
): Promise<Property[]> {
  const constraints: QueryConstraint[] = [
    orderBy("createdAt", "desc"),
    limit(pageSize),
  ];
  if (lastDoc) {
    constraints.push(startAfter(lastDoc));
  }
  return getDocuments<Property>("properties", constraints);
}

export async function getPropertyById(id: string): Promise<Property | null> {
  return getDocumentById<Property>("properties", id);
}

export async function createProperty(
  data: Omit<Property, "id" | "createdAt">
): Promise<string> {
  return createDocument("properties", data);
}

export async function updateProperty(
  id: string,
  data: Partial<Property>
): Promise<void> {
  return updateDocument("properties", id, data);
}

export async function deleteProperty(id: string): Promise<void> {
  return deleteDocument("properties", id);
}

// ==========================================
// ARTICLES
// ==========================================

export async function getArticles(pageSize: number = 20): Promise<Article[]> {
  return getDocuments<Article>("news", [
    orderBy("createdAt", "desc"),
    limit(pageSize),
  ]);
}

export async function getArticleById(id: string): Promise<Article | null> {
  return getDocumentById<Article>("news", id);
}

export async function createArticle(
  data: Omit<Article, "id" | "createdAt">
): Promise<string> {
  return createDocument("news", data);
}

export async function updateArticle(
  id: string,
  data: Partial<Article>
): Promise<void> {
  return updateDocument("news", id, data);
}

export async function deleteArticle(id: string): Promise<void> {
  return deleteDocument("news", id);
}

// ==========================================
// CONSIGNMENTS
// ==========================================

export async function getConsignments(
  pageSize: number = 20
): Promise<Consignment[]> {
  return getDocuments<Consignment>("consignments", [
    orderBy("createdAt", "desc"),
    limit(pageSize),
  ]);
}

export async function updateConsignmentStatus(
  id: string,
  status: string,
  note?: string
): Promise<void> {
  const data: DocumentData = { status };
  if (note) data.internalNote = note;
  return updateDocument("consignments", id, data);
}

// ==========================================
// DASHBOARD STATS
// ==========================================

export async function getDashboardStats() {
  const [propertiesCount, articlesCount, consignmentsCount] = await Promise.all(
    [
      getCollectionCount("properties"),
      getCollectionCount("news"),
      getCollectionCount("consignments"),
    ]
  );

  // Get new consignments (status = "new")
  const newConsignments = await getDocuments<Consignment>("consignments", [
    where("status", "==", "new"),
  ]);

  return {
    totalProperties: propertiesCount,
    totalArticles: articlesCount,
    totalConsignments: consignmentsCount,
    newConsignments: newConsignments.length,
  };
}
