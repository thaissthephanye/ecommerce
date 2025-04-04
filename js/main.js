// Dados dos produtos premium
const products = [
  {
    id: 1,
    name: "Relógio de Luxo Aurora",
    price: 4599.99,
    description: "Edição limitada com pulseira de couro italiano",
    image: "assets/watch.jpg",
    category: "acessorios",
    icon: "far fa-clock",
  },
  {
    id: 2,
    name: "Bolsa Elegance",
    price: 3299.99,
    description: "Couro francês com detalhes em ouro",
    image: "assets/bag.jpg",
    category: "acessorios",
    icon: "fa-solid fa-bag-shopping",
  },
  {
    id: 3,
    name: "Óculos Vintage",
    price: 1599.99,
    description: "Armação em acetato com lentes polarizadas",
    image: "assets/glasses.jpg",
    category: "acessorios",
    icon: "far fa-eye",
  },
  {
    id: 4,
    name: "Perfume Coco Chanel",
    price: 899.99,
    description: "Fragrância exclusiva com notas de jasmim e âmbar",
    image: "assets/perfume.jpg",
    category: "beleza",
    icon: "fas fa-spray-can",
  },
  {
    id: 5,
    name: "Cinto Premium",
    price: 699.99,
    description: "Couro italiano com fivela em metal nobre",
    image: "assets/belt.jpg",
    category: "acessorios",
    icon: "fa-solid fa-conveyor-belt",
  },
  {
    id: 6,
    name: "Caderno Inteligente",
    price: 399.99,
    description: "Capa em couro com folhas de algodão",
    image: "assets/notebook.jpg",
    category: "escritorio",
    icon: "far fa-edit",
  },
];

// Carrega os produtos na página
document.addEventListener("DOMContentLoaded", () => {
  const productsGrid = document.querySelector(".products-grid");

  // Renderiza os produtos
  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";
    productCard.innerHTML = `
            <img src="${product.image}" alt="${
      product.name
    }" class="product-image">
            <div class="product-category">
                <i class="${product.icon}"></i>
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">R$ ${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${
                  product.id
                }">Adicionar</button>
            </div>
        `;
    productsGrid.appendChild(productCard);
  });

  // Inicializa o carrinho
  if (typeof initCart === "function") {
    initCart(products);
  } else {
    console.error(
      "Função initCart não encontrada - verifique o carregamento do cart.js"
    );
  }

  // Efeito de scroll no header
  window.addEventListener("scroll", () => {
    const header = document.querySelector(".glass-header");
    header.classList.toggle("scrolled", window.scrollY > 50);
  });

  // Menu mobile
  const menuBtn = document.getElementById("menuBtn");
  const mainNav = document.querySelector(".main-nav");

  menuBtn.addEventListener("click", () => {
    mainNav.classList.toggle("active");
  });

  // Fechar menu ao clicar em um link
  document.querySelectorAll(".main-nav .nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("active");
    });
  });

  // Modal de Login
  const loginModal = document.getElementById("loginModal");
  const loginBtn = document.getElementById("loginBtn");
  const loginClose = loginModal.querySelector(".close");

  loginBtn.addEventListener("click", () => {
    loginModal.style.display = "block";
    document.body.style.overflow = "hidden";
  });

  loginClose.addEventListener("click", () => {
    loginModal.style.display = "none";
    document.body.style.overflow = "auto";
  });

  window.addEventListener("click", (e) => {
    if (e.target === loginModal) {
      loginModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  // Formulário de Login
  document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    showNotification("Login realizado com sucesso!");
    loginModal.style.display = "none";
    document.body.style.overflow = "auto";
  });

  // Remove preloader
  setTimeout(() => {
    document.querySelector(".preloader").style.opacity = "0";
    setTimeout(() => {
      document.querySelector(".preloader").style.display = "none";
      document.body.classList.add("loaded");
    }, 500);
  }, 1000);
});

// Função global para notificações
function showNotification(message) {
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => notification.classList.add("show"), 10);
  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => document.body.removeChild(notification), 500);
  }, 3000);
}
