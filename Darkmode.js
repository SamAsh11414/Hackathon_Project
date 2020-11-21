// TODO, Toggle dark mode


function Darkmodeactivate() {
    var element = document.body;
    element.classList.toggle("dark-mode");
}

const Darkbtn = document.getElementById('Darkmode');
    Darkbtn.addEventListener('click', Darkmodeactivate);