
const urlJSON = './src/productos.json';
/*Obtenemos los valores de la url*/
const productString = window.location.search.substring(1);
/**Dividimos el string segun los parametros*/
const productValues = productString.split('?');
/*sacamos el =*/
debugger
const cleanedValues = productValues.map(element => {
    const data = element.split('=');
    return data[1];
})
/*asignamos los valores para nuestro ID y url*/
const id = cleanedValues[0];
const imgUrl = cleanedValues[1]+'?hmac='+cleanedValues[2];
/*Variables para la ubicacion en el HTML*/
const $productContainer = document.querySelector('.product--container');

(async function load(){
/**Traemos los datos del producto desde el archivo JSON*/
async function searchProduct(url,productId) {
    const response = await fetch(url);
    const data = await response.json();
    /*buscamos el producto*/
    const productData = data.productos.map(producto => {
        if (producto.id === productId) {
            return producto;
        }
        
    });
    /*Devolvemos el producto*/
    return productData;
    
}
/**template para insertar la info del producto */
function productTemplate(item) {
    return (
        `<div class="product--item">
        
        <div class="product--random--img">
            <img src="${item.imgUrl}" alt="random--img">
        </div>
        <div class="product--info">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <button class="btnComprar" >Comprar</button>
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
/*Traemos la info del producto*/
const productData = await searchProduct(urlJSON,id);

productData[0].imgUrl = imgUrl;
/**Insertamos la info en la web */
insertHTML(productData,productTemplate,$productContainer);

})()
