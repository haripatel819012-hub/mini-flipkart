const products = [
  { name: "Smartphone", price: 12999, category: "electronics", img: "https://via.placeholder.com/200x200?text=Smartphone", offer: "50% OFF" },
  { name: "Headphones", price: 1499, category: "electronics", img: "https://via.placeholder.com/200x200?text=Headphones", offer: "Best Seller" },
  { name: "Smartwatch", price: 5999, category: "electronics", img: "https://via.placeholder.com/200x200?text=Smartwatch" },
  { name: "Laptop", price: 45999, category: "electronics", img: "https://via.placeholder.com/200x200?text=Laptop" },
  { name: "T-Shirt", price: 499, category: "fashion", img: "https://via.placeholder.com/200x200?text=T-Shirt", offer: "20% OFF" },
  { name: "Shoes", price: 1999, category: "fashion", img: "https://via.placeholder.com/200x200?text=Shoes" },
  { name: "Sofa", price: 15999, category: "home", img: "https://via.placeholder.com/200x200?text=Sofa" },
  { name: "Lamp", price: 999, category: "home", img: "https://via.placeholder.com/200x200?text=Lamp" },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartCount = document.getElementById("cart-count");
cartCount.textContent = cart.length;

const backToTop = document.getElementById("back-to-top");
window.addEventListener("scroll", () => { backToTop.style.display = window.scrollY > 200 ? "block" : "none"; });
backToTop.addEventListener("click", () => { window.scrollTo({ top: 0, behavior: "smooth" }); });

// Featured Slider
const featuredSlider = document.getElementById("featured-slider");
const featuredProducts = products.slice(0, 4);
featuredProducts.forEach(product => {
  const card = document.createElement("div");
  card.className = "featured-card";
  card.innerHTML = `
    <div class="product-image">
      <img src="${product.img}" alt="${product.name}">
      ${product.offer ? `<span class="offer-badge">${product.offer}</span>` : ''}
    </div>
    <h3>${product.name}</h3>
    <p>₹${product.price}</p>
    <a href="product.html?name=${encodeURIComponent(product.name)}" class="view-details">View Details</a>
  `;
  featuredSlider.appendChild(card);
});

// Categories
function populateCategory(sectionId, categoryName) {
  const container = document.getElementById(sectionId);
  const filtered = products.filter(p => p.category === categoryName);
  filtered.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <div class="product-image">
        <img src="${product.img}" alt="${product.name}">
        ${product.offer ? `<span class="offer-badge">${product.offer}</span>` : ''}
      </div>
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <button>Add to Cart</button>
      <a href="product.html?name=${encodeURIComponent(product.name)}" class="view-details">View Details</a>
    `;
    card.querySelector("button").addEventListener("click", () => {
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      cartCount.textContent = cart.length;
      alert(`${product.name} added to cart!`);
    });
    container.appendChild(card);
  });
}
populateCategory("electronics-list", "electronics");
populateCategory("fashion-list", "fashion");
populateCategory("home-list", "home");

// Deal sliders
function populateDeals(containerId, category) {
  const container = document.getElementById(containerId);
  const deals = products.filter(p => p.category === category).slice(0, 5);
  deals.forEach(product => {
    const card = document.createElement("div");
    card.className = "deal-card";
    card.innerHTML = `
      <img src="${product.img}" alt="${product.name}">
      <h4>${product.name}</h4>
      <p>₹${product.price}</p>
    `;
    container.appendChild(card);
  });
}
populateDeals("electronics-deals", "electronics");
populateDeals("fashion-deals", "fashion");
populateDeals("home-deals", "home");
