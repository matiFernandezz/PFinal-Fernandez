function renderProductos(){
    const productos = obtenerProductosLS();
    const categoria = obtenerIdCategoriaLS();
    
    const productosFiltadros = categoria === 'todos' ? productos : productos.filter (item=> item.categoria ===categoria);
    
    let contenido = "";

    for (const producto of productosFiltadros) {
        contenido += 
         `<div class="col-md-4 my-5 text-center" >
            <img src="${producto.imagen}" alt="${producto.nombre}" height="240" />
             <p class="colorFuente roboto-bold">${producto.nombre}</p>
            <a href="producto.html"> <button onclick="verProducto(${producto.id});" class="btn colorFondoNav colorFuente">Ver Producto </button></a>
        </div>`;
        
    }
    document.getElementById("productos").innerHTML = contenido;

}


renderProductos();
renderBotonCarrito();


