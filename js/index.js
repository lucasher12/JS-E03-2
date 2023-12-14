let nombre= prompt("Por favor, ingrese su nombre: ");
let apellido= prompt("Por favor, ingrese su apellido: ");
function bienvenida (nombre, apellido){
    alert(`Bienvenido ${nombre} ${apellido}`);
}
bienvenida (nombre, apellido);


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

const PRODUCTO_1 = new Producto (1, "Shirt IJU", 1800, 4, "../assets/img/shirt.jpg");
const PRODUCTO_2 = new Producto (2, "Pants SEA", 2400, 5, "../assets/img/jean.jpg");
const PRODUCTO_3 = new Producto (3, "Tshirt BREEZE", 1200, 2, "../assets/img/tshirt.jpg");
const PRODUCTO_4 = new Producto (4, "Sweater COMFY", 2600, 5, "../assets/img/sweater.jpg");
const PRODUCTO_5 = new Producto (5, "3xSocks", 600, 6, "../assets/img/socks.jpg");
const PRODUCTO_6 = new Producto (6, "Hat SUMMER", 500, 3, "../assets/img/hat.jpg");

const PRODUCTOS = [PRODUCTO_1, PRODUCTO_2, PRODUCTO_3, PRODUCTO_4, PRODUCTO_5, PRODUCTO_6]; 

let carrito = [];

const CONTAINER_PROD = document.getElementById("containerProd");

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
                    <button class="btn btn-primary" id="boton${producto.id}"> Add to cart </button>
                </div>
            </div>
        `;
        ROW.appendChild(card);
        
            const BUTTON = document.getElementById(`boton${producto.id}`);
            BUTTON.addEventListener("click", () =>{
                addToCart(producto.id);
            });
    });
    CONTAINER_PROD.appendChild(ROW);
}

PROD_DEV();

const CONTAINER_C = document.getElementById("containerCart");

const updateCartHTML = () =>{
    CONTAINER_C.innerHTML = "";
    carrito.forEach(producto =>{
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${producto.img}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${producto.articulo}</h5>
                        <p class="card-text">Price: $${producto.precio}</p>
                        <p class="card-text">Quantity: ${producto.cantidad}</p>
                        <button class="btn btn-danger" id="removeBtn${producto.id}"> Remove </button>
                    </div>
                </div>
            </div>
            </div>
        `;
        
        CONTAINER_C.appendChild(cartItem);

        const removeBtn = document.getElementById(`removeBtn${producto.id}`);
        removeBtn.addEventListener("click", () => {
            removeFromCart(producto.id);
        });
    });
};

const addToCart = (id) =>{
    const addedProd = carrito.find(producto => producto.id === id);
    if(addedProd) {
        addedProd.cantidad++;
    }else{
        const producto = PRODUCTOS.find(producto => producto.id === id);
        carrito.push({ ...producto, cantidad: 1});
    }
    updateCartHTML();
};

const removeFromCart = (id) => {
    const index = carrito.findIndex(producto => producto.id === id);
    if (index !== -1) {
        const removedProd = carrito[index];
        if (removedProd.cantidad > 1) {
            removedProd.cantidad--;
        } else {
            carrito.splice(index, 1);
        }

        updateCartHTML();
    }
};

updateCartHTML();





