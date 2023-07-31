
let carrito = []
let stock = []

stock.push(new Producto('GTA V', 1500));
stock.push(new Producto('Resident Evil 4', 13000));
stock.push(new Producto('Race 07', 500));
stock.push(new Producto('FIFA 23', 12000));
stock.push(new Producto('Rocket League', 350));
stock.push(new Producto('Farming Simulator 23', 5000));
stock.push(new Producto('Far Cry 6', 8000));
stock.push(new Producto('Elden Ring', 9000));
stock.push(new Producto('F1 2023', 12000));
stock.push(new Producto('Mafia 2', 700));

localStorage.setItem('stock', JSON.stringify(stock));


const tabla = document.getElementById('items');
const selectProductos = document.getElementById('productos');
const btnAgregar = document.getElementById('agregar');
const btnOrdenar = document.getElementById('ordenar');
const btnVaciar = document.getElementById('vaciar');
const total = document.getElementById('total');


function traerItems() {

  stock = JSON.parse(localStorage.getItem('stock')) || [];
  carrito = JSON.parse(localStorage.getItem('carrito')) || [];


  popularDropdown();
}

function popularDropdown() {
  stock.forEach(({ nombre, precio }, index) => {

    let option = document.createElement('option');
    option.textContent = `${nombre}:${precio}`;
    option.value = index;
    selectProductos.appendChild(option);
  });
}

function actualizarTablaCarrito() {
  tabla.innerHTML = '';
  total.innerText = 0;
  carrito.forEach((item, index) => {
    newRow(item, index);
  });
}

function newRow(item, index) {
  const row = document.createElement('tr');
  let td = document.createElement('td');

  td.classList.add('text-white');
  td.textContent = item.producto.nombre;
  row.appendChild(td);

  td.classList.add('text-white');
  td = document.createElement('td');
  td.textContent = item.cantidad;
  row.appendChild(td);

  td.classList.add('text-white');
  td = document.createElement('td');
  td.textContent = item.producto.precio;
  row.appendChild(td);

  td = document.createElement('td');
  const btnEliminar = document.createElement('button');
  btnEliminar.classList.add('btn', 'btn-danger');
  btnEliminar.textContent = 'Remove';


  btnEliminar.onclick = () => {
    carrito.splice(index, 1);
    actualizarTablaCarrito();
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }

  td.appendChild(btnEliminar);
  row.appendChild(td);
  tabla.appendChild(row);

  total.textContent = carrito.reduce((acc, item) => acc + item.producto.precio * item.cantidad, 0);
}

function vaciarcarrito() {
  swal.fire({
    title: '¿Está seguro de vaciar el carrito?',
    confirmButtontext: 'Si',
    showCancelButton: true,
    cancelButtonText: 'No', 
  }).then((result) =>  {
    if (result.isConfirmed) {
      carrito = [];
      localStorage.setItem('carrito', JSON.stringfly(carrito));
      actualizarTablaCarrito();
    }
  });
}


function allEventListeners() {

  document.addEventListener('DOMContentLoaded', traerItems);

  btnAgregar.addEventListener('submit', (e) => {
    e.preventDefault();
    const productoSeleccionado = stock[+selectProductos.value];
    const indiceCarrito = carrito.findIndex((item) => item.producto.nombre === productoSeleccionado.nombre);


    if (indiceCarrito !== -1) {
      carrito[indiceCarrito].cantidad++;
    } else {
      const item = new Item(productoSeleccionado, 1);

      carrito.push(item);
    }

    actualizarTablaCarrito();
    localStorage.setItem('carrito', JSON.stringify(carrito));

  });

  btnVaciar.addEventListener('click' , vaciarcarrito);

  
}

allEventListeners();