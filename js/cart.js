// Gerenciador do Carrinho
const CartManager = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  products: [],

  // Inicialização do carrinho
  init: function (products) {
    this.products = products;
    this.setupEventListeners();
    this.updateCartCount();
  },

  // Configura todos os event listeners
  setupEventListeners: function () {
    // Modal do Carrinho
    document
      .getElementById("cartBtn")
      .addEventListener("click", () => this.openCart());
    document
      .querySelector("#cartModal .close")
      .addEventListener("click", () => this.closeCart());

    // Event delegation para elementos dinâmicos
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("add-to-cart")) {
        this.addToCart(parseInt(e.target.dataset.id));
        this.animateCartIcon();
        showNotification("Item adicionado ao carrinho!");
      }

      if (e.target.classList.contains("remove-item")) {
        this.removeFromCart(parseInt(e.target.dataset.id));
        showNotification("Item removido do carrinho");
      }

      if (e.target.classList.contains("quantity-btn")) {
        const selector = e.target.closest(".quantity-selector");
        const isIncrease = e.target.classList.contains("increase");
        this.updateQuantity(parseInt(selector.dataset.id), isIncrease);
      }

      if (e.target.classList.contains("continue-shopping")) {
        this.closeCart();
      }
    });

    // Finalizar compra
    document
      .getElementById("checkoutBtn")
      .addEventListener("click", () => this.processPayment());
  },

  // Adiciona item ao carrinho
  addToCart: function (productId) {
    const product = this.products.find((p) => p.id === productId);
    if (!product) return;

    const existingItem = this.cart.find((item) => item.id === productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }

    this.saveCart();
    this.updateCartUI();
  },

  // Remove item do carrinho
  removeFromCart: function (productId) {
    this.cart = this.cart.filter((item) => item.id !== productId);
    this.saveCart();
    this.updateCartUI();
  },

  // Atualiza quantidade de um item
  updateQuantity: function (productId, isIncrease) {
    const item = this.cart.find((item) => item.id === productId);
    if (!item) return;

    if (isIncrease) {
      item.quantity += 1;
    } else {
      item.quantity = Math.max(1, item.quantity - 1);
    }

    this.saveCart();
    this.updateCartUI();
  },

  // Atualiza toda a UI do carrinho
  updateCartUI: function () {
    this.updateCartCount();
    this.renderCartItems();
  },

  // Atualiza o contador do carrinho
  updateCartCount: function () {
    const count = this.cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById("cartCount").textContent = count;
  },

  // Renderiza os itens do carrinho
  renderCartItems: function () {
    const cartItemsContainer = document.getElementById("cartItems");
    cartItemsContainer.innerHTML = "";

    if (this.cart.length === 0) {
      cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="far fa-shopping-bag"></i>
                    <p>Seu carrinho está vazio</p>
                    <button class="continue-shopping">Continuar Comprando</button>
                </div>
            `;
      document.getElementById("subtotal").textContent = "R$ 0.00";
      document.getElementById("cartTotal").textContent = "R$ 0.00";
      return;
    }

    let subtotal = 0;

    this.cart.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;

      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.innerHTML = `
                <img src="${item.image}" alt="${
        item.name
      }" class="cart-item-image">
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <p class="cart-item-price">R$ ${item.price.toFixed(2)}</p>
                    <div class="cart-item-actions">
                        <div class="quantity-selector" data-id="${item.id}">
                            <button class="quantity-btn decrease">-</button>
                            <span class="quantity-value">${item.quantity}</span>
                            <button class="quantity-btn increase">+</button>
                        </div>
                        <button class="remove-item" data-id="${item.id}">
                            <i class="far fa-trash-alt"></i> Remover
                        </button>
                    </div>
                </div>
            `;
      cartItemsContainer.appendChild(cartItem);
    });

    document.getElementById("subtotal").textContent = `R$ ${subtotal.toFixed(
      2
    )}`;
    document.getElementById("cartTotal").textContent = `R$ ${subtotal.toFixed(
      2
    )}`;
  },

  // Abre o modal do carrinho
  openCart: function () {
    this.renderCartItems();
    document.getElementById("cartModal").style.display = "block";
    document.body.style.overflow = "hidden";
    this.animateCartIcon();
  },

  // Fecha o modal do carrinho
  closeCart: function () {
    document.getElementById("cartModal").style.display = "none";
    document.body.style.overflow = "auto";
  },

  // Animação do ícone do carrinho
  animateCartIcon: function () {
    const cartBtn = document.getElementById("cartBtn");
    cartBtn.classList.add("animate");
    setTimeout(() => cartBtn.classList.remove("animate"), 1000);
  },

  // Processamento de pagamento
  processPayment: async function () {
    if (this.cart.length === 0) {
      showNotification("Seu carrinho está vazio!");
      return;
    }

    try {
      const checkoutBtn = document.getElementById("checkoutBtn");
      const originalText = checkoutBtn.innerHTML;
      checkoutBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Processando...';
      checkoutBtn.disabled = true;

      // Simula chamada à API
      const response = await this.mockPaymentAPI();

      checkoutBtn.innerHTML = originalText;
      checkoutBtn.disabled = false;

      if (response.success) {
        showNotification(
          "Pagamento realizado com sucesso! Obrigado pela compra."
        );
        this.cart = [];
        this.saveCart();
        this.updateCartUI();
        setTimeout(() => this.closeCart(), 2000);
      } else {
        showNotification("Erro no pagamento: " + response.message);
      }
    } catch (error) {
      showNotification("Erro ao processar pagamento: " + error.message);
      document.getElementById("checkoutBtn").innerHTML = "Finalizar Compra";
      document.getElementById("checkoutBtn").disabled = false;
    }
  },

  // Simulação de API de pagamentos
  mockPaymentAPI: function () {
    return new Promise((resolve) => {
      setTimeout(() => {
        const total = this.cart.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        const success = Math.random() > 0.2; // 80% de chance de sucesso

        resolve({
          success,
          message: success ? "Pagamento aprovado" : "Pagamento recusado",
          transactionId: success
            ? "TXN-" + Date.now().toString().slice(-6)
            : null,
          amount: total,
          timestamp: new Date().toISOString(),
        });
      }, 1500);
    });
  },

  // Salva o carrinho no localStorage
  saveCart: function () {
    localStorage.setItem("cart", JSON.stringify(this.cart));
  },
};

// Exporta a função de inicialização
window.initCart = function (products) {
  CartManager.init(products);
};
