import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export async function fetchAllProducts() {
  const snap = await getDocs(collection(db, "products"));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function fetchProductsByCategory(category) {
  const q = query(
    collection(db, "products"),
    where("category", "==", category)
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function fetchProductById(id) {
  const snap = await getDocs(collection(db, "products"));
  const item = snap.docs
    .map(d => ({ id: d.id, ...d.data() }))
    .find(p => p.id === id);
  return item || null;
}
