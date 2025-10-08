let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartCount = document.getElementById("cart-count");
cartCount.textContent = cart.length;

const backToTop = document.getElementById("back-to-top");
window.addEventListener("scroll", () => { backToTop.style.display = window.scrollY > 200 ? "block" : "none"; });
backToTop.addEventListener("click", () => { window.scrollTo({ top: 0, behavior: "smooth" }); });

const cartList = document.querySelector(".cart-list");
const totalAmount = document.getElementById("total-amount");

function renderCart() {
  cartList.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartList.innerHTML = "<p>Your cart is empty!</p>";
    totalAmount.textContent = "0";
    return;
  }

  cart.forEach((product, index) => {
    total += product.price;
    const item = document.createElement("div");
    item.className = "cart-item";
    item.innerHTML = `
      <img src="${product.img}" alt="${product.name}" width="100">
      <div class="cart-info">
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
      </div>
      <button class="remove-btn" data-index="${index}">Remove</button>
    `;
    cartList.appendChild(item);
  });

  totalAmount.textContent = total;

  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = btn.getAttribute("data-index");
      cart.splice(idx, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      cartCount.textContent = cart.length;
      renderCart();
    });
  });
}

renderCart();

document.getElementById("checkout").addEventListener("click", () => {
  if (cart.length === 0) { alert("Your cart is empty!"); return; }
  alert(`Order placed successfully! Total: ₹${totalAmount.textContent}`);
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  cartCount.textContent = 0;
  renderCart();
});
