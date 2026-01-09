# AffiLks 🌱

AffiLks is a Firebase-powered affiliate store focused on plants, gardening tools,
and eco-friendly products.  
Hosted on GitHub Pages. Data managed via Firebase (Firestore + Auth).

---

## 🔥 Tech Stack

- Frontend: HTML, CSS (Green / Eco Theme), Vanilla JS
- Hosting: GitHub Pages
- Backend (FREE tier):
  - Firebase Firestore (products)
  - Firebase Authentication (admin only)

---

## 📂 Project Structure

Affi_Lks/
├── index.html
├── category.html
├── product.html
├── admin.html
├── about.html
├── robots.txt
├── sitemap.xml
│
├── css/
│ └── style.css
│
├── js/
│ ├── firebase.js
│ ├── store.js
│ └── admin.js
│
└── images/
└── products/

---

## 🔐 Admin Access

Admin panel:

- Login via Firebase Email/Password
- Add / Edit / Delete products
- Changes reflect instantly on public pages

---

## 🧠 Data Model (Firestore)

Collection: `products`

Fields:

- name
- category
- price
- discountPrice
- rating
- image (URL)
- description
- createdAt

---

## 🚀 Deployment

- Push to `main` branch
- GitHub Pages enabled (root)
- Live at:
  https://2642002surya.github.io/Affi_Lks/

---

## ⚠️ Notes

- No static product files (`products.js`) are used
- Firestore is the single source of truth
- Firebase Spark (FREE) plan only
- No image uploads (URLs only)

---

© 2026 AffiLks
