// modal
let modalNote = document.getElementById("modal-note");
let modalTriggersNote = modalNote.querySelectorAll(".modal-trigger");

document.getElementById("btn-note").addEventListener("click", toggleModalNote);

modalTriggersNote.forEach(trigger => trigger.addEventListener("click", toggleModalNote))

function toggleModalNote() {
    modalNote.classList.toggle("active")
}

// input id note au click j'actualise la page

document.getElementById("btn-add-note").addEventListener("click", function () {
    // fermeture modal
    toggleModalNote();

});

// supprimer une note au click sur la croix rouge et  le supprimer de la base de donnée

// document.querySelectorAll(".delete").forEach(item => {
//     item.addEventListener("click", event => {

//         item.parentNode.remove();

//         let id = item.parentNode.id;
//         let url = "/delete-note/" + id;

//         fetch(url, {
//             method: 'POST'
//         })
//     })
// })
