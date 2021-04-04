const addItem = document.getElementById('addItem');
const removeItem = document.getElementById('removeItem');
const itemQty = document.getElementById('itemQty');

addItem.addEventListener('click', () =>{
    itemQty.value = parseInt(itemQty.value) + 1;
})

removeItem.addEventListener('click', () =>{
    if(itemQty.value >= 1){
        itemQty.value = parseInt(itemQty.value) - 1;
    }
})
