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

// Envoi des notes dans tableau

let favoris = [];

function addFavori(favori) {
    favoris.push(favori);
    displayFavorisDelete();
    displayFavoris();
}

function deleteFavori(index) {
    favoris.splice(index, 1);
    displayFavorisDelete();
    displayFavoris();
}


function displayFavorisDelete() {
    let form = document.getElementById("favoris-supprimer");
    form.innerHTML = "";
    favoris.forEach((favori) => {
        let button = document.getElementById("btn-delete-favori");
        button.addEventListener("click", () => deleteFavori(index));

        let divNameFavori = document.createElement("div");
        divNameFavori.classList.add("favorisForm__lien");

        let nameFavori = document.createElement("input");
        nameFavori.setAttribute("type", "checkbox");
        nameFavori.setAttribute("id", favori.name);
        nameFavori.setAttribute("name", favori.name);
        nameFavori.setAttribute("value", favori.name);

        let label = document.createElement("label");
        label.setAttribute("for", favori.name);
        label.appendChild(document.createTextNode(favori.name));

        form.appendChild(divNameFavori);
        divNameFavori.appendChild(nameFavori);
        divNameFavori.appendChild(label);
        

    })
}

function displayFavoris() {
    let div = document.getElementById("favori")
    div.innerHTML = "";
    favoris.forEach((favori) => {
        let url = document.createElement("a");
        url.setAttribute("href", favori.url);
        url.appendChild(document.createTextNode(favori.name));
        url.classList.add("favoris__liens--card");
        url.setAttribute("target", "_blank");

        let image = document.createElement("img");
        image.setAttribute("src", "https://www.google.com/s2/favicons?domain=" + favori.url);
        image.classList.add("card__image");
        div.appendChild(url);
        url.appendChild(image);

    })
}

function saveFavoris(e) {
    e.preventDefault();
    let favori = {
        name: document.getElementById("favori-name").value,
        url: document.getElementById("favori-url").value,
    }
    document.getElementById("favori-name").value = "";
    document.getElementById("favori-url").value = "";

    addFavori(favori);
    toggleModalFavoris();

}

let btnDeleteFavori = document.getElementById("btn-delete-favori");
btnDeleteFavori.addEventListener("click", deleteFavori);

document.getElementById("new-favori").addEventListener("submit", saveFavoris);