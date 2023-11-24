const pintarCarrito = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");

    modalContainer.append(modalHeader);

    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `
        <h2 class="modal-header-title">Carrito 🛒</h2>
        <button class="modal-header-button-clear">Limpiar Carrito 🗑️</button>
    `;
    modalContainer.append(modalHeader);

    const modalbutton = document.createElement("h1");

    modalbutton.innerText = "❎";
    modalbutton.className = "modal-header-button";

    modalbutton.addEventListener("click", () => {
        modalContainer.style.display = "none";
    });

    modalHeader.append(modalbutton);
    const clearCartButton = modalHeader.querySelector(
        ".modal-header-button-clear"
    );
    clearCartButton.addEventListener("click", () => {
        limpiarCarrito();
        pintarCarrito();
    });

    carrito.forEach((product) => {
        let carritoContent = document.createElement("div");
        carritoContent.className = "modal-content";
        carritoContent.innerHTML = `
        <img src="${product.img}">
        <h3>${product.nombre}</h3>
        <p>$${product.precio}</p>
        <span class="restar"> <i class="fa-solid fa-square-minus fa-2xl" style="color:#0b23adf1 ;"></i> </span>
        <p>${product.cantidad}</p>
        <span class="sumar"><i class="fa-solid fa-square-plus fa-2xl" style="color: #0b23adf1;"></i>  </span>
        <p>Total:$${product.cantidad * product.precio}</p>
        <span class="delete-product"><i class="fa-solid fa-trash-can fa-2xl" style="color: #e6e9ef;"></i> </span>
        `;

        modalContainer.append(carritoContent);

        let restar = carritoContent.querySelector(".restar");

        restar.addEventListener("click", () => {
            if (product.cantidad !== 1) {
                product.cantidad--;
            }
            saveLocal();
            pintarCarrito();
        });

        let sumar = carritoContent.querySelector(".sumar");
        sumar.addEventListener("click", () => {
            product.cantidad++;
            saveLocal();
            pintarCarrito();
        });

        let eliminar = carritoContent.querySelector(".delete-product");

        eliminar.addEventListener("click", () => {
            eliminarProducto(product.id);
        });
    });
    const limpiarCarrito = () => {
        carrito = [];
        carritoCounter();
        saveLocal();
    };

    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

    const totalBuying = document.createElement("div");
    totalBuying.className = "total-content";
    totalBuying.innerHTML = `Total a pagar: $${total} `;
    modalContainer.append(totalBuying);
};
const limpiarLocalStorageButton = document.getElementById(
    "limpiarLocalStorage"
);

limpiarLocalStorageButton.addEventListener("click", () => {
    localStorage.clear();
    carrito = [];
    carritoCounter();
});

verCarrito.addEventListener("click", pintarCarrito);

const eliminarProducto = (id) => {
    const foundId = carrito.find((element) => element.id === id);

    console.log(foundId);

    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId;
    });

    carritoCounter();
    saveLocal();
    pintarCarrito();
};

const carritoCounter = () => {
    cantidadCarrito.style.display = "block";

    for (let i = 0; i < carrito.length; i++) {
        carrito[i].cantidad;
    }

    const carritoLength = carrito.length;

    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));

    cantidadCarrito.innerText = JSON.parse(
        localStorage.getItem("carritoLength")
    );
};

carritoCounter();
console.log(carrito);
const limpiarCarritoButton = document.getElementById("limpiarCarrito");
