const menuButton = document.getElementById('menuBtn');
const menuLinks = document.getElementById('menuLinks');
const addToBasketBtn = document.getElementById('addItemBtn');
const colorSelect = document.getElementById('select color');
const qtySelect = document.getElementById('number');
const basketTotal = document.getElementById('basketTotal');
const warning = document.getElementById('warning');

// Open and close hamburger
menuButton.addEventListener('click', () => {
    if (menuLinks.classList.contains('hidden') == true) {
        menuLinks.classList.remove('hidden');
    } else {
        menuLinks.classList.add('hidden');
    }
});

function updateTotalDisplay() {
    let currentProducts = localStorage.getItem('basketProduct');
    if (currentProducts !== null) {
        currentProducts = currentProducts.replace(/},{/g, "},,{");
        currentProducts = currentProducts ? currentProducts.split(',,') : [];
        let parsedSelectedProduct = []
        for (item of currentProducts) {
            let parsedItem = JSON.parse(item);
            parsedSelectedProduct.push(parsedItem);
        }
        let basketQtys = [];
        for (item of parsedSelectedProduct) {
            basketQtys.push(parseInt(item.qty));
        }
        let total = basketQtys.reduce((a, b) => a + b, 0);
        basketTotal.classList.remove('hidden');
        basketTotal.innerText = total;
        if (basketTotal.innerText == 0) {
            basketTotal.classList.add('hidden');
        }
    }
}

updateTotalDisplay();

function createProduct() {
    // Create the Product
    let product = {
        'name': productName.innerText,
        'color': productColour.value,
        'qty': qtySelect.value,
        'price': productPrice.innerText.slice(2),
        'id': productId.innerText
    };
    // Get current local storage
    let currentProducts = localStorage.getItem('basketProduct');
    // Create new Products array ready
    let newProductsList = [];
    if (currentProducts !== null) {
        currentProducts = currentProducts.replace(/},{/g, "},,{");
        currentProducts = currentProducts ? currentProducts.split(',,') : [];
        // Make local storage useable
        let parsedSelectedProduct = []
        for (item of currentProducts) {
            let parsedItem = JSON.parse(item);
            parsedSelectedProduct.push(parsedItem);
        }

        // Check for items to update
        let itemUpdated = false
        for (item of parsedSelectedProduct) {
            // If the current selection matches an existing product
            if (product.name == item.name && product.color == item.color) {
                // Update the items quantity by added the current selection
                item.qty = parseInt(item.qty) + parseInt(product.qty)
                itemUpdated = true
            }
        }
        // If an item has been updated - dont add new current item
        if (itemUpdated !== false) {
            // Re-stringify everything in the list
            for (item of parsedSelectedProduct) {
                item = JSON.stringify(item);
                newProductsList.push(item);
            }
            // Set to local storage and stop checking
            localStorage.setItem('basketProduct', newProductsList);
        } else {
            // Stringify the product for local storage
            let jsonProduct = JSON.stringify(product);
            //     // Add to the new products array
            newProductsList.push(jsonProduct);
            // Re-stringify each item
            for (item of parsedSelectedProduct) {
                item = JSON.stringify(item);
                newProductsList.push(item);
            }
            // Set to local storage and stop checking
            localStorage.setItem('basketProduct', newProductsList);
        }
    } else {
        // Stringify the product for local storage
        let jsonProduct = JSON.stringify(product);
        //     // Add to the new products array
        newProductsList.push(jsonProduct);
        localStorage.setItem('basketProduct', newProductsList);
    }
}

// Function to display added to basket message and revert to original content
function basketButtonDisplay() {
    addToBasketBtn.value = 'Added!';
    addToBasketBtn.classList.remove('bg-rose-800', 'hover:bg-rose-500');
    addToBasketBtn.classList.add('bg-violet-400');
    function revert() {
        addToBasketBtn.value = 'Add to Basket';
        addToBasketBtn.classList.add('bg-rose-800')
        addToBasketBtn.classList.remove('bg-violet-400')
    };
    setTimeout(revert, 1500);
}

function addBorder(element) {
    element.classList.add('border-rose-800', 'border-2')
    function removeBorder() {
        element.classList.remove('border-rose-800', 'border-2')
    }
    setTimeout(removeBorder, 3000);
}

function warn() {
    warning.classList.remove('hidden')
    function removeWarn() {
        warning.classList.add('hidden')
    }
    setTimeout(removeWarn, 3000);
}

// Button to add to basket if correct selections have been made
addToBasketBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (colorSelect.value === "" && qtySelect.value === '0') {
        console.log('select a color and quantity');
        addBorder(qtySelect);
        addBorder(colorSelect);
        warn();
    } else if (colorSelect.value === "") {
        addBorder(colorSelect);
        warn();
    } else if (qtySelect.value === '0') {
        addBorder(qtySelect);
        warn();
    } else {
        createProduct();
        updateTotalDisplay();
        basketButtonDisplay();
    }
});

