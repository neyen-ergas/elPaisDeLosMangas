let contCatalogo;


window.onload = function (){

    contCatalogo = document.getElementById("producto")

    cargarCatalogo();

}

function cargarCatalogo(){
    contCatalogo.innerHTML = " ";
    let html = " ";
    $.ajax({
        url: "catalogo.json",
        success: function(data){
            data.forEach(prod => {
                html = html + htmlCatalogo(prod);
            });
            contCatalogo.innerHTML = html;
            
        },
        error: function (error) {
            console.log("ERROR")
        }
    });

    
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


