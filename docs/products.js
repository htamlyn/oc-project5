const productNames = [document.querySelector('#product1Name'), document.querySelector('#product2Name'), document.querySelector('#product3Name'), document.querySelector('#product4Name'), document.querySelector('#product5Name')];
const productPrices = [document.querySelector('#product1Price'), document.querySelector('#product2Price'), document.querySelector('#product3Price'), document.querySelector('#product4Price'), document.querySelector('#product5Price')];
const productImages = [document.querySelector('#product1Image'), document.querySelector('#product2Image'), document.querySelector('#product3Image'), document.querySelector('#product4Image'), document.querySelector('#product5Image')];
const productIds = [document.querySelector('#product1Id'), document.querySelector('#product2Id')];

const populateProduct = async () => {
    try {
        const res = await fetch("http://localhost:3000/api/teddies/");
        const data = await res.json();
        let names = [];
        let prices = [];
        let images = [];
        let ids = [];
        for (item of data) {
            names.push(item.name);
            prices.push(item.price / 100);
            images.push(item.imageUrl);
            ids.push(item._id);
        }
        console.log(ids)
        productNames.forEach((product, index) => {
            let name = names[index];
            product.innerText = name;
        })
        productPrices.forEach((product, index) => {
            let price = prices[index];
            product.innerText = `$ ${price}`;
        })
        productImages.forEach((product, index) => {
            let image = images[index];
            product.src = image;
        })
        productIds.forEach((product, index) => {
            let id = ids[index];
            product.href = `product1.html/?id=${id}`;
            console.log(product.value);
        })
    } catch (e) {
        console.log('error')
    }
}

populateProduct();

let product1 = document.getElementById('product1Id')
product1.addEventListener('click', () => {
    console.log('clicked');
    window.location.href = "product.html/?id=1"
})