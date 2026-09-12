import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

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

async function inspectNews() {
  console.log("Fetching news from Firestore...");
  const snapshot = await getDocs(collection(db, "news"));
  console.log(`Found ${snapshot.docs.length} articles.`);

  const articles = [];
  snapshot.forEach((doc) => {
    articles.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  // Also check existing properties
  const propSnapshot = await getDocs(collection(db, "properties"));
  console.log(`Found ${propSnapshot.docs.length} existing properties in 'properties' collection.`);

  for (const a of articles) {
    console.log("-----------------------------------------");
    console.log("ID:", a.id);
    console.log("Title:", a.title);
    console.log("Slug:", a.slug);
    console.log("Thumb:", a.thumbnailUrl || a.imageUrl);
    console.log("Summary:", (a.summary || a.excerpt || "").substring(0, 100));
    console.log("Content preview:", (a.content || "").substring(0, 150));
  }
}

inspectNews().catch(console.error);
