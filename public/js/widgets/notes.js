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

//  si plus de 10 li avec la class note__write__li on ajoute overflow-y: scroll; sur la div note-write
let noteWriteLi = document.querySelectorAll(".note__write__li");
let noteWrite = document.getElementById("note-write");

if (noteWriteLi.length > 10) {
    noteWrite.style.overflowY = "scroll";
}else {
    noteWrite.style.overflowY = "hidden";
}


// mettre un compteur de caractere
let zoneTexte = document.getElementById('note');
document.getElementById('note').addEventListener('keyup', function() {
    document.getElementById('compteur-note').innerHTML = zoneTexte.value.length + "/45";
    if (zoneTexte.value.length > 45 || zoneTexte.value.length < 1) {
        document.getElementById('compteur-note').style.color = "red";
    }else {
        document.getElementById('compteur-note').style.color = "white";
    }

});




