// FunÃ§Ã£o para extrair informaÃ§Ãµes da URL
function extractUrlParams() {
    var params = new URLSearchParams(window.location.search);
    var cartItems = [];

    params.forEach(function (value, key) {
      if (key.startsWith("produto_id")) {
        var productId = value;
        var name = params.getAll("produto_nome" + key.replace("produto_id", ""));
        var price = params.getAll("produto_preco" + key.replace("produto_id", ""));
        var imageUrl = params.getAll("produto_imagem" + key.replace("produto_id", ""));

        // Verificar se hÃ¡ valores em todas as propriedades
        if (name.length > 0 && price.length > 0 && imageUrl.length > 0) {
          // Usar o primeiro valor encontrado para cada propriedade
          var item = {
            id: productId,
            name: name[0],
            price: parseFloat(price[0]),
            quantity: 1, // Defina a quantidade inicial como 1 ou ajuste conforme necessÃ¡rio
            imageUrl: imageUrl[0]
          };
          cartItems.push(item);
        }
      }
    });

    return cartItems;
  }

  // FunÃ§Ã£o para renderizar os itens do carrinho
  function renderCartItems() {
    var cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = "";

    var totalPrice = 0;

    for (var i = 0; i < cartItems.length; i++) {
      var item = cartItems[i];
      var totalItemPrice = item.price * item.quantity;
      totalPrice += totalItemPrice;

      var row = document.createElement("tr");
      row.innerHTML = `
        <td>
          <img src="${item.imageUrl}" alt="${item.name}" width="50">
          ${item.name}
        </td>
        <td>R$ ${item.price.toFixed(2)}</td>
        <td>
          <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity('${item.id}', this.value)">

        </td>
        <td>R$ ${totalItemPrice.toFixed(2)}</td>
        <td><button onclick="removeItem(${item.id})">Remover</button></td>
      `;

      cartItemsContainer.appendChild(row);
    }

    document.getElementById("total-price").textContent = "R$ " + totalPrice.toFixed(2);
  }

  // FunÃ§Ã£o para atualizar a quantidade de um item
  function updateQuantity(itemId, newQuantity) {
    for (var i = 0; i < cartItems.length; i++) {
      if (cartItems[i].id === itemId) {
        cartItems[i].quantity = parseInt(newQuantity);
        break;
      }
    }

    renderCartItems();
  }

  // FunÃ§Ã£o para remover um item do carrinho
  function removeItem(itemId) {
    itemId = itemId.toString(); // Converter para string
    cartItems = cartItems.filter(function (item) {
      return item.id !== itemId;
    });

    renderCartItems();
  }


  // FunÃ§Ã£o para aplicar o cupom de desconto
  function applyCoupon() {
    var couponInput = document.getElementById("coupon");
    var couponCode = couponInput.value.trim();

    if (couponCode === "UTFPR") {
      var totalPrice = calculateTotalPrice();
      var discount = totalPrice * 0.15; // 15% de desconto
      totalPrice -= discount;
      document.getElementById("total-price").textContent = "R$ " + totalPrice.toFixed(2);
    } else {
      alert("Cupom invÃ¡lido.");
    }

    couponInput.value = "";
  }

  function calculateTotalPrice() {
    var totalPrice = 0;
    for (var i = 0; i < cartItems.length; i++) {
      var item = cartItems[i];
      totalPrice += item.price * item.quantity;
    }
    return totalPrice;
  }


  // Evento ao clicar no botÃ£o de aplicar cupom
  document.getElementById("apply-coupon").addEventListener("click", applyCoupon);


  // ExtraÃ§Ã£o dos parÃ¢metros da URL e renderizaÃ§Ã£o do carrinho de compras
  var cartItems = extractUrlParams();
  renderCartItems();


  ///////////////////////////////
  // FunÃ§Ã£o para finalizar a compra
  function finishPurchase() {
    // Remover todos os itens do carrinho
    cartItems = [];
    renderCartItems();

    // Exibir a mensagem de compra finalizada
    var overlay = document.getElementById("overlay");
    overlay.classList.add("show");

    // Esconder o botÃ£o de finalizar compra
    document.getElementById("finish-purchase").classList.add("hide");
  }

  // FunÃ§Ã£o para fechar a mensagem de compra finalizada
  function closeMessage() {
    var overlay = document.getElementById("overlay");
    overlay.classList.remove("show");
  }

  // Evento ao clicar no botÃ£o de finalizar compra
  document.getElementById("finish-purchase").addEventListener("click", finishPurchase);

  // Evento para fechar a mensagem de compra finalizada
  document.getElementById("overlay").addEventListener("click", closeMessage);

  //////////////////////////////////////////

  var storedUsername = localStorage.getItem("nomeUsuario");
  document.getElementById("user-name").textContent = storedUsername;

  function toggleFinishButton() {
    var finishButton = document.getElementById("finish-purchase");
    if (isAuthenticated()) {
      finishButton.classList.remove("hide"); // Remova a classe "hide" para exibir o botÃ£o de finalizar
    } else {
      finishButton.classList.add("hide"); // Adicione a classe "hide" para ocultar o botÃ£o de finalizar
    }
  }

  // FunÃ§Ã£o para ocultar o formulÃ¡rio de login e atualizar o nome do usuÃ¡rio logado
  function hideLoginForm() {
    var userNameElement = document.getElementById("user-name");
    var finishButton = document.getElementById("finish-purchase");

    if (isAuthenticated()) {
      var storedUsername = localStorage.getItem("nomeUsuario");
      userNameElement.textContent = "OlÃ¡, " + storedUsername + "!"; // Atualize o conteÃºdo do elemento com o nome de usuÃ¡rio

      finishButton.classList.remove("hide"); // Remova a classe "hide" para exibir o botÃ£o de finalizar
    } else {
      userNameElement.textContent = ""; // Limpe o conteÃºdo do elemento

      finishButton.classList.add("hide"); // Adicione a classe "hide" para ocultar o botÃ£o de finalizar
    }
  }
  hideLoginForm(); // Chamar a funÃ§Ã£o para ocultar o formulÃ¡rio de login inicialmente e atualizar o nome do usuÃ¡rio
  function isAuthenticated() {
    var storedUsername = localStorage.getItem("nomeUsuario");
    return !!storedUsername; // Retorna true se o nome de usuÃ¡rio existir, ou false se for null ou vazio
  }


  // FunÃ§Ã£o para processar o login
  function login() {
    var storedUsername = localStorage.getItem("nomeUsuario");

    if (storedUsername) {
      isAuthenticated = true;
      hideLoginForm();
      toggleFinishButton(); // Chamar a funÃ§Ã£o para atualizar a exibiÃ§Ã£o do botÃ£o de finalizar
    } else {
      alert("VocÃª deve fornecer um nome de usuÃ¡rio.");
    }
  }

  // Evento ao clicar no botÃ£o de login
  document.getElementById("login-btn").addEventListener("click", login);



