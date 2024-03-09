
const productos = [
    {id:1, nombre:"AMD Ryzen 5 5600G", imagen: "../multi/ryzen5.jpg" , categoria:"Procesador", precio:201530},
    {id:2, nombre:"Intel Core i7 12700F",imagen: "../multi/intelcorei7.png" , categoria:"Procesador", precio:432999},
    {id:3, nombre:"AMD Ryzen 7 5800X",imagen: "../multi/ryzen7.jpeg" ,categoria:"Procesador", precio:360000},
    {id:4, nombre:"Monitor Samsung 27",imagen: "../multi/monitorSamsung1.webp", categoria:"Monitor", precio:219900},
    {id:5, nombre:"Monitor Samsung 24 Curvo" ,imagen: "../multi/samsungCurvo.jpg" ,categoria:"Monitor", precio:261500},
    {id:6, nombre:"Monitor Gamer LG 27",imagen: "../multi/monitorLG.jpg" ,categoria:"Monitor", precio:355900},
    {id:7, nombre:"Teclado Mecanico Redragon", imagen: "../multi/teclado.jpg" ,categoria:"Periferico", precio:39130},
    {id:8, nombre:"Auriculares Redragon", imagen: "../multi/auriculares.jpeg" ,categoria:"Periferico", precio: 21999},
    {id:9, nombre:"Mouse Redragon", imagen: "../multi/mouse.png" ,categoria:"Periferico", precio: 25740}
    ]
console.log(productos);

const guardarProductosLS = (productos)=>{
    localStorage.setItem("productos", JSON.stringify(productos));
}

const obtenerProductosLS =()=>{
    return JSON.parse(localStorage.getItem("productos")) || [];
}

const guardarCarritoLS = (productos) => {
    localStorage.setItem("carrito", JSON.stringify(productos));
}

const obtenerCarritoLS = () => {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

const obtenerIdProductoLS =()=>{
    return JSON.parse(localStorage.getItem("producto")) || 0;
}

const obtenerIdCategoriaLS =()=>{
    return JSON.parse(localStorage.getItem("categoria")) || "todos";
}

const cantTotalProductos = () => {
    const carrito = obtenerCarritoLS();

    return carrito.length; 
}

const sumaTotalProductos = () => {
    const carrito = obtenerCarritoLS();
    
    return carrito.reduce((acumulador, item) => acumulador += item.precio, 0);
}
const eliminarCarrito = () => {
    localStorage.removeItem("carrito");
    
    renderCarrito();
    renderBotonCarrito();
}

const confirmacionEliminarCarrito = () => {
    Swal.fire({
        title: "Estas seguro?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Eliminar!",
        cancelButtonText: "Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
            eliminarCarrito();
          Swal.fire({
            title: "Eliminado!",
            text: "Su carrito ha sido eliminado.",
            icon: "success"
          });
          notificacion("Carrito Eliminado!");
        }
      });
}


const renderTotalCarrito = ()=>{
    document.getElementById("totalCarrito").innerHTML = cantTotalProductos();
}

const verProducto = (id) => {
    localStorage.setItem("producto", JSON.stringify(id));
}

const verProductosPorCategoria = (id) => {
    localStorage.setItem("categoria", JSON.stringify(id));
}

const buscarProducto = () => {
    const productos = obtenerProductosLS();
    const id = obtenerIdProductoLS();
    const producto = productos.find(item => item.id===id);
    
    return producto;
}

const agregarProductoCarrito = () =>{
    const producto = buscarProducto();
    const carrito = obtenerCarritoLS(); 
    carrito.push(producto);
    guardarCarritoLS(carrito);
    renderBotonCarrito();
    notificacion("Producto Agregado!");
}

const eliminarProductoCarrito = (id) => {
    const carrito = obtenerCarritoLS();
    const carritoActualizado = carrito.filter(item => item.id != id);
    guardarCarritoLS(carritoActualizado);
    renderCarrito();
    renderBotonCarrito();
    notificacion("Producto Eliminado!");
}

const finalizarCompra = () => {
    Swal.fire({
        title: "Gracias por tu Compra!",
        text: "El total a pagar es $" + sumaTotalProductos() + " pesos.",
        imageUrl: "https://i.pinimg.com/736x/30/27/bb/3027bb63aa7e82fe11e7268179820b70.jpg",
        imageWidth: 160,
        imageAlt: "MF",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Aceptar",
        cancelButtonText: "Volver a la tienda"
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarCarrito();
                notificacion("Gracias por su compra!");
            }
        });
}


const notificacion = (texto) => {
    Swal.fire({
        position: "top-end",
        title: texto,
        showConfirmButton: false,
        timer: 1000
    });
}


const renderBotonCarrito = () => {
    document.getElementById("totalCarrito").innerHTML = cantTotalProductos();
}


guardarProductosLS(productos);

/*
// //Con ruta relativa, consuminedo el archivo .json
 fetch('./arrayProductos.json') 
.then(respuesta => respuesta.json())
.then(productos => {
   guardarProductosLS(productos);
})
*/




















