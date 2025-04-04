document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove classe active de todos os botões
    document
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.remove("active"));

    // Adiciona ao botão clicado
    btn.classList.add("active");

    // Filtra coleções
    const filter = btn.dataset.filter;
    document.querySelectorAll(".collection-card").forEach((card) => {
      card.style.display =
        filter === "all" || card.dataset.category === filter ? "block" : "none";
    });
  });
});
