const checkoutBtn = document.getElementById('checkout');
const basketItemsContainer = document.getElementById('basketItemsContainer');
const lightbox = document.getElementById('lightbox');
const closeLightbox = document.getElementById('closeLightbox');
const confirmOrder = document.getElementById('confirmOrder');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const address = document.getElementById('address');
const city = document.getElementById('city');
const email = document.getElementById('email');


// Get and parse selected product options
let selectedProduct = localStorage.getItem('basketProduct');
selectedProduct = selectedProduct.replace(/},{/g, "},,{");
selectedProduct = selectedProduct ? selectedProduct.split(',,') : [];
let parsedSelectedProduct = []
for (item of selectedProduct) {
    let parsedItem = JSON.parse(item);
    parsedSelectedProduct.push(parsedItem);
}

// Create Arrays from the object information
let basketNames = [];
let basketColours = [];
let basketPrices = [];
let basketQtys = [];
let basketIds = []
for (item of parsedSelectedProduct) {
    basketNames.push(item.name);
    basketColours.push(item.color);
    basketPrices.push(item.price);
    basketQtys.push(item.qty);
    basketIds.push(item.id);
}

// If there are items in local storage, create and populate displays
if (parsedSelectedProduct.length > 0) {
    for (let i = 0; i < parsedSelectedProduct.length; i++) {
        createProductDiv();
        populateProductDiv();
    }
}

// Function creating all parts of the item display for the basket
function createProductDiv() {
    let newItem = document.createElement('div');
    newItem.classList.add('flex', 'flex-col', 'md:flex-row', 'items-center', 'justify-between', 'p-4', 'h-52', 'border-2', 'border-violet-100')
    basketItemsContainer.appendChild(newItem);
    let newItemChoices = document.createElement('div');
    newItemChoices.classList.add('md:w-3/7', 'lg:w-5/7', 'p-2', 'md:p-0')
    newItem.appendChild(newItemChoices);
    let newItemName = document.createElement('div');
    newItemName.classList.add('itemName', 'text-2xl');
    newItemChoices.appendChild(newItemName);
    let newItemId = document.createElement('span');
    newItemId.classList.add('hidden', 'itemId');
    newItemChoices.appendChild(newItemId);
    let newItemColour = document.createElement('div');
    newItemColour.classList.add('itemColour');
    newItemChoices.appendChild(newItemColour);
    let newQtysContainer = document.createElement('div');
    newQtysContainer.classList.add('text-center', 'md:w-2/7', 'lg:w-1/7', 'p-2', 'md:p-0', 'border-l-2', 'border-r-2', 'border-violet-200', 'h-10')
    newItem.appendChild(newQtysContainer);
    let newQtyBtnsContainer = document.createElement('div');
    newQtysContainer.appendChild(newQtyBtnsContainer);
    let newQtyRemoveBtn = document.createElement('input');
    newQtyRemoveBtn.type = 'button';
    newQtyRemoveBtn.value = '-';
    newQtyRemoveBtn.name = 'remove-item';
    newQtyRemoveBtn.classList.add('w-7', 'h-7', 'm-0', 'bg-violet-100', 'focus:outline-none', 'removeItem');
    newQtyBtnsContainer.appendChild(newQtyRemoveBtn);
    let newQtyDisplay = document.createElement('input');
    newQtyDisplay.type = 'text';
    newQtyDisplay.name = 'itemQty';
    newQtyDisplay.classList.add('w-7', 'h-7', 'm-0', 'text-center', 'focus:outline-none', 'itemQty');
    newQtyBtnsContainer.appendChild(newQtyDisplay);
    let newQtyAddBtn = document.createElement('input');
    newQtyAddBtn.type = 'button';
    newQtyAddBtn.value = '+';
    newQtyAddBtn.name = 'add-item';
    newQtyAddBtn.classList.add('w-7', 'h-7', 'm-0', 'bg-violet-100', 'focus:outline-none', 'addItem');
    newQtyBtnsContainer.appendChild(newQtyAddBtn);
    let newDeleteButton = document.createElement('button');
    newDeleteButton.classList.add('focus:outline-none', 'deleteItem');
    newQtysContainer.appendChild(newDeleteButton);
    let newDeleteIcon = document.createElement('i');
    newDeleteIcon.classList.add('far', 'fa-trash-alt', 'p-2');
    newDeleteButton.appendChild(newDeleteIcon);
    let newItemPrice = document.createElement('div');
    newItemPrice.classList.add('text-center', 'md:w-2/7', 'lg:w-1/7', 'p-3', 'md:p-0', 'itemPrice')
    newItem.appendChild(newItemPrice);
}

