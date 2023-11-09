const shopContent = document.getElementById("shopContent");

const productos = [
    {
        id: 1,
        nombre: "Zapatillas adidas Running Duramo",
        precio: 64900,
        talles: [40, 41, 42],
        imagen: "https://media.solodeportes.com.ar/media/catalog/product/cache/faae2c37ab1d315e4b697a7f62b421b7/z/a/zapatillas-running-adidas-duramo-10-sl-azul-100010gw4080001-1.jpg",
    },
    {
        id: 2,
        nombre: "Zapatillas Racer Tr21 adidas",
        precio: 55500,
        talles: [40, 41, 42],
        imagen: "https://media.solodeportes.com.ar/media/catalog/product/cache/7c4f9b393f0b8cb75f2b74fe5e9e52aa/z/a/zapatillas-adidas-racer-tr21-ni-o-ni-a-azul-100010gw6603001-1.jpg",
    },
    {
        id: 3,
        nombre: "Pelota Basquet N7 Molten Bg4500",
        precio: 107400,
        imagen: "https://i.pinimg.com/1200x/e7/7c/eb/e77ceb84c1d3a7942deb3a7ec0d2d427.jpg",
    },
    {
        id: 4,
        nombre: "Pelota Helicoidal 78 Sport 78 Tienda Oficial",
        precio: 17800,
        imagen: "https://www.digitalsport.com.ar/files/products/64a3352c94acd-625010-500x500.jpg",
    },
    {
        id: 5,
        nombre: "Pelota Afa22 Pro adidas Sport 78 Tienda Oficial",
        precio: 84500,
        imagen: "https://www.digitalsport.com.ar/files/products/64638860062a7-573040-500x500.jpg",
    },
    {
        id: 6,
        nombre: "PELOTA RWC 2023 GILBERT mundial",
        precio: 39800,
        imagen: "https://d2izjnmtylvtfh.cloudfront.net/27643081-large_default/pelota-de-rugby-gilbert-nro-5-mundial-francia.jpg",
    },
    {
        id: 7,
        nombre: "PELOTA AL HILM FINAL QATAR 2022",
        precio: 84500,
        imagen: "https://www.digitalsport.com.ar/files/products/6419c8e08b74f-578521-500x500.jpg",
    },
    {
        id: 8,
        nombre: "Pelota oficial Mundial 2022",
        precio: 39400,
        imagen: "https://static.eldiario.es/clip/53508088-b292-417d-a8dd-b8f8f1dc8439_source-aspect-ratio_default_0.jpg",
    },
    {
        id: 9,
        nombre: "Remera  De Los Pumas Granadero ",
        precio: 12900,
        talles: ["S", "M", "XL"],
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsAFk1X7DdKc6ky4YMuZYBSWLfhteg-0N0oFQmQwJ-gP1g5GjFocWrunQADfFCSxjfqso&usqp=CAU",
    },
    {
        id: 10,
        nombre: "Camiseta De Rugby Los Pumas Para Niños",
        precio: 15500,
        talles: ["S", "M", "XL"],
        imagen: "https://d3ugyf2ht6aenh.cloudfront.net/stores/473/866/products/d1-5858f69f9e92ca249f16905804481007-240-0.jpg",
    },
    {
        id: 11,
        nombre: "Remera Essentials adidas 2023",
        precio: 16400,
        talles: ["S", "M", "XL"],
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb6PzbLhhshIy_bW2Ol9M80e6joTuMjQY3ig&usqp=CAU",
    },
    {
        id: 12,
        nombre: "Remera Urbana Nike Futura ",
        precio: 19900,
        talles: ["S", "M", "XL"],
        imagen: "https://www.dexter.com.ar/on/demandware.static/-/Sites-365-dabra-catalog/default/dwa73e312e/products/NI86F939-695/NI86F939-695-1.JPG",
    },
    {
        id: 13,
        nombre: "Camiseta Fútbol Puma Individualcup",
        precio: 15500,
        talles: ["S", "M", "XL"],
        imagen: "https://media.solodeportes.com.ar/media/catalog/product/cache/7c4f9b393f0b8cb75f2b74fe5e9e52aa/r/e/remera-de-futbol-puma-individualcup-negra-640020658289050-1.jpg",
    },
    {
        id: 14,
        nombre: "Remera Topper  Hombre 2023",
        precio: 16400,
        talles: ["S", "M", "XL"],
        imagen: "https://www.bompie.com.ar/media/catalog/product/cache/1e7c11b43132c034d445b386916b52f7/2/-/2-165599_5.jpg",
    },
];
let carrito = [];

productos.forEach((product) => {
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
    <img src="${product.imagen}">
    <h3>${product.nombre}</h3>
    <p class="price">$${product.precio} </p>`;
    shopContent.append(content);

    let comprar = document.createElement("button");

    comprar.innerText = "Agregar al Carrito";
    comprar.className = "comprar";

    content.append(comprar);
});
