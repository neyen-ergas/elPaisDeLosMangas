var contCatalogo;


function cargarCatalogo(){
    const catalogoElement = document.getElementById('producto');
    catalogoElement.innerHTML = " ";
    let html = " ";
    window.listaCatalogo.forEach(prod => {
        html = html + htmlCatalogo(prod);
    });
    catalogoElement.innerHTML = html;
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


