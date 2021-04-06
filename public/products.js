const products = [document.querySelector('#product1Name'), document.querySelector('#product2Name')];

const populateProduct = async () => {
    try{
        const res = await fetch("http://localhost:3000/api/teddies/");
        const data = await res.json();
        console.log(data);
        for (item of data){
            console.log(item.name);
            for (product of products){
                product.innerText = item.name;
            }
        }
    } catch(e){
        console.log('error')
    }
}

populateProduct();