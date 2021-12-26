var buscador;
var prodBusqueda;
var catalogo;
var letters = "";

document.addEventListener("DOMContentLoaded", function(){
    buscador = document.getElementById("buscador-text")
    catalogo = document.getElementById("producto")
    buscador.addEventListener("keydown", filtrarCatalogo);
    cargarCatalogo(catalogo);
    dibujar(window.listaCatalogo);    
    //filtrar();
})



function filtrarCatalogo(letter){
    if(letters.length>0){
        if(letter.key === "Backspace"){
            letters = letters.slice(0, -1);
        }
    }
    if(letter.key !== "Backspace"){
        letters = letters + String.fromCharCode(letter.keyCode).toLowerCase();
    }
    productosCatalogoFiltrado = window.listaCatalogo.filter(producto => producto.titulo.toLowerCase().includes(letters));
    dibujar(productosCatalogoFiltrado);
}

function dibujar(productosCatalogo){
    catalogo.innerHTML = " ";
    let html = " ";
    productosCatalogo.forEach(prod => {
        html = html + htmlCatalogo(prod);
    });
    catalogo.innerHTML = html;
}

function htmlCatalogo(prod){
    return `
    <div class="col-3" id="${prod.id}">
    <div class="card text-center sombras">
        <img class="card img-top" src="${prod.img}" alt="sg" width="100%" height="250px">
        <div class="card-body">
            <p class= "font-weight-bold">${prod.titulo}</p>
            <p>
                <span>$${prod.precio}</span>
            </p>
            <p>
                <span>${prod.autor}</span>
            
            <p>
            <button class="btn btn-dark" id="btn-elemento"  onclick="agregarAlCarrito(${prod.id})" >Comprar</button>
            </p>
        </div>
    </div>
</div>
    </li>
    `
}







































