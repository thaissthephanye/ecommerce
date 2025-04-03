// Simulação de API de pagamentos premium
async function mockPaymentAPI() {
  // Simular atraso de rede
  await new Promise((resolve) =>
    setTimeout(resolve, 1500 + Math.random() * 1000)
  );

  // Calcular total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Simular resposta baseada no valor total
  let success, message;

  if (total > 10000) {
    success = Math.random() < 0.7; // 70% de chance para compras grandes
    message = success
      ? "Pagamento aprovado - Valor elevado"
      : "Limite de crédito excedido";
  } else if (total > 5000) {
    success = Math.random() < 0.8; // 80% de chance para compras médias
    message = success
      ? "Pagamento aprovado"
      : "Cartão recusado - Contate seu banco";
  } else {
    success = Math.random() < 0.95; // 95% de chance para compras pequenas
    message = success
      ? "Pagamento aprovado"
      : "Problema temporário - Tente novamente";
  }

  // Gerar dados fictícios da transação
  const transactionId = "LUMIN-" + Date.now().toString().slice(-6);
  const paymentMethod = ["VISA", "MASTERCARD", "AMEX", "ELO"][
    Math.floor(Math.random() * 4)
  ];
  const installments =
    total > 2000 ? Math.min(Math.floor(Math.random() * 6) + 1, 6) : 1;

  return {
    success,
    message,
    transactionId: success ? transactionId : null,
    amount: total,
    paymentMethod,
    installments,
    timestamp: new Date().toISOString(),
    customer: {
      name: "Cliente LUMIN",
      email: "cliente@lumin.com",
    },
  };
}

// Adicionar estilo para animação do carrinho
const cartAnimationStyle = document.createElement("style");
cartAnimationStyle.textContent = `
.cart-icon.animate {
    animation: cartBounce 0.5s ease;
}

@keyframes cartBounce {
    0%, 100% { transform: scale(1); }
    25% { transform: scale(1.2); }
    50% { transform: scale(0.9); }
    75% { transform: scale(1.1); }
}
`;
document.head.appendChild(cartAnimationStyle);
