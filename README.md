📌 Visão Geral
O LUMIN é um e-commerce premium com design sofisticado em tons de roxo, totalmente responsivo e com as seguintes funcionalidades principais:

Catálogo de produtos

Carrinho de compras com persistência em localStorage

Modal de login integrado

Simulação de checkout

Design otimizado para performance

🛠️ Estrutura de Arquivos
Copy
/ecommerce
  ├── index.html          # Página principal
  ├── css/
  │   └── style.css       # Estilos principais
  ├── js/
  │   ├── main.js         # Lógica principal
  │   ├── cart.js         # Gerenciamento do carrinho
  │   └── api.js          # Simulação de API
  ├── assets/             # Imagens de produtos
  └── images/             # Outras imagens
🔧 Configuração do Ambiente
Pré-requisitos:

Navegador moderno (Chrome, Firefox, Edge)

Servidor local (recomendado para desenvolvimento)

Instalação:

bash
Copy
git clone [repositório]
cd ecommerce
Execução:

Abra o arquivo index.html no navegador

Para desenvolvimento, utilize um servidor local como:

bash
Copy
npx serve
📚 Documentação Técnica
1. Estrutura Principal (index.html)
html
Copy
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <!-- Metadados -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LUMIN | E-commerce Premium</title>
    
    <!-- Fontes e Ícones -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600&display=swap">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    
    <!-- Estilos -->
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <!-- Estrutura completa -->
</body>
</html>
Run HTML
2. Gerenciamento de Estado (cart.js)
javascript
Copy
const CartManager = {
    cart: [],
    products: [],
    
    init(products) {
        this.products = products;
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.setupEventListeners();
    },
    
    addToCart(productId) {
        // Implementação
    },
    
    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }
};
3. Fluxo de Trabalho
Carregamento da Página:

Exibe pré-loader

Carrega produtos

Inicializa carrinho

Interação do Usuário:

mermaid
Copy
sequenceDiagram
    Usuário->>+Produto: Clica em "Adicionar"
    Produto->>+Carrinho: Adiciona item
    Carrinho->>LocalStorage: Salva estado
    Carrinho->>UI: Atualiza contador
Checkout:

Valida itens no carrinho

Simula API de pagamento

Limpa carrinho após sucesso

🎨 Guia de Estilos
Paleta de Cores
Cor	Código	Uso
Roxo Principal	#2a0a3a	Header, Footer
Roxo Vibrante	#9c27b0	Botões, Destaques
Roxo Pastel	#ba68c8	Elementos secundários
Fundo	#faf5ff	Cor de fundo da página
Tipografia
Títulos: Playfair Display (600)

Corpo: Montserrat (400)

Tamanhos:

Desktop: 1rem base (16px)

Mobile: 0.875rem base (14px)

🚀 Funcionalidades Principais
1. Carrinho de Compras
Métodos Disponíveis:

javascript
Copy
{
    addToCart(productId),  // Adiciona item
    removeFromCart(id),    // Remove item
    updateQuantity(id, increment), // Altera quantidade
    saveCart(),            // Persiste no localStorage
    getCartTotal()         // Calcula valor total
}
2. Sistema de Login
Fluxo:

Usuário clica no ícone de login

Modal é exibido com opções:

Login tradicional

Login social (Google/Apple)

Link para cadastro

3. Responsividade
Breakpoints:

> 992px: Desktop

768px - 992px: Tablet

< 768px: Mobile

🐛 Solução de Problemas Comuns
Problema: Itens não persistem no carrinho
Solução:

Verifique se o localStorage está habilitado

Confira erros no console com localStorage.debug = true

Problema: Layout quebrado em mobile
Solução:

Adicione viewport meta tag

Verifique media queries no CSS

Problema: Imagens não carregam
Solução:

Confira caminhos no HTML/JS

Verifique permissões de arquivo

📝 Notas de Desenvolvimento
Performance:

Imagens otimizadas (WebP)

Lazy loading implementado

CSS crítico inline

Acessibilidade:

ARIA labels em elementos interativos

Contraste adequado

Navegação por teclado

Melhorias Futuras:

Integração com API real

Página de produto detalhada

Sistema de avaliações

📦 Dependências
Font Awesome v6.0.0-beta3 (ícones)

Google Fonts (Montserrat e Playfair Display)

📄 Licença
MIT License - Disponível para uso e modificação
