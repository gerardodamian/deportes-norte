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
        let li = document.createElement("LI");
        li.textContent = "No se encontró el artículo: " + query;
        resultsContainer.appendChild(li);
        alert(li.textContent);
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
        saveLocal();
    }
};



productos.map((product) => {
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
        <img src="${product.img}">
        <h3>${product.nombre}</h3>
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
            saveLocal();
        }
    });
});

const saveLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
};

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
