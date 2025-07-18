const products = [
  { id: 1, name: "Stylish Kurti", price: 399, img: "https://www.vishalmegamart.com/dw/image/v2/BGHT_PRD/on/demandware.static/-/Sites-vmm-apparel-master-catalog/default/dw2b22df6f/images/large/1120093950003.jpg?sw=400&sh=400" },
  { id: 2, name: "Trendy Handbag", price: 499, img: "https://img.freepik.com/free-photo/luxury-woman-handbag_1203-8394.jpg?semt=ais_hybrid&w=740" },
  { id: 3, name: "Pattu Saree", price: 899, img: "https://i.etsystatic.com/27490224/r/il/048d2f/4958282496/il_600x600.4958282496_i0m2.jpg" },
  { id: 4, name: "Fancy saree", price: 599, img: "https://i.etsystatic.com/26674461/c/1440/1440/0/0/il/f2d06b/5156801206/il_600x600.5156801206_ffho.jpg" },
  { id: 5, name: "Men's Kurta", price: 999, img: "https://jompers.com/cdn/shop/files/JOKP_695Peacock_1.jpg?v=1749290295&width=320" },
  { id: 6, name: "Flipflops", price: 299, img: "https://img.freepik.com/free-photo/sandals-beach-summer-fashion-aerial-view_53876-101221.jpg?semt=ais_hybrid&w=740" },
  { id: 7, name: "Kolhapuri sandals", price: 199, img: "https://i.pinimg.com/originals/ba/b7/d2/bab7d2994195761ea9fec2c55c5816c0.jpg" },
  { id: 8, name: "Casual T-Shirt Women", price: 299, img: "https://us.maje.com/dw/image/v2/AAON_PRD/on/demandware.static/-/Sites-maje-master-catalog/default/dw9c21a5be/images/hi-res/Maje_MFPTS00902-9977_F_6.jpg?sw=720&sh=955" },
  { id: 9, name: "Jeans Women", price: 799, img: "https://rukminim2.flixcart.com/image/300/300/xif0q/jean/q/d/h/30-dl-women-baggy-515-denim-look-original-imah8vp8qrj9uamt.jpeg?q=90" },
  { id: 10, name: "Men's Shirts", price: 399, img: "https://m.media-amazon.com/images/I/81UMzKpX92L.jpg" },
  { id: 11, name: "Kids Wear", price: 299, img: "https://i.pinimg.com/originals/9c/e0/5e/9ce05ec93fbd4d41f00b94454d51474f.jpg" },
  { id: 12, name: "Lehanga", price: 999, img: "https://medias.utsavfashion.com/media/catalog/product/cache/1/small_image/295x/040ec09b1e35df139433887a97daa66f/e/m/embroidered-georgette-scalloped-lehenga-in-red-v1-lqy2233_1.jpg" },
  { id: 13, name: "Men's T-shirt", price: 99, img: "https://i.pinimg.com/originals/85/54/4c/85544cc2dcce393ed153ef7972520ab2.jpg" },
  { id: 14, name: "Night suits", price: 799, img: "https://images.meesho.com/images/products/390059200/wsz68_400.webp" },
  { id: 15, name: "Shirts Women", price: 799, img: "https://us.benetton.com/dw/image/v2/BBSF_PRD/on/demandware.static/-/Sites-ucb-master/default/dw4c19ca1a/images/Full_Card_v/01_25P_58I5DQ08M_78B_F.jpg?sw=600&sh=800" },
  { id: 16, name: "Trousers", price: 799, img: "https://img01.ztat.net/article/spp-media-p1/472d39529c8b4fa4a75f47efafee5e05/8ce73fba95ba4b398b31a8971f1e8d8e.jpg?imwidth=300" },
  { id: 17, name: "Men's Jeans", price: 799, img: "https://stylegirlfriend.com/wp-content/uploads/2024/01/keekdasneek-black-workwear-jeans-outfit-1.jpg" },
  { id: 18, name: "Dupatta", price: 799, img: "https://kaashcollection.com/cdn/shop/files/il_fullxfull.6939243687_c4f0_600x.jpg?v=1748474933" },
  { id: 19, name: "Doti&paijama", price: 799, img: "https://m.media-amazon.com/images/I/71FnqkHqRjL.jpg" },
  { id: 20, name: "Frocks", price: 799, img: "https://i.pinimg.com/originals/73/01/b2/7301b247fb69f2642f457c4bc780e3be.jpg" },
  { id: 21, name: "Skirts", price: 799, img: "https://www.disturbia.us/cdn/shop/files/AW24BO870DAEMONOLOGIEWOODCUTPRINTMIDAXISKIRT_004_600x.jpg?v=1732723983" }
];

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// Update cart count
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.getElementById("cart-count").textContent = cart.length;
}

// Check if product is in favorites
function isFavorite(productId) {
  return favorites.some(p => p.id === productId);
}

// Toggle favorite (add/remove)
function toggleFavorite(productId) {
  const index = favorites.findIndex(p => p.id === productId);
  if (index !== -1) {
    favorites.splice(index, 1);
  } else {
    const product = products.find(p => p.id === productId);
    if (product) favorites.push(product);
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
  renderProducts(); // Update hearts
}

// Render products (all or filtered)
function renderProducts(list = products) {
  const container = document.getElementById("product-list");
  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = "<p>No products found.</p>";
    return;
  }

  list.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.img}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>Price: ₹${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
      <button class="fav-btn ${isFavorite(product.id) ? 'active' : ''}" onclick="toggleFavorite(${product.id})">❤️</button>
    `;
    container.appendChild(card);
  });

  updateCartCount();
}

// Add product to cart
function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length >= 5) {
    alert("Cart can contain only 5 products!");
    return;
  }

  const product = products.find(p => p.id === id);
  if (product) {
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert(`${product.name} added to cart.`);
  }
}

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  updateCartCount();

  // Search button
  document.getElementById("search-btn").addEventListener("click", () => {
    const query = document.getElementById("search-input").value.toLowerCase();
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(query)
    );
    renderProducts(filtered);
  });

  // Login/Logout logic
  const authLink = document.getElementById("auth-link");
  const user = localStorage.getItem("loggedInUser");

  if (user) {
    authLink.textContent = `Logout (${user})`;
    authLink.href = "#";
    authLink.onclick = () => {
      localStorage.removeItem("loggedInUser");
      alert("Logged out!");
      location.reload();
    };
  }
});
