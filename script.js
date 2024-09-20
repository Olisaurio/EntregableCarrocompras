let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
}

function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showResult()
}

function createProductCard(product) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    cardDiv.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <div class="card-content">
            <h2>${product.title}</h2>
            <p>Precio: $${product.price.toFixed(2)}</p>
            <p>Categoría: ${product.category}</p>
            <button class="add-to-cart">Agregar al carrito</button>
        </div>
    `;
    
    const addButton = cardDiv.querySelector('.add-to-cart');
    addButton.addEventListener('click', () => addToCart(product));
    
    return cardDiv;
}

fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(json => {
        const productsContainer = document.getElementById('products-container');
        json.forEach(product => {
            const cardDiv = createProductCard(product);
            productsContainer.appendChild(cardDiv);
        });
    })
    .catch(error => console.error('Error fetching data:', error));

updateCartCount();

function showResult() {
    Swal.fire({
        text: 'Se añadió al carrito', // El texto del mensaje
        timer: 1000, // Duración en milisegundos (1000 ms = 1 segundo)
        showConfirmButton: false, // Opcional: Oculta el botón de confirmación
    });
}
