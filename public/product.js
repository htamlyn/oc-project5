// function makeRequest(verb, url){
//     let request = new XMLHttpRequest();
//     request.open(verb, url);
//     request.onreadystatechange = () => {
//       if (request.readyState === 4) {
//         if (request.status === 200 || request.status === 201) {
//           resolve(JSON.parse(request.response));
//         } else {
//           reject(JSON.parse(request.response));
//         }
//         request.send();
//       }
//     };
// }

// function showRequest() {
//     makeRequest('GET', 'http://localhost:3000/api/teddies/');
//     console.log('request made');
// }

const testBtn = document.getElementById('test');

testBtn.addEventListener('click', () => {
    console.log('clicked');
    // showRequest();
});

fetch("http://localhost:3000/api/teddies/:_id");