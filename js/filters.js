function applyFilters(list) {
  let filtered = [...list];

  const min = parseInt(document.getElementById("minPrice").value);
  const max = parseInt(document.getElementById("maxPrice").value);
  const rating = parseFloat(document.getElementById("ratingFilter").value);
  const sort = document.getElementById("sortBy").value;

  if (!isNaN(min)) {
    filtered = filtered.filter(p => p.discountPrice >= min);
  }

  if (!isNaN(max)) {
    filtered = filtered.filter(p => p.discountPrice <= max);
  }

  if (!isNaN(rating)) {
    filtered = filtered.filter(p => p.rating >= rating);
  }

  if (sort === "priceLow") {
    filtered.sort((a, b) => a.discountPrice - b.discountPrice);
  } else if (sort === "priceHigh") {
    filtered.sort((a, b) => b.discountPrice - a.discountPrice);
  } else if (sort === "ratingHigh") {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  return filtered;
}
