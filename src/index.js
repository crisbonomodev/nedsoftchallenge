/*Conexion a la API para traer la imagen*/
const API = 'https://picsum.photos/200/300?random=1';
/*Seleccionamos el container donde cargaremos la imagen*/
const $imageContainer = document.querySelector('.list--wrapper');
/**Cargamos nuestro array de productos desde el archivo JSON */
const urlJSON = './src/productos.json';
/*Ubicacion del loader */
const $gifLoader = document.querySelector('.loading');



(async function load(){
    /**funcion para traer la data de la API */
    async function getData(url) {
        const data = await fetch(url);
        if (data.url) {
        return data.url;
        } else {
        throw new Error('Error en la carga de la imagen');
    }
}

async function loadProducts(url) {
    const response = await fetch(url);
    const data = await response.json();
    if (data.productos.length >0) {
        return data.productos;
    } else {
        throw new Error('No se han encontrado productos');
    }
}

/**template para insertar la info del producto */
function productTemplate(item) {
    return (
        `<div class="list--item">
        <div class="list--random--img">
            <img src="${item.imgUrl}" alt="random--img">
        </div>
        <div class="list--item--info">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <button class="btnComprar" >Ver mas</button>
        </div>
    </div>`
    )
}

function createTemplate(HTMLString) {
    const html = 
    document.implementation.createHTMLDocument();
    html.body.innerHTML = HTMLString;
    return html.body.children[0];
    
  }
//funcion para insertar el array de productos
function insertHTML(array,template,container) {
  //iteramos el array de resultados
  array.forEach((item)=> {
    //generamos el template html
    const HTMLString = template(item);
    //convertimos a HTML el string
    const itemElement = createTemplate(HTMLString);
    container.append(itemElement);

})
}
    /*Array mock con producto para ejemplo*/
    const arrayProduct = await loadProducts(urlJSON);
    /**traemos la url de la imagen para la API */
    const imgUrl = await getData(API);
    /*Ocultamos el gif de loading*/
    $gifLoader.classList.add('hide');
    /*insertamos el link de la imagen en el array. En este caso, yo ya conozco la ubicacion en en array,
    si tuviera que implementar una serie de imagenes para productos, cargaria las URL en el JSON o la BD*/
    arrayProduct[0].imgUrl = imgUrl;
    /**Insertamos la info en la lista de productos */
    insertHTML(arrayProduct,productTemplate,$imageContainer);
    /*Ponemos a escuchar el evento click del btnComprar*/
    /*Agregamos un event listener para el boton de comprar*/
    const $btnComprar = document.querySelector('.btnComprar').addEventListener('click',()=>{
        console.log('Click!');
        window.open(`./producto.html?id=${arrayProduct[0].id}?imgUrl=${arrayProduct[0].imgUrl}`);
    })
})();