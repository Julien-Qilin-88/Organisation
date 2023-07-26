// modal favoris

let modalFavoris = document.getElementById("modal-favoris");
let modalTriggersFavoris = modalFavoris.querySelectorAll(".modal-trigger");

document.getElementById("btn-favoris").addEventListener("click", toggleModalFavoris);

modalTriggersFavoris.forEach(trigger => trigger.addEventListener("click", toggleModalFavoris))

function toggleModalFavoris() {
    modalFavoris.classList.toggle("active")
}

// modal favoris supprimer

let modalFavorisSupprimer = document.getElementById("modal-favoris-supprimer");
let modalTriggersFavorisSupprimer = modalFavorisSupprimer.querySelectorAll(".modal-trigger");

document.getElementById("btn-favoris-supprimer").addEventListener("click", toggleModalFavorisSupprimer);

modalTriggersFavorisSupprimer.forEach(trigger => trigger.addEventListener("click", toggleModalFavorisSupprimer))

function toggleModalFavorisSupprimer() {
    modalFavorisSupprimer.classList.toggle("active")
}

// 
let favoriDiv = document.querySelectorAll(".favoris__liens--card");
let favoriA = document.getElementById("favori");

if (favoriDiv.length > 20) {
    favoriA.style.overflowY = "scroll";
}else {
    favoriA.style.overflowY = "hidden";
}
