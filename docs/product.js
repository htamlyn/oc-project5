
const productName = document.getElementById('productName');
const productPrice = document.getElementById('productPrice');
const productImage = document.getElementById('productImage');
const productDescription = document.getElementById('productDescription');
const productColour = document.getElementById('select color');
const productId = document.getElementById('productId')

const getProduct = async () => {
    try{
        const res = await fetch("http://localhost:3000/api/teddies/5be9c8541c9d440000665243");
        const data = await res.json();
        console.log(data);
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
    } catch(e){
        console.log('error')
    }
}

getProduct();


