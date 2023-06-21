// modal rendez-vous

let modalRdv = document.getElementById("modal-rdv");
let modalTriggersRdv = modalRdv.querySelectorAll(".modal-trigger");

document.getElementById("btn-rdv").addEventListener("click", toggleModalRdv);

modalTriggersRdv.forEach(trigger => trigger.addEventListener("click", toggleModalRdv))

function toggleModalRdv() {
    modalRdv.classList.toggle("active")
}

// Envoi des rdvs dans tableau

let rdvs = [];

function addRdv(note) {
    rdvs.push(note);
    displayRdvs();
}

function deleteRdv(index) {
    rdvs.splice(index, 1);
    displayRdvs();
}

function displayRdvs() {
    let tbody = document.getElementById("rdvs")
    tbody.innerHTML = "";
    rdvs.forEach((rdv, index) => {
        let button = document.createElement("button");
        button.classList.add("delete");
        button.appendChild(document.createTextNode("X"));
        button.addEventListener("click", () => deleteRdv(index));

        let tr = document.createElement("tr");
        let tdNom = document.createElement("td");
        tdNom.appendChild(document.createTextNode(rdv.nom));
        let tdLieu = document.createElement("td");
        tdLieu.appendChild(document.createTextNode(rdv.lieu));
        let tdDate = document.createElement("td");
        tdDate.appendChild(document.createTextNode(rdv.date));
        let tdHeure = document.createElement("td");
        tdHeure.appendChild(document.createTextNode(rdv.heure));
        let tdSuppr = document.createElement("td");
        tdSuppr.appendChild(button);
        tr.appendChild(tdNom);
        tr.appendChild(tdLieu);
        tr.appendChild(tdDate);
        tr.appendChild(tdHeure);
        tr.appendChild(tdSuppr);
        tbody.appendChild(tr);
    })
}

function saveRdv(e) {
    e.preventDefault();
    let rdv = {
        nom: document.getElementById("rdvNom").value,
        lieu: document.getElementById("rdvLieu").value,
        date: document.getElementById("rdvDate").value,
        heure: document.getElementById("rdvHeure").value
    }
    document.getElementById("rdvNom").value = "";
    document.getElementById("rdvLieu").value = "";
    document.getElementById("rdvDate").value = "";
    document.getElementById("rdvHeure").value = "";
    addRdv(rdv);
    toggleModalRdv();
}

document.getElementById("new-rdv").addEventListener("submit", saveRdv);