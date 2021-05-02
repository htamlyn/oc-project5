
const productName = document.getElementById('productName');
const productPrice = document.getElementById('productPrice');
const productImage = document.getElementById('productImage');
const productDescription = document.getElementById('productDescription');
const productColour = document.getElementById('select color');
const productId = document.getElementById('productId')

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')
console.log(id)

let data = {}

const getProduct = async (fetch) => {
    try{
        const res = await fetch(`http://localhost:3000/api/teddies/${id}`);
        data = await res.json();
        displayProduct();
    } catch(e){
        console.log('error')
    }
}

function displayProduct() {
    productName.innerText = data.name;
    productPrice.innerText = `$ ${data.price / 100}`;
    productImage.src = data.imageUrl;
    productDescription.innerText = data.description;
    productId.innerText = data._id
    const colors = data.colors;
    for (color of colors) {
        let newOption = document.createElement('option');
        newOption.innerText = color;
        newOption.value = color;
        productColour.appendChild(newOption);
    }
}

getProduct(fetch);





