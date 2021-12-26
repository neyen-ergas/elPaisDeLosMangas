let listaCatalogo = [];
let listaCarrito = localStorage.listaCarrito ? JSON.parse(localStorage.listaCarrito) : [];
let parrafo;
let totalPagar;
let prodAgregados;
let searchBar = document.getElementById('searchBar');


document.addEventListener("DOMContentLoaded", function(){
    parrafo = document.getElementById("agrego")
    totalPagar = document.getElementById("totalNum")
    prodAgregados = document.getElementById("prodAgregados")
    contLista = document.getElementById("listaProd")
    agegarCatalogoLista();
    cargaCarritoPrevio();
    cargarListaPrevio()
    
})


function agegarCatalogoLista(){
    $.ajax({
        url: "catalogo.json",
        success: function(data){
            data.forEach(prod => {
                listaCatalogo.push(prod)
            });
            console.log(data)
        },
        error: function (error) {
            console.log("ERROR")
        }
    });    
}

function agregarAlCarrito(idProd){
    listaCatalogo.forEach(prod => {
        if (prod.id == idProd) {
            listaCarrito.push(prod);
            localStorage.listaCarrito = JSON.stringify(listaCarrito);
            actualizaLista();
            mostrarNotif();
        }
    });
    mostrarProdsAgregados();
}

function calcularTotal(){
    let total = 0;
    listaCarrito.forEach(prod => {
        total = total + prod.precio;
    });
    return total;
}

function modificarTotal(){
    totalPagar.textContent = " ";
    totalPagar.textContent = "$"+calcularTotal()
}

function listaProductoCantidad(){
    let productosYCantidad = [];

    listaCatalogo.forEach(prodCatalogo => {
        let cont = 0;
        let prodActual = prodCatalogo;

        listaCarrito.forEach(prodCarrito => {
            if (prodActual.id == prodCarrito.id) {
                cont = cont + 1;
            }
        });
        
        let prodCant = {producto : prodActual, cantidad : cont};
        productosYCantidad.push(prodCant);
    });
    return productosYCantidad;
    
}

function mostrarProdsAgregados(){
    let contador = listaCarrito.length;

    prodAgregados.innerHTML = `${contador}`

    if (contador>=1) {
        prodAgregados.classList.add("prodAgregados");

    }else if(contador==0){
        prodAgregados.classList.remove("prodAgregados")
    }

    modificarTotal();
}

function cargaCarritoPrevio(){
    if (listaCarrito.length>=1) {
        mostrarProdsAgregados()
        agegarCatalogoLista();
    }
}

function cargarListaPrevio(){
    if (listaCarrito.length>=1) {
        actualizaLista();
        listaProductoCantidad();
    }
}

function borrarCarrito(){
    listaCarrito.length=0;
    localStorage.listaCarrito = JSON.stringify(listaCarrito);
    mostrarProdsAgregados();
    actualizaLista();
    
}



function actualizaLista() {
    contLista.innerHTML = htmlLista()
}


function htmlLista(){
    let html = " "
    console.log(listaProductoCantidad())
    listaProductoCantidad().forEach(element => {
        if (element.cantidad>=1) {
            let nombre = element.producto.titulo;
            let cantidad = element.cantidad;
            html = html + htmlListaUnidad(nombre, cantidad);
        }
    });

    return html;
}


function htmlListaUnidad(nombre, cantidad){
    return `
        <div class="unLi mb-2">
            <span class="listaNombre">${nombre}</span>
            <span class="listaCant">${cantidad}</span>

        </div>
    `
}

function realizarCompra(){
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Compra realizada',
        showConfirmButton: false,
        timer: 1500
      })
      borrarCarrito();
    }

function mostrarNotif() {
    Swal.fire({
    title: 'Producto agregado!',
    position: "top-end",
    showConfirmButton: "false",
    timer: 1500,
    icon: "success",
    toast: "true",
        })
}
    