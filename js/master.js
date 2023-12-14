const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const showAlert = document.getElementById("showAlert");
const cantidadCarrito = document.getElementById("cantidadCarrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function buscar() {
    let query = document.getElementById("buscar").value;

    if (query.trim() === "") {
        document.getElementById("results").style.display = "none";
        return;
    }

    let results = [];

    for (let i = 0; i < productos.length; i++) {
        if (productos[i].nombre.toLowerCase().includes(query.toLowerCase())) {
            results.push(productos[i]);
        }
    }

    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = "";

    if (results.length > 0) {
        for (let i = 0; i < results.length; i++) {
            let li = document.createElement("LI");
            li.textContent = results[i].nombre;

            let comprarDesdeBusqueda = document.createElement("button");
            comprarDesdeBusqueda.innerText = "comprar 🛒";
            comprarDesdeBusqueda.className = "comprarDesdeBusqueda";

            li.appendChild(comprarDesdeBusqueda);

            comprarDesdeBusqueda.addEventListener("click", () => {
                agregarAlCarrito(results[i]);
            });

            resultsContainer.appendChild(li);
        }
    } else {
        Swal.fire({
            title: "No se encuentra este articulo",
            showClass: {
                popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
                `,
            },
            hideClass: {
                popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
                `,
            },
        });
    }

    resultsContainer.style.display = results.length > 0 ? "block" : "none";
    let cerrarBusqueda = document.createElement("button");
    cerrarBusqueda.innerText = "Cerrar búsqueda";
    cerrarBusqueda.className = "cerrarBusqueda";

    cerrarBusqueda.addEventListener("click", () => {
        resultsContainer.style.display = "none";
        cerrarBusqueda.style.display = "none";
    });

    resultsContainer.appendChild(cerrarBusqueda);

    resultsContainer.style.display = results.length > 0 ? "block" : "none";
    cerrarBusqueda.style.display = results.length > 0 ? "block" : "none";
}

const agregarAlCarrito = (producto) => {
    const repeat = carrito.some(
        (repeatProduct) => repeatProduct.id === producto.id
    );

    if (repeat) {
        carrito.map((prod) => {
            if (prod.id === producto.id) {
                prod.cantidad++;
            }
        });
    } else {
        carrito.push({
            id: producto.id,
            img: producto.img,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 1,
        });

        carritoCounter();
        saveLocal()
            .catch((error) => {
                console.error('Error al guardar el carrito localmente:', error);
            });
    }
};

productos.map((product) => {
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
        <img src="${product.img}">
        <h3 class="nombre">${product.nombre}</h3>
        <p class="price">$${product.precio} </p>
        `;

    shopContent.append(content);

    let comprar = document.createElement("button");
    comprar.innerText = "comprar 🛒";
    comprar.className = "comprar";

    content.append(comprar);

    comprar.addEventListener("click", () => {
        const repeat = carrito.some(
            (repeatProduct) => repeatProduct.id === product.id
        );

        if (repeat) {
            carrito.map((prod) => {
                if (prod.id === product.id) {
                    prod.cantidad++;
                }
            });
        } else {
            carrito.push({
                id: product.id,
                img: product.img,
                nombre: product.nombre,
                precio: product.precio,
                cantidad: 1,
            });

            carritoCounter();
            saveLocal()
            .catch((error) => {
                console.error('Error al guardar el carrito localmente:', error);
            });
    }
});
});

const saveLocal = () => {
return new Promise((resolve, reject) => {
    try {
        localStorage.setItem("carrito", JSON.stringify(carrito));
        resolve();
    } catch (error) {
        reject(error);
    }
});
};

document.addEventListener("DOMContentLoaded", function() {
    const cargandoMensaje = document.getElementById("cargandoMensaje");

    
    mostrarMensajeCarga();

    
    setTimeout(() => {
        
        ocultarMensajeCarga();
    }, 5000);
});

function mostrarMensajeCarga() {
    const cargandoMensaje = document.getElementById("cargandoMensaje");
    cargandoMensaje.classList.remove("hidden");
}

function ocultarMensajeCarga() {
    const cargandoMensaje = document.getElementById("cargandoMensaje");
    cargandoMensaje.classList.add("hidden");
}


//carrito//
const pintarCarrito = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");

    modalContainer.append(modalHeader);

    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `
        <h2 class="modal-header-title">Carrito <i class="fa-solid fa-cart-shopping fa-xl"></i></h2>
        <button class="modal-header-button-clear">Limpiar Carrito <i class="fa-solid fa-trash-can fa-2xl" style="color: #e6e9ef;"></i></button>
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

    carrito.map((product) => {
        let carritoContent = document.createElement("div");
        carritoContent.className = "modal-content";
        carritoContent.innerHTML = `
            <img src="${product.img}">
            <h3>${product.nombre}</h3>
            <p>$${product.precio}</p>
            <span class="restar"> <i class="fa-solid fa-square-minus fa-2xl" style="color:#E58338 ;"></i> </span>
            <p>${product.cantidad}</p>
            <span class="sumar"><i class="fa-solid fa-square-plus fa-2xl" style="color: #E58338;"></i>  </span>
            <p>Total:$${product.cantidad * product.precio}</p>
            <span class="delete-product"><i class="fa-solid fa-trash-can fa-2xl" style="color: #E58338;"></i> </span>
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
        let mensajeEliminacion = document.getElementById("mensajeEliminacion");
        eliminar.addEventListener("click", () => {
            
            Swal.fire({
                title: "¿Quieres eliminar este producto?",
                text: "Este producto se eliminara de tu Carrito",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#FF990A",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, eliminar!",
            }).then((result) => {
                if (result.isConfirmed) {
                    eliminarProducto(product.id);
                    Swal.fire({
                        title: "Borrado!",
                        text: "El producto fue borrado de tu carrito.",
                        icon: "success",
                    });
                    
                } else {
                    const mensajeEliminar = document.createElement("div");
                    mensajeEliminar.className = "mensajeEliminacion";
                    mensajeEliminar.innerHTML = "El producto no se elimino";
                    modalContainer.append(mensajeEliminar);
                }
            });
           
        });
    });
    const limpiarCarrito = () => {
        localStorage.clear();
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

verCarrito.addEventListener("click", pintarCarrito);

const eliminarProducto = (id) => {
    const foundId = carrito.find(({ id: productId }) => productId === id);

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

const limpiarCarritoButton = document.getElementById("limpiarCarrito");

// formulario
let inputs = document.getElementsByClassName("formulario__input");

for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("keyup", function () {
        if (this.value.length >= 1) {
            this.nextElementSibling.classList.add("fijar");
        } else {
            this.nextElementSibling.classList.remove("fijar");
        }
    });
}
document
    .getElementById("miFormulario")
    .addEventListener("submit", function (event) {
        event.preventDefault();

        document.getElementById("mensajeExito").style.display = "block";
    });

const input = document.querySelector(".formulario__input");
input.required = " ";