// Function using the arrays of the product information retrieved to populate each item div
function populateProductDiv() {
    const itemNames = [];
    for (item of basketNames) {
        itemNames.push(item);
    }
    let names = document.querySelectorAll('.itemName');
    let namesArr = Array.from(names);
    namesArr.forEach((name, index) => {
        let item = itemNames[index];
        name.innerText = item;
    })
    const itemColours = [];
    for (item of basketColours) {
        itemColours.push(item);
    }
    let colours = document.querySelectorAll('.itemColour');
    let coloursArr = Array.from(colours);
    coloursArr.forEach((colour, index) => {
        let item = itemColours[index];
        colour.innerText = item;
    })
    const itemQtys = [];
    for (item of basketQtys) {
        itemQtys.push(item);
    }
    let qtys = document.querySelectorAll('.itemQty');
    let qtysArr = Array.from(qtys);
    qtysArr.forEach((qty, index) => {
        let item = itemQtys[index];
        qty.value = item;
    })
    const itemPrices = [];
    for (item of basketPrices) {
        itemPrices.push(item);
    }
    let prices = document.querySelectorAll('.itemPrice');
    let pricesArr = Array.from(prices);
    pricesArr.forEach((price, index) => {
        let item = itemPrices[index];
        price.innerText = `$ ${item}`;
    })
    for (item of document.querySelectorAll('.itemPrice')) {
        item.innerText = item.innerText.slice(2);
        item.innerText = `$ ${item.previousElementSibling.firstChild.children[1].value * item.innerText}`
    }
    let itemIds = [];
    for (item of basketIds) {
        itemIds.push(item);
    }
    let ids = document.querySelectorAll('.itemId');
    let idsArr = Array.from(ids);
    idsArr.forEach((id, index) => {
        let item = itemIds[index];
        id.innerText = item;
    })
}

// Function to remove an item display
function removeRow(e) {
    e.parentElement.parentElement.parentElement.removeChild(e.parentElement.parentElement);
};

// Delete button - removes row and removes item from local storage
document.querySelectorAll('.deleteItem').forEach(btn => {
    btn.addEventListener('click', () => {
        removeRow(btn);
        // Get current items in local storage
        let selectedProduct = localStorage.getItem('basketProduct');
        // Create an array of items
        selectedProduct = selectedProduct.replace(/},{/g, "},,{");
        selectedProduct = selectedProduct ? selectedProduct.split(',,') : [];
        // Parse the items to be useable
        let parsedSelectedProduct = []
        for (item of selectedProduct) {
            let parsedItem = JSON.parse(item);
            parsedSelectedProduct.push(parsedItem);
        }
        // Go through each item to find the one that matches the current selection and remove it
        for (let i = 0; i < parsedSelectedProduct.length; i++) {
            if (btn.parentElement.previousElementSibling.firstChild.innerText === parsedSelectedProduct[i].name && btn.parentElement.previousElementSibling.firstChild.nextSibling.nextElementSibling.innerText === parsedSelectedProduct[i].color) {
                parsedSelectedProduct.splice(i, 1);
                let newSelectedProduct = [];
                for (item of parsedSelectedProduct) {
                    item = JSON.stringify(item);
                    newSelectedProduct.push(item);
                }
                localStorage.setItem('basketProduct', newSelectedProduct);
            }
        }
        updateTotalDisplay();
        setTotal();
    });
});

// Increase quantity
document.querySelectorAll('.addItem').forEach(addItem => {
    addItem.addEventListener('click', () => {
        let currentPrice = parseInt(addItem.parentElement.parentElement.nextElementSibling.innerText.slice(2)) / parseInt(addItem.previousElementSibling.value);
        addItem.previousElementSibling.value = parseInt(addItem.previousElementSibling.value) + 1;
        addItem.parentElement.parentElement.nextElementSibling.innerText = `$ ${parseInt(currentPrice) * parseInt(addItem.previousElementSibling.value)}`;
        // Get current local storage
        let currentProducts = localStorage.getItem('basketProduct');
        currentProducts = currentProducts.replace(/},{/g, "},,{");
        currentProducts = currentProducts ? currentProducts.split(',,') : [];
        // Make local storage useable
        let parsedSelectedProduct = []
        for (item of currentProducts) {
            let parsedItem = JSON.parse(item);
            parsedSelectedProduct.push(parsedItem);
        }
        // Create new Products array ready
        let newProductsList = [];
        // Check for items to update
        for (item of parsedSelectedProduct) {
            // If the current selection matches an existing product
            let productUpdated = false;
            if (addItem.parentElement.parentElement.previousElementSibling.firstChild.innerText == item.name && addItem.parentElement.parentElement.previousElementSibling.firstChild.nextElementSibling.nextElementSibling.innerText == item.color) {
                // Update the items quantity by added the current selection
                item.qty = parseInt(item.qty) + 1
                productUpdated = true;
            }
            // Re-stringify everything in the list
            if (productUpdated == true) {
                for (item of parsedSelectedProduct) {
                    item = JSON.stringify(item);
                    newProductsList.push(item);
                }
            }
            // Set to local storage and stop checking
            localStorage.setItem('basketProduct', newProductsList);
        }
        updateTotalDisplay();
        setTotal();
    });
});

