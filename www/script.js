// =======================
// SCROLL
// =======================
function scrollToCatalog() {
  document.getElementById("catalog").scrollIntoView({
    behavior: "smooth"
  });
}

// =======================
// CART SYSTEM
// =======================
const cartBtn = document.getElementById("cartBtn");
const cartModal = document.getElementById("cartModal");
const cartClose = document.getElementById("cartClose");
const cartItems = document.getElementById("cartItems");
const totalPrice = document.getElementById("totalPrice");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(name, price) {
  cart.push({ name, price });
  saveCart();
  updateCartDisplay();
  alert(name + " ավելացվել է զամբյուղ։");
}

function updateCartDisplay() {
  if (!cartItems || !totalPrice) return;

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ${item.price} դր`;

    const removeBtn = document.createElement("span");
    removeBtn.textContent = " ×";
    removeBtn.className = "remove-btn";
    removeBtn.style.cursor = "pointer";

    removeBtn.onclick = () => {
      cart.splice(index, 1);
      saveCart();
      updateCartDisplay();
    };

    li.appendChild(removeBtn);
    cartItems.appendChild(li);

    total += item.price;
  });

  totalPrice.textContent = total;
}

// open / close cart
if (cartBtn && cartModal) {
  cartBtn.onclick = () => cartModal.style.display = "flex";
}

if (cartClose) {
  cartClose.onclick = () => cartModal.style.display = "none";
}

window.onclick = (e) => {
  if (e.target === cartModal) {
    cartModal.style.display = "none";
  }
};

// =======================
// ORDER BUTTON
// =======================
const orderBtn = document.getElementById("orderBtn");

if (orderBtn) {
  orderBtn.addEventListener("click", () => {
    alert("Խնդրում ենք գրեք մեզ Instagram-ում Direct-ի միջոցով։");
    window.open("https://www.instagram.com/ekahandmadekristine/", "_blank");
  });
}

// =======================
// AUTH SYSTEM
// =======================

// SIGN UP
function signUp() {
  let user = document.getElementById("signup-user")?.value;
  let pass = document.getElementById("signup-pass")?.value;

  if (!user || !pass) return;

  localStorage.setItem("user", user);
  localStorage.setItem("pass", pass);

  let status = document.getElementById("status");
  if (status) status.innerText = "Account created!";
}

// LOGIN
function logIn() {
  let user = document.getElementById("login-user")?.value;
  let pass = document.getElementById("login-pass")?.value;

  let savedUser = localStorage.getItem("user");
  let savedPass = localStorage.getItem("pass");

  if (user === savedUser && pass === savedPass) {
    localStorage.setItem("loggedIn", "true");
    window.location.href = "profile.html";
  } else {
    let status = document.getElementById("status");
    if (status) status.innerText = "Wrong username or password";
  }
}

// LOGOUT
function logOut() {
  localStorage.setItem("loggedIn", "false");
  localStorage.removeItem("currentUser");

  window.location.href = "index.html";
}

// =======================
// PASSWORD SHOW / HIDE
// =======================
function togglePassword() {
  let input = document.getElementById("login-pass");
  let btn = document.getElementById("eyeBtn");

  if (!input) return;

  if (input.type === "password") {
    input.type = "text";
    if (btn) btn.textContent = "🙈";
  } else {
    input.type = "password";
    if (btn) btn.textContent = "👁";
  }
}

// =======================
// LOGO NAVIGATION
// =======================
function goHome() {
  window.location.href = "index.html";
}

// =======================
// PAGE LOAD
// =======================
window.addEventListener("DOMContentLoaded", function () {

  // cart render
  updateCartDisplay();

  // username in header
  let user = localStorage.getItem("user");
  let title = document.querySelector(".site-title");

  if (user && title) {
    title.innerText = "EKA Handmade | " + user;
  }

  // status text
  let status = document.getElementById("status");
  if (status && localStorage.getItem("loggedIn") === "true") {
    status.innerText = "You are logged in";
  }
});


document.addEventListener("keydown", function (e) {
  if (e.key !== "Enter") return;

  // ===== LOGIN =====
  const loginUser = document.getElementById("login-user");
  const loginPass = document.getElementById("login-pass");

  // եթե login էջում ենք
  if (loginUser && loginPass) {
    if (document.activeElement === loginUser) {
      loginPass.focus();
      return;
    }

    if (document.activeElement === loginPass) {
      logIn();
      return;
    }
  }

  // ===== SIGN UP =====
  const signupUser = document.getElementById("signup-user");
  const signupPass = document.getElementById("signup-pass");

  // եթե signup էջում ենք
  if (signupUser && signupPass) {
    if (document.activeElement === signupUser) {
      signupPass.focus();
      return;
    }

    if (document.activeElement === signupPass) {
      signUp();
      return;
    }
  }
});

function goToPage() {
  let isLoggedIn = localStorage.getItem("loggedIn");

  if (isLoggedIn === "true") {
    window.location.href = "profile.html";
  } else {
    window.location.href = "login.html";
  }
}

function logIn() {
  let user = document.getElementById("login-user").value;
  let pass = document.getElementById("login-pass").value;

  let savedUser = localStorage.getItem("user");
  let savedPass = localStorage.getItem("pass");

  if (user === savedUser && pass === savedPass) {
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("currentUser", user);
    window.location.href = "profile.html";
  } else {
    document.getElementById("status").innerText =
      "Wrong username or password";
  }
}

window.addEventListener("DOMContentLoaded", function () {
  let user = localStorage.getItem("currentUser");
  let title = document.querySelector(".site-title");

  if (title) {
    if (user && localStorage.getItem("loggedIn") === "true") {
      title.innerText = "EKA Handmade | " + user;
    } else {
      title.innerText = "EKA Handmade";
    }
  }
});

function searchProducts() {

  let input = document
    .getElementById("searchInput")
    .value
    .toLowerCase();

  let products = document.querySelectorAll(".product");

  products.forEach(product => {

    let title = product.querySelector("h3")
      .innerText
      .toLowerCase();

    let text = product.querySelector("p")
      .innerText
      .toLowerCase();

    if (title.includes(input) || text.includes(input)) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }

  });
}

function filterByPrice() {

  let min =
    Number(document.getElementById("minPrice").value);

  let max =
    Number(document.getElementById("maxPrice").value);

  let products =
    document.querySelectorAll(".product");

  products.forEach(product => {

    let price =
      Number(product.dataset.price);

    let show = true;

    // minimum check
    if (min && price < min) {
      show = false;
    }

    // maximum check
    if (max && price > max) {
      show = false;
    }

    product.style.display =
      show ? "block" : "none";

  });
}