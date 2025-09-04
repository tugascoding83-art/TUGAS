document.addEventListener("DOMContentLoaded", () => {
  // === 1. LOGO START ===
  if (document.body.classList.contains("logo-page")) {
    const logo = document.getElementById("click-logo");
    if (logo) {
      logo.addEventListener(
        "click",
        () => (window.location.href = "login.html")
      );
    }
  }

  // === 2. LOGIN START ===
  if (document.body.classList.contains("login-page")) {
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const [number, email, password, rePassword] = [
          ...loginForm.querySelectorAll("input"),
        ].map((input) => input.value.trim());

        if (!number || !email || !password || !rePassword) {
          alert("Please fill all fields!");
          return;
        }
        if (password !== rePassword) {
          alert("123457 and 123457 do not mach!");
          return;
        }
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "start.html";
      });
    }
  }

  // === 3. START START ===
  if (document.body.classList.contains("start-page")) {
    const startBtn = document.getElementById("start-btn");
    if (startBtn) {
      startBtn.addEventListener(
        "click",
        () => (window.location.href = "menu.html")
      );
    }
  }

  // === 4. NAVBAR START ===
  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const link = btn.getAttribute("data-link");
      if (link) window.location.href = link;
    });
  });

  // === 5. BUY BUTTON di MENU PAGE START ===
  if (document.body.classList.contains("menu-page")) {
    document.querySelectorAll(".buy-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const link = btn.getAttribute("data-link");
        if (link) window.location.href = link;
      });
    });
  }

  // === 6. BUY NOW di DETAIL PRODUK START ===
  if (document.body.classList.contains("product-page")) {
    const buyNowBtn = document.querySelector(".buy-btn");
    if (buyNowBtn) {
      buyNowBtn.addEventListener("click", () => {
        const product = document.querySelector(".product-content");
        if (!product) return;
        const productData = {
          title: product.querySelector(".product-title").textContent,
          price: product.querySelector(".product-price").textContent,
          image: product.querySelector(".product-image").getAttribute("src"),
        };
        localStorage.setItem("selectedProduct", JSON.stringify(productData));
        window.location.href = "checkout.html";
      });
    }
  }

  // === 7. SEARCH START ===

  // === AVATAR START ===
  document.getElementById("message-btn")?.addEventListener("click", () => {
    alert("Opening Messages");
  });
  document.getElementById("notification-btn")?.addEventListener("click", () => {
    alert("Opening Notifications");
  });
  document
    .getElementById("account-details-btn")
    ?.addEventListener("click", () => {
      alert("Opening Account Details");
    });
  document.getElementById("my-purchase-btn")?.addEventListener("click", () => {
    alert("Opening Purchases");
  });
  document.getElementById("settings-btn")?.addEventListener("click", () => {
    alert("Opening Settings");
  });

  // Klik Avatar ke avatar.html
  document.getElementById("avatar-link")?.addEventListener("click", () => {
    window.location.href = "avatar.html";
  });

  // Klik Keranjang ke checkout.html
  document.getElementById("cart-btn")?.addEventListener("click", () => {
    window.location.href = "checkout.html";
  });

  // === CHECKOUT START ===
  document.querySelectorAll(".checkout-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const link = btn.getAttribute("data-link");
      if (link) window.location.href = link;
    });
  });

  function updateTotal() {
    let total = 0;
    document.querySelectorAll(".product-card").forEach((card) => {
      let price = parseInt(card.getAttribute("data-price"));
      let qty = parseInt(card.querySelector(".qty").innerText);
      total += price * qty;
    });
    document.getElementById("total").innerText = total.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }

  document.querySelectorAll(".plus").forEach((btn) => {
    btn.addEventListener("click", () => {
      let qtyEl = btn.parentElement.querySelector(".qty");
      qtyEl.innerText = parseInt(qtyEl.innerText) + 1;
      updateTotal();
    });
  });

  document.querySelectorAll(".minus").forEach((btn) => {
    btn.addEventListener("click", () => {
      let qtyEl = btn.parentElement.querySelector(".qty");
      let current = parseInt(qtyEl.innerText);
      if (current > 1) {
        qtyEl.innerText = current - 1;
        updateTotal();
      }
    });
  });

  updateTotal();
});
// EXTRA SEARCH START
document.addEventListener("DOMContentLoaded", () => {
  // === SEARCH PAGE FILTER FUNCTIONALITY ===
  const searchInput = document.getElementById("search-input");
  const searchGrid = document.getElementById("search-grid");

  if (searchInput && searchGrid) {
    const cards = Array.from(searchGrid.getElementsByClassName("search-card"));
    const cardData = cards.map((card) => ({
      element: card,
      name: card.querySelector(".product-name").textContent.toLowerCase(),
    }));

    searchInput.addEventListener("input", (e) => {
      const keyword = e.target.value.trim().toLowerCase();
      cardData.forEach(({ element, name }) => {
        if (name.includes(keyword) || keyword === "") {
          element.style.display = "";
        } else {
          element.style.display = "none";
        }
      });
    });
  }
});

// CREDIT START
// CREDIT START
document.addEventListener("DOMContentLoaded", () => {
  // Toggle switch
  const coinToggle = document.getElementById("coinToggle");
  const iconSpan = coinToggle.querySelector(".toggle-icon");
  coinToggle.addEventListener("click", () => {
    coinToggle.classList.toggle("active");
    iconSpan.textContent = coinToggle.classList.contains("active") ? "✓" : "−";
  });

  // Payment method stack
  const items = document.querySelectorAll(".method-item");
  const sheet = document.getElementById("totalSheet");

  function selectItem(clicked) {
    if (clicked.classList.contains("selected")) {
      // kalau klik lagi tombol yg sama → reset
      clicked.classList.remove("selected");
      items.forEach((it) => it.classList.remove("pushed"));
      sheet.classList.remove("show");
      sheet.setAttribute("aria-hidden", "true");
      return;
    }

    // reset dulu
    items.forEach((it) => it.classList.remove("selected", "pushed"));

    // pilih yg baru
    clicked.classList.add("selected");

    // yg lain turun
    items.forEach((it) => {
      if (it !== clicked) it.classList.add("pushed");
    });

    // tampilkan bottom sheet
    sheet.classList.add("show");
    sheet.setAttribute("aria-hidden", "false");
  }

  items.forEach((it) => {
    const btn = it.querySelector(".method-btn");
    btn.addEventListener("click", () => selectItem(it));
  });
});
