
class Producto{
    constructor(id, articulo, precio, stock, img){
        this.id = id;
        this.articulo = articulo;
        this.precio = precio;
        this.stock = stock;
        this.img = img;
        this.cantidad = 1; 
    }
}

const PRODUCTO_1 = new Producto (1, "Shirt IJU", 1800, 4, "assets/img/shirt.jpg");
const PRODUCTO_2 = new Producto (2, "Pants SEA", 2400, 5, "assets/img/jeans.jpg");
const PRODUCTO_3 = new Producto (3, "Tshirt BREEZE", 1200, 2, "assets/img/tshirt.jpg");
const PRODUCTO_4 = new Producto (4, "Sweater COMFY", 2600, 5, "assets/img/sweater.jpg");
const PRODUCTO_5 = new Producto (5, "3xSocks", 600, 6, "assets/img/socks.jpg");
const PRODUCTO_6 = new Producto (6, "Hat SUMMER", 500, 3, "assets/img/hat.jpg");

const PRODUCTOS = [PRODUCTO_1, PRODUCTO_2, PRODUCTO_3, PRODUCTO_4, PRODUCTO_5, PRODUCTO_6]; 

let carrito = [];

const CONTAINER_PROD = document.getElementById("containerProd");
const CONTAINER_CART = document.getElementById("containerCart");


const PROD_DEV = () =>{
    const ROW = document.createElement("div");
    ROW.classList.add("row", "justify-content-evenly");
    PRODUCTOS.forEach(producto =>{
        const card = document.createElement("div");
        card.classList.add("col-md-4", "cards");
        card.innerHTML = `
            <div class="card" style="width: 100%;">
                <img src="${producto.img}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h2 class="card-title">${producto.articulo}</h2>
                    <p class="card-text">${producto.precio}</p>
                    <button class="bx bx-add-to-queue addCart" id="boton${producto.id}"></button>
                </div>
            </div>
        `;
        CONTAINER_PROD.appendChild(ROW);
        ROW.appendChild(card);

            const BOTON = document.getElementById(`boton${producto.id}`)
            BOTON.addEventListener("click", ()=>{
                agregarAlCarrito(producto.id);
            });
    });

}

PROD_DEV();

const saveCartToLocalStorage = () =>{
    const cartData = carrito.map(producto => ({
        id: producto.id,
        cantidad: producto.cantidad
    }));
    localStorage.setItem('cart', JSON.stringify(cartData));
};

const loadCartFromLocalStorage = () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        const cartData = JSON.parse(savedCart);
        return cartData.map(item => {
            const producto = PRODUCTOS.find(p => p.id === item.id);
            return { ...producto, cantidad: item.cantidad };
        });
    } else {
        return [];
    }
};

carrito = loadCartFromLocalStorage();

const updateCartUI = () => {
    const cartContent = document.querySelector('.cartContent');
    cartContent.innerHTML = '';

    let total = 0;

    carrito.forEach(producto => {
        const cartBox = document.createElement('div');
        cartBox.classList.add('cartBox');
        cartBox.innerHTML = `
            <img src="${producto.img}" alt="" class="cartImg">
            <div class="detail">
                <div class="cartProductTitle">${producto.articulo}</div>
                <div class="cartPrice">${producto.precio}</div>
                <input type="number" value="${producto.cantidad}" class="cartQuantity">
            </div>
            <button class='bx bxs-trash-alt cartRemove'></button>
        `;

        const removeButton = cartBox.querySelector('.cartRemove');
        removeButton.addEventListener('click', () => {
            removeProductFromCart(producto.id);
        });

        cartContent.appendChild(cartBox);

        total += producto.precio * producto.cantidad;
    });

    const totalElement = document.querySelector('.totalPrice');
    totalElement.textContent = `$${total}`;

    const cartTotal = document.querySelector('.cart .totalPrice');
    cartTotal.textContent = `$${total}`;

    saveCartToLocalStorage();
};



const removeProductFromCart = (id) => {
    carrito = carrito.filter(producto => producto.id !== id);
    updateCartUI();
};

const agregarAlCarrito = (id) => {
    const productoEnCarrito = carrito.find(producto => producto.id === id);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        const producto = PRODUCTOS.find(producto => producto.id === id);
        carrito.push({ ...producto });
    }

    updateCartUI();
    console.log(carrito);
};

let cartIcon = document.getElementById("cartIcon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#closeCart");

cartIcon.onclick = () =>{
    cart.classList.add("active");
};

closeCart.onclick = () =>{
    cart.classList.remove("active")
};


const BOTONCHECKOUT = document.getElementById("checkout");
BOTONCHECKOUT.addEventListener("click", ()=>{
    Swal.fire({
        title:"Sure you want to proceed to checkout?",
        icon: "success",
        confirmButtonText: "Proceed to checkout",
        showCancelButton: true,
        cancelButtonText: "Continue shopping"
    }) 
})