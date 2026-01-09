const grid = document.getElementById("product-grid");

const params = new URLSearchParams(window.location.search);
const category = params.get("cat");

if (category) {
  document.getElementById("category-title").innerText =
    category.charAt(0).toUpperCase() + category.slice(1);
}

function getCategoryProducts() {
  if (!category) return products;
  return products.filter(p => p.category === category);
}

function updateView() {
  let list = getCategoryProducts();
  if (document.getElementById("searchInput")) {
    list = applySearch(list);
    list = applyFilters(list);
  }
  renderProducts(list);
}

function renderProducts(list) {
  grid.innerHTML = "";

  if (list.length === 0) {
    grid.innerHTML = "<p>No products found.</p>";
    return;
  }

  list.forEach(p => {
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
      <a class="buy-btn" href="${p.affiliateLink}" target="_blank" rel="nofollow noopener">
        Buy Now
      </a>
    `;

    grid.appendChild(card);
  });
}

if (document.getElementById("searchInput")) {
  document
    .querySelectorAll(".filter-bar input, .filter-bar select")
    .forEach(el => el.addEventListener("input", updateView));
}

updateView();
