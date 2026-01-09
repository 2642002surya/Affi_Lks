const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));

const product = products.find(p => p.id === id);

if (!product) {
  document.body.innerHTML = "<p style='padding:20px'>Product not found.</p>";
  throw new Error("Invalid product ID");
}

/* =====================
   BASIC DATA
===================== */

document.getElementById("product-image").src = product.image;
document.getElementById("product-image").alt = product.name;
document.getElementById("product-name").innerText = product.name;
document.getElementById("product-rating").innerText = "⭐ " + product.rating;
document.getElementById("product-discount").innerText = "₹" + product.discountPrice;
document.getElementById("product-price").innerText = "₹" + product.price;
document.getElementById("product-desc").innerText = product.description;
document.getElementById("buy-link").href = product.affiliateLink;

/* =====================
   SEO META
===================== */

document.getElementById("page-title").innerText =
  product.name + " | BestDeals";

document.getElementById("meta-desc").setAttribute(
  "content",
  product.description
);

document.getElementById("canonical-link").href =
  window.location.href;

document.getElementById("og-title").content = product.name;
document.getElementById("og-desc").content = product.description;
document.getElementById("og-image").content = product.image;

/* =====================
   BREADCRUMB
===================== */

const categoryLink = document.getElementById("breadcrumb-category");
categoryLink.innerText =
  product.category.charAt(0).toUpperCase() + product.category.slice(1);
categoryLink.href = `category.html?cat=${product.category}`;

document.getElementById("breadcrumb-product").innerText = product.name;

/* =====================
   RELATED PRODUCTS
===================== */

const related = products.filter(
  p => p.category === product.category && p.id !== product.id
);

const relatedGrid = document.getElementById("related-products");

related.slice(0, 4).forEach(p => {
  const card = document.createElement("div");
  card.className = "product-card";

  card.innerHTML = `
    <img src="${p.image}" alt="${p.name}">
    <div class="product-title">${p.name}</div>
    <div class="rating">⭐ ${p.rating}</div>
    <div>
      <span class="price">₹${p.discountPrice}</span>
      <span class="old-price">₹${p.price}</span>
    </div>
    <a class="buy-btn" href="product.html?id=${p.id}">
      View
    </a>
  `;

  relatedGrid.appendChild(card);
});

/* =====================
   PRODUCT SCHEMA (JSON-LD)
===================== */

const schema = {
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": product.name,
  "image": product.image,
  "description": product.description,
  "brand": {
    "@type": "Brand",
    "name": "BestDeals"
  },
  "offers": {
    "@type": "Offer",
    "priceCurrency": "INR",
    "price": product.discountPrice,
    "availability": "https://schema.org/InStock",
    "url": window.location.href
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": product.rating,
    "reviewCount": 100
  }
};

const script = document.createElement("script");
script.type = "application/ld+json";
script.text = JSON.stringify(schema);
document.head.appendChild(script);
