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

// mettre un compteur de caractere
let zoneTexteLien = document.getElementById('favori-name');
document.getElementById('favori-name').addEventListener('keyup', function() {
    document.getElementById('compteur-lien').innerHTML = zoneTexteLien.value.length + "/12";
    if (zoneTexteLien.value.length > 10 || zoneTexteLien.value.length < 1) {
        document.getElementById('compteur-lien').style.color = "red";
    }else {
        document.getElementById('compteur-lien').style.color = "white";
    }

});
