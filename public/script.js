const menuButton = document.getElementById('menuBtn');
const menuLinks = document.getElementById('menuLinks');

menuButton.addEventListener('click', () =>{
    if(menuLinks.classList.contains('hidden') == true){
        menuLinks.classList.remove('hidden');
    } else{
        menuLinks.classList.add('hidden');
    }
});