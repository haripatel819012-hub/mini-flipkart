let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartCount = document.getElementById("cart-count");
cartCount.textContent = cart.length;

const backToTop = document.getElementById("back-to-top");
window.addEventListener("scroll", () => { backToTop.style.display = window.scrollY > 200 ? "block" : "none"; });
backToTop.addEventListener("click", () => { window.scrollTo({ top: 0, behavior: "smooth" }); });

const urlParams = new URLSearchParams(window.location.search);
const productName = urlParams.get("name");

const products = [
  { name: "Smartphone", price: 12999, category: "electronics", img: "https://via.placeholder.com/300x300?text=Smartphone", offer: "50% OFF" },
  { name: "Headphones", price: 1499, category: "electronics", img: "https://via.placeholder.com/300x300?text=Headphones", offer: "Best Seller" },
  { name: "Smartwatch", price: 5999, category: "electronics", img: "https://via.placeholder.com/300x300?text=Smartwatch" },
  { name: "Laptop", price: 45999, category: "electronics", img: "https://via.placeholder.com/300x300?text=Laptop" },
  { name: "T-Shirt", price: 499, category: "fashion", img: "https://via.placeholder.com/300x300?text=T-Shirt", offer: "20% OFF" },
  { name: "Shoes", price: 1999, category: "fashion", img: "https://via.placeholder.com/300x300?text=Shoes" },
  { name: "Sofa", price: 15999, category: "home", img: "https://via.placeholder.com/300x300?text=Sofa" },
  { name: "Lamp", price: 999, category: "home", img: "https://via.placeholder.com/300x300?text=Lamp" },
];

const product = products.find(p => p.name === productName);
const productDetail = document.getElementById("product-detail");

if (product) {
  productDetail.innerHTML = `
    <div class="product-detail-card">
      <div class="product-image">
        <img src="${product.img}" alt="${product.name}">
        ${product.offer ? `<span class="offer-badge">${product.offer}</span>` : ''}
      </div>
      <h2>${product.name}</h2>
      <p>₹${product.price}</p>
      <button id="add-cart">Add to Cart</button>
    </div>
  `;
  document.getElementById("add-cart").addEventListener("click", () => {
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    cartCount.textContent = cart.length;
    alert(`${product.name} added to cart!`);
  });
} else {
  productDetail.innerHTML = "<p>Product not found!</p>";
}
