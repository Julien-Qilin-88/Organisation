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


// Envoi des notes dans tableau

// let notes = [];

// function addNote(note) {
//     notes.push(note);
//     displayNotes();
// }

// function deleteNote(index) {
//     notes.splice(index, 1);
//     displayNotes();     
// }

// function displayNotes() {
//     let ul = document.getElementById("notes")
//     ul.innerHTML = "";
//     notes.forEach((note, index) => {
//         let li = document.createElement("li");
//         li.classList.add("note__write__li");
//         li.appendChild(document.createTextNode(note));
//         let button = document.createElement("button");
//         button.classList.add("delete");
//         button.appendChild(document.createTextNode("X"));
//         button.addEventListener("click", ()=>deleteNote(index));        
//         li.appendChild(button);
//         ul.appendChild(li);
//     })
// }

// function saveNote(e) {
//     e.preventDefault();
//     let note = document.getElementById("note").value;
//     addNote(note);
//     document.getElementById("note").value = "";
//     toggleModalNote();
// }

// document.getElementById("new-note").addEventListener("submit", saveNote);