// Clase Product con un constructor para la creacion de productos
class Product {
  id;
  img;
  title;
  store;
  price;
  constructor(id, img, title, store, price) {
    this.id = id;
    this.img = img;
    this.title = title;
    this.store = store;
    this.price = price;
  };
}

// Listado de todos los productos para el catalogo
const products = [
  {
    id: 1,
    img: "img/choritosalachalaca.png",
    title:
      'Choritos a la chalaca',
    store: "Entrada",
    price: 30,
  },

  {
    id: 2,
    img: "img/conchitasalaparmesana.jpg",
    title:
      "Conchitas a la Parmesana",
    store: "Entrada",
    price: 41,
  },

  {
    id: 3,
    img: "img/tequeñosdequeso.jpg",
    title: 'Tequeños de Queso',
    store: "Entrada",
    price: 26,
  },

  {
    id: 4,
    img: "img/arroz.jpg",
    title: 'Arroz con Mariscos',
    store: "Fondo",
    price: 49,
  },

  {
    id: 5,
    img: "img/ceviche.jpg",
    title: 'Ceviche del Dia',
    store: "Fondo",
    price: 45,
  },

  {
    id: 6,
    img: "img/parihuela.jpg",
    title:'Parihuela',
    store: "Fondo",
    price: 58,
  },

  {
    id: 7,
    img: "img/Inca_kola.png",
    title: 'Inca kola',
    store: "Bebida",
    price: 6.50,
  },
  {
    id: 8,
    img: "img/Coca_cola.png",
    title: 'Coca Cola',
    store: "Bebida",
    price: 6.50,
  },
  {
    id: 9,
    img: "img/fanta.jpg",
    title: 'Fanta',
    store: "Bebida",
    price: 6.50,
  },
];

// Convertimos todos nuestros productos en JSON a la clase de Product
const productsInstance = products.map(product => 
  new Product(product.id, product.img, product.title, product.store, product.price)
);

// Arreglo para el carrito de compras
let products_car = [];

// Función para la creacion de cartas dinamicas para los productos
function createProductCard(product) {
  return `
      <div class="col-md-6 col-lg-4 mb-4 d-flex">
          <div class="card flex-fill tamano">
              <img src="${product.img}" class="card-img-top" alt="${product.title}" />
              <div class="card-body">
                  <p class="card-title">${product.title}</p>
                  <p class="card-text">${product.store}</p>
                  <p class="card-text">S/ ${product.price}</p>
                  <a href="/detalle.html?id=${product.id}" class="btn btn-primary" target="blank">Ver Detalle</a>
                  <a class="btn btn-secondary" onClick="addCar('${product.id}', '${product.img}', '${product.title}', '${product.price}')">Enviar Carrito</a>
              </div>
          </div>
      </div>
  `;
}

// Aqui se crean las diversas cartas para los producto
$(document).ready(function() {
  let $container = $('#product-container');
  if ($container.length) {
      let htmlContent = '';
      productsInstance.forEach((product) => {
          htmlContent += createProductCard(product);
      });
      $container.html(htmlContent);
  }
});

let priceTotal = 0;

// Función para las cartas para el carrito
function addCar(id, img, title, price) {

  // Crea un nuevo div para el carrito
  let productCar = $("#product-carrito");
  let newDiv = $("<div></div>").addClass("cart-item");

  // Asignamos un id al nuevo div
  let divId = "div-" + id;

  // variable para guardar la cantidad o inicializarlo
  let amount = 0;

  // Capturamos el elemento para comprobar si existe o no con el divId creado
  let exists = products_car.filter(product => product.id == divId)

  // Verificamos la existencia del div para que no se repita
  if (exists.length) {
    // Si existe el div con el producto en el carrito solo editamos la cantidad
    let divContainer = $("#" + exists[0].id);
    let pContainer = divContainer.find("p").eq(1);
    let amountAct = exists[0].amount;
    // Se modifica y se agrega un mas al contador
    let newAmount = amountAct + 1;
    exists[0].amount = newAmount;
    // Se actualiza la vista
    pContainer.text(`Cantidad : ${newAmount}`);
  } else {
    // Agregando el producto al arreglo del carrito en un JSON
    let productAdd = {
      id: divId,
      imagen: img,
      title: title,
      price: price,
      amount: (amount + 1)
    }

    // Se agrega el producto en el arreglo del carrito
    products_car.push(productAdd);

    // Si no existe se asigna el id y se crea la carta
    newDiv.attr("id", productAdd.id);
    newDiv.html(`
      <div class="card">
        <img src="${productAdd.imagen}" class="card-img-top" alt="${productAdd.title}" />
        <div class="card-body">
          <p class="card-text">S/ ${productAdd.price}</p>
          <p id="amount" class="card-text">Cantidad : ${productAdd.amount}</p>
          <a class="btn btn-danger" onClick="deleteProduct('${productAdd.id}', '${productAdd.price}')">Quitar</a>
        </div>
      </div>
    `);
    // Agrega el nuevo div al carrito
    productCar.append(newDiv);
  }

  // Actualiza el monto a pagar al final con todos los precios del carrito
  let divPrice = $("#price");
  let pContainerPrice = divPrice.find("p").eq(2);
  let productPrice = parseFloat(price);
  // Se suma el precio del producto

  priceTotal = priceTotal + productPrice;

  let pContainerAmount = divPrice.find("p").eq(1);
  let amountAct = parseInt(pContainerAmount.text().split(":")[1].trim());
  let newAmount = amountAct + 1;

  // Se actualiza el monto para la visualizacion
  pContainerPrice.text(`Monto : S/ ${priceTotal}`);
  pContainerAmount.text(`Cantidad : ${newAmount}`);
}

function deleteProduct(divId, price) {

  // Bucamos el producto en el arreglo del carrito
  let exists = products_car.filter(product => product.id == divId)

  // Identificamos por medio del id del objeto del producto y buscamos el 'p' donde indicamos la cantidad
  let divContainer = $("#" + exists[0].id);
  let pContainer = divContainer.find("p").eq(1);

  // Obtenemos la cantidad del producto que esta registrado
  let amountAct = exists[0].amount;

  // Actualizamos la cantidad para actualizar en el objeto del arreglo
  let newAmount = amountAct - 1;
  exists[0].amount = newAmount
  pContainer.text(`Cantidad : ${exists[0].amount}`);

  // Actualizamos todo el precio total que se debe pagar
  let divPrice = $("#price");
  let pContainerAmount = divPrice.find("p").eq(1);
  let pContainerPrice = divPrice.find("p").eq(2);
  let amountAct2 = parseInt(pContainerAmount.text().split(":")[1].trim());
  let newAmount2 = amountAct2 - 1;

  pContainerAmount.text(`Cantidad : ${newAmount2}`);

  priceTotal = priceTotal - price;

  pContainerPrice.text(`Monto : S/ ${priceTotal}`);

  // Si la cantidad en las tarjetas del carrito llega a cero quitamos la carta y actualizamos el arreglo del carrito
  if (exists[0].amount <= 0) {
    products_car = products_car.filter(producto => producto.amount !== 0);
    divContainer.remove();
  }
}

