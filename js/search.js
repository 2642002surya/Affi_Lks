function applySearch(list) {
  const query = document.getElementById("searchInput").value.toLowerCase();
  return list.filter(p =>
    p.name.toLowerCase().includes(query)
  );
}
