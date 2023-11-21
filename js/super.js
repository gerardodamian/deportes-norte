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
            let li = document.createElement("li");
            li.textContent = results[i].nombre;
            resultsContainer.appendChild(li);
        }
    } else {
        let li = document.createElement("li");
        li.textContent = "No se encontró el artículo: " + query;
        resultsContainer.appendChild(li);
    }

    resultsContainer.style.display = results.length > 0 ? "block" : "none";
}


productos.forEach((product) => {
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
                cantidad: product.cantidad,
            });
            console.log(carrito);
            console.log(carrito.length);
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
