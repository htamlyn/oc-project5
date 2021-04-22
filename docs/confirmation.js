const orderName = document.querySelector('#orderName');
const orderCost = document.querySelector('#orderCost');
const orderNumber = document.querySelector('#orderNumber')

let orderTotal = localStorage.getItem('orderTotal');
orderCost.innerText = orderTotal;

let customerName = localStorage.getItem('customerName');
orderName.innerText = customerName;

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const confirmation = urlParams.get('confirmation');
orderNumber.innerText = confirmation;