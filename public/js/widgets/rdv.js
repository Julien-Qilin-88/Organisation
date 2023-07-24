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

    // utiliser le back pour supprimer le rdv
    fetch(url, {
        method: 'POST'
    })
}


