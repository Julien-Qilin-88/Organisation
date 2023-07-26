// modal rendez-vous

let modalRdv = document.getElementById("modal-rdv");
let modalTriggersRdv = modalRdv.querySelectorAll(".modal-trigger");

document.getElementById("btn-rdv").addEventListener("click", toggleModalRdv);

modalTriggersRdv.forEach(trigger => trigger.addEventListener("click", toggleModalRdv))

function toggleModalRdv() {
    modalRdv.classList.toggle("active")
}

// 

const handleDelete = (id, customUrl, parentNode) => {
    
    let url = customUrl + id;
    parentNode.remove();

    console.log(url);
    // utiliser le back pour supprimer le rdv
    fetch(url, {
        method: 'POST'
    })
}


//  si plus de 10 tr avec la class note__write__li on ajoute overflow-y: scroll; sur le tbody note-write
let rdvWriteTr = document.querySelectorAll(".rdv-tr");
let rdvWrite = document.getElementById("rdv-tbody");

if (rdvWriteTr.length > 11) {
    rdvWrite.style.overflowY = "scroll";
}else {
    rdvWrite.style.overflowY = "hidden";
}

// mettre un compteur de caractere
let zoneTexteNom = document.getElementById('rdvNom');
document.getElementById('rdvNom').addEventListener('keyup', function() {
    document.getElementById('compteur-nom').innerHTML = zoneTexteNom.value.length + "/15";
    if (zoneTexteNom.value.length > 15 || zoneTexteNom.value.length < 1) {
        document.getElementById('compteur-nom').style.color = "red";
    }else {
        document.getElementById('compteur-nom').style.color = "white";
    }

});

let zoneTexteLieu = document.getElementById('rdvLieu');
document.getElementById('rdvLieu').addEventListener('keyup', function() {
    document.getElementById('compteur-lieu').innerHTML = zoneTexteLieu.value.length + "/15";
    if (zoneTexteLieu.value.length > 15 || zoneTexteLieu.value.length < 1) {
        document.getElementById('compteur-lieu').style.color = "red";
    }else {
        document.getElementById('compteur-lieu').style.color = "white";
    }

});