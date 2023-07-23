// Connexion

let modalConnexion = document.getElementById("modal-connexion");
let modalTriggersConnexion = modalConnexion.querySelectorAll(".modal-trigger");

document.getElementById("btn-connexion").addEventListener("click", toggleModalConnexion);

modalTriggersConnexion.forEach(trigger => trigger.addEventListener("click", toggleModalConnexion))

function toggleModalConnexion() {
    modalConnexion.classList.toggle("active")
}

// Inscription

let modalInscription = document.getElementById("modal-inscription");
let modalTriggersInscription = modalInscription.querySelectorAll(".modal-trigger");

document.getElementById("btn-inscription").addEventListener("click", toggleModalInscription);

modalTriggersInscription.forEach(trigger => trigger.addEventListener("click", toggleModalInscription))

function toggleModalInscription() {
    modalInscription.classList.toggle("active")
}