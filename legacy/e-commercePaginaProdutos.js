var cartItems = document.getElementById('cart-items');
var cartCounter = document.getElementById('cart-counter');
var cartBtn = document.querySelector('.cart-btn');
var products = document.querySelectorAll('.product');
var cartItemCount = 0;

function showDialog() {
    const dialog = document.querySelector('.dialog');

    products.forEach(product => {
        product.addEventListener('click', () => {
            const name = product.getAttribute('data-name');
            const price = product.getAttribute('data-price');
            const produtora = product.getAttribute('data-produtora');
            const genero = product.getAttribute('data-genero');
            const descricao = product.getAttribute('data-descricao');
            const imagem = product.getAttribute('data-imagem');

            // Atualize o conteÃºdo da caixa de diÃ¡logo com as informaÃ§Ãµes do produto, incluindo a imagem
            dialog.innerHTML = `
  <img src="${imagem}" alt="${name}" class="product-image">
<h3>${name}</h3>
<p><strong>PreÃ§o:</strong> R$ ${price}</p>
<p><strong>Produtora:</strong> ${produtora}</p>
<p><strong>GÃªnero:</strong> ${genero}</p>
<p><strong>DescriÃ§Ã£o:</strong> ${descricao}</p>
  `;

            // Exiba a caixa de diÃ¡logo e o overlay
            dialog.style.display = 'flex';
            overlay.style.display = 'block';
        });
    });

    // Adicione um evento de clique ao overlay para fechar a caixa de diÃ¡logo
    const overlay = document.querySelector('.overlay');
    overlay.addEventListener('click', () => {
        dialog.style.display = 'none';
        overlay.style.display = 'none';
    });
}


var checkoutButtonAdded = false;

function addToCart(name, price, image) {
    cartItemCount++;
    cartCounter.textContent = cartItemCount;

    var item = document.createElement('div');
    item.classList.add('cart-item');

    // Criando a imagem do produto
    var productImage = document.createElement('img');
    productImage.src = image;
    productImage.alt = name;
    item.appendChild(productImage);

    item.innerHTML += name + ' - R$ ' + price;
    item.addEventListener('click', function () {
        removeFromCart(this);

    });

    // Cria o botÃ£o de remoÃ§Ã£o de item
    var removeButton = document.createElement('button');
    removeButton.textContent = 'Remover';
    removeButton.classList.add('remove-btn');
    removeButton.addEventListener('click', function (event) {
        event.stopPropagation();
        removeFromCart(item);
    });
    item.appendChild(removeButton);

    cartItems.appendChild(item);


    // Habilita o botÃ£o do carrinho de compras quando um item Ã© adicionado
    cartBtn.disabled = false;


    cartItems.appendChild(item);
    verificarFinalizarCompra();
}



function verificarFinalizarCompra() {
    if (!checkoutButtonAdded) {
        // Se o botÃ£o de finalizar compra ainda nÃ£o foi adicionado
        checkoutButtonAdded = true; // Atualiza a variÃ¡vel de controle para indicar que o botÃ£o foi adicionado

        var buttonContainer = document.createElement('div');
        buttonContainer.classList.add('checkout-button-container');

        var button = document.createElement('button');
        button.textContent = 'Finalizar Compra';
        button.addEventListener('click', finalizeCheckout); // substitua "finalizeCheckout" pela funÃ§Ã£o que finaliza a compra

        buttonContainer.appendChild(button);
        cartItems.appendChild(buttonContainer);
    }


    if (checkoutButtonAdded) {
        // Se o botÃ£o de finalizar compra jÃ¡ foi adicionado
        var buttonContainer = cartItems.querySelector('.checkout-button-container');
        if (buttonContainer) {
            cartItems.removeChild(buttonContainer); // Remove o botÃ£o existente para recriÃ¡-lo no final da fila
        }

        buttonContainer = document.createElement('div');
        buttonContainer.classList.add('checkout-button-container');

        var button = document.createElement('button');
        button.textContent = 'Finalizar Compra';
        button.addEventListener('click', finalizeCheckout); // substitua "finalizeCheckout" pela funÃ§Ã£o que finaliza a compra

        buttonContainer.appendChild(button);
        cartItems.appendChild(buttonContainer);
    }

}



function finalizeCheckout() {
    var produtos = [];

    // Construir a lista de produtos adicionados ao carrinho
    var cartItems = document.querySelectorAll('.cart-item');
    cartItems.forEach(function (item, index) {
        var name = item.textContent.split(' - ')[0];
        var price = item.textContent.split(' - ')[1].substring(2);
        var image = item.querySelector('img').src;
        var id = index + 1; // ID do produto (pode ser qualquer valor Ãºnico)
        var produto = {
            id: id,
            nome: name,
            preco: price,
            imagem: image
        };
        produtos.push(produto);
    });

    // Construir a URL com os parÃ¢metros dos produtos
    var url = 'e-commerceCarrinho.html';
    produtos.forEach(function (produto, index) {
        url += (index === 0) ? '?' : '&';
        url += 'produto_id' + index + '=' + encodeURIComponent(produto.id);
        url += '&produto_nome' + index + '=' + encodeURIComponent(produto.nome);
        url += '&produto_preco' + index + '=' + encodeURIComponent(produto.preco);
        url += '&produto_imagem' + index + '=' + encodeURIComponent(produto.imagem);
    });

    // Redirecionar para a pÃ¡gina de checkout
    window.location.href = url;
}







function sortProducts() {
    var productGrid = document.querySelector('.product-grid');
    var products = Array.from(document.querySelectorAll('.product'));

    products.sort(function (a, b) {
        var nameA = a.getAttribute('data-name').toUpperCase();
        var nameB = b.getAttribute('data-name').toUpperCase();

        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });

    products.forEach(function (product) {
        productGrid.appendChild(product);
    });
}





function sortProducts2() {
    var productGrid = document.querySelector('.product-grid');
    var products = Array.from(document.querySelectorAll('.product'));

    products.sort(function (a, b) {
        var priceA = parseFloat(a.getAttribute('data-price').replace(',', '.'));
        var priceB = parseFloat(b.getAttribute('data-price').replace(',', '.'));

        return priceA - priceB;
    });

    products.forEach(function (product) {
        productGrid.appendChild(product);
    });
}





function removeFromCart(item) {
    cartItemCount--;
    cartCounter.textContent = cartItemCount;
    item.parentNode.removeChild(item);

    // Desabilita o botÃ£o do carrinho de compras quando todos os itens sÃ£o removidos
    if (cartItemCount === 0) {
        cartBtn.disabled = true;
        cartItems.classList.remove('show'); // Remova a classe 'show' quando nÃ£o hÃ¡ itens no carrinho
    }
}
function toggleCartItems() {
    if (cartItems.children.length > 0) {
        cartItems.classList.toggle('show');
    }
}

products.forEach(function (product) {
    var name = product.getAttribute('data-name');
    var price = product.getAttribute('data-price');
    var image = product.querySelector('.product-image').src;

    product.addEventListener('click', function () {
        showDialog(name, price, image);

    });

    var buyBtn = product.querySelector('.buy-btn');
    buyBtn.addEventListener('click', function (event) {
        event.stopPropagation();
        addToCart(name, price, image);
    });
});
cartBtn.addEventListener('click', toggleCartItems);
document.querySelector('.overlay').addEventListener('click', hideDialog);

