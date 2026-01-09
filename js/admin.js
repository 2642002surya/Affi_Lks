import { auth, db } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const loginSection = document.getElementById("login-section");
const adminSection = document.getElementById("admin-section");
const list = document.getElementById("product-list");

let editId = null;

document.getElementById("login-btn").onclick = async () => {
  await signInWithEmailAndPassword(
    auth,
    email.value,
    password.value
  );
};

onAuthStateChanged(auth, user => {
  if (user) {
    loginSection.style.display = "none";
    adminSection.style.display = "block";
    loadProducts();
  } else {
    loginSection.style.display = "block";
    adminSection.style.display = "none";
  }
});

async function loadProducts() {
  list.innerHTML = "";
  const snap = await getDocs(collection(db, "products"));

  snap.forEach(d => {
    const p = d.data();
    const li = document.createElement("li");

    li.innerHTML = `
      <strong>${p.name}</strong>
      <button data-edit>Edit</button>
      <button data-del>Delete</button>
    `;

    li.querySelector("[data-del]").onclick = async () => {
      await deleteDoc(doc(db, "products", d.id));
      loadProducts();
    };

    li.querySelector("[data-edit]").onclick = () => {
      editId = d.id;
      name.value = p.name;
      category.value = p.category;
      price.value = p.price;
      discountPrice.value = p.discountPrice;
      rating.value = p.rating;
      image.value = p.image;
      description.value = p.description;
    };

    list.appendChild(li);
  });
}

document.getElementById("add-btn").onclick = async () => {
  const data = {
    name: name.value.trim(),
    category: category.value.trim(),
    price: Number(price.value),
    discountPrice: Number(discountPrice.value),
    rating: Number(rating.value),
    image: image.value.trim(),
    description: description.value.trim(),
    createdAt: new Date()
  };

  if (editId) {
    await updateDoc(doc(db, "products", editId), data);
    editId = null;
  } else {
    await addDoc(collection(db, "products"), data);
  }

  document
    .querySelectorAll("#admin-section input, #admin-section textarea")
    .forEach(el => el.value = "");

  loadProducts();
};