// Decrease quantity
document.querySelectorAll('.removeItem').forEach(removeItem => {
    removeItem.addEventListener('click', () => {
        if (removeItem.nextElementSibling.value > 1) {
            let currentPrice = parseInt(removeItem.parentElement.parentElement.nextElementSibling.innerText.slice(2)) / parseInt(removeItem.nextElementSibling.value);
            removeItem.nextElementSibling.value = parseInt(removeItem.nextElementSibling.value) - 1;
            removeItem.parentElement.parentElement.nextElementSibling.innerText = `$ ${parseInt(currentPrice) * parseInt(removeItem.nextElementSibling.value)}`;
            // Get current local storage
            let currentProducts = localStorage.getItem('basketProduct');
            currentProducts = currentProducts.replace(/},{/g, "},,{");
            currentProducts = currentProducts ? currentProducts.split(',,') : [];
            // Make local storage useable
            let parsedSelectedProduct = []
            for (item of currentProducts) {
                let parsedItem = JSON.parse(item);
                parsedSelectedProduct.push(parsedItem);
            }
            // Create new Products array ready
            let newProductsList = [];
            // Check for items to update
            for (item of parsedSelectedProduct) {
                // If the current selection matches an existing product
                let productUpdated = false;
                if (removeItem.parentElement.parentElement.previousElementSibling.firstChild.innerText == item.name && removeItem.parentElement.parentElement.previousElementSibling.firstChild.nextElementSibling.nextElementSibling.innerText == item.color) {
                    // Update the items quantity by added the current selection
                    item.qty = parseInt(item.qty) - 1
                    productUpdated = true;
                }
                // Re-stringify everything in the list
                if (productUpdated == true) {
                    for (item of parsedSelectedProduct) {
                        item = JSON.stringify(item);
                        newProductsList.push(item);
                    }
                }
                // Set to local storage and stop checking
                localStorage.setItem('basketProduct', newProductsList);
            }
        }
        updateTotalDisplay();
        setTotal();
    })
})

// Function to Set Total Basket Price
function setTotal() {
    const total = document.querySelector('#totalPrice');
    let prices = document.querySelectorAll('.itemPrice');
    let pricesArr = Array.from(prices);
    let pricesTotals = [];
    for (item of pricesArr) {
        let price = item.innerText.slice(2)
        pricesTotals.push(parseInt(price))
    }
    total.innerText = `$${pricesTotals.reduce((a, b) => a + b, 0)}`;
}
setTotal();

let orderIds = [];
// Open Lightbox
checkoutBtn.addEventListener('click', () => {
    lightbox.classList.remove('hidden');
    let ids = document.querySelectorAll('.itemId');
    for (item of ids) {
        orderIds.push(item.innerText)
    }
})

// Close Lightbox
closeLightbox.addEventListener('click', () => {
    lightbox.classList.add('hidden');
})

// Function to check email validity
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// Function to request correct email
function warnEmail() {
    email.value = "Not a valid email"
    function removeEmailWarn() {
        email.value = ""
    }
    setTimeout(removeEmailWarn, 3000);
}


// Confirm Order button
confirmOrder.addEventListener('click', (e) => {
    e.preventDefault();
    let inputs = [firstName, lastName, address, city, email];
    for (input of inputs) {
        if (input.value === "") {
            addBorder(input);
        }
    }
    if (validateEmail(email.value) == false) {
        addBorder(email);
        warnEmail();
    }
    let contactDetails = {
        firstName: firstName.value,
        lastName:  lastName.value,
        address: address.value,
        city: city.value,
        email: email.value
    }
    console.log(contactDetails);
    let jsonContact = JSON.stringify(contactDetails);
    console.log(jsonContact);
    console.log(orderIds);
})