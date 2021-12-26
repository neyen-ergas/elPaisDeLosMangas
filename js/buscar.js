let buscador;
let prodBusqueda;
let catalogo;
let productos = [];


document.addEventListener("DOMContentLoaded", function(){
    buscador = document.getElementById("buscador-text")
    catalogo = document.getElementById("producto")
    cargarCatalogo();
    filtrar();
    
    

})

function cargarCatalogo(){
    
    $.ajax({
        url: "../catalogo.json",
        success: function(data){
            data.forEach(prod => {
                productos.push(data)
                console.log(data.titulo)
            });
            
            
        },
        error: function (error) {
            console.log("ERROR")
        }
    });

    return productos;
}

function filtrar(){
    
    catalogo.innerHTML=' ';
    let texto= buscador.value.toLowerCase();
    for(let prod of productos){
        
        let titulo = prod.titulo.toLowerCase();
        if(titulo.indexOf(texto) !== -1){
            htmlCatalogo(prod)
        }

            if(contCatalogo.innerHTML=== ''){
                contCatalogo.innerHTML +=`
                <li>Producto no encontrado..</li>
                `
            }
    }
    buscador.addEventListener('keyup',filtrar())
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


