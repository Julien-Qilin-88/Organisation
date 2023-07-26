import validator from 'validator';
import database from '../database.js';
import Note from '../models/note.js';
import * as controllers from './controllers.js';


const noteController = {
    // page ajout note
    addNotePage: (req, res) => {
        res.render('accueil', {
            title: 'Ajouter une note',
        });
    },

    // action ajout note
    addNoteAction: async (req, res) => {
        try {
  
        //   si erreur, on actualise pas la page et on affiche l'erreur
            const note = new Note(
                req.body.note,
                req.session.user.id
            );
            await note.create();


            res.redirect('/');

        } catch (error) {

            // ne pas actualiser la page et afficher l'erreurr
            res.render('accueil', {
                title: 'Ajouter une note',
                error: error.message,
            });
            
        }
    },

    // action supprimer note
    deleteNoteAction: async (req, res) => {
        try {
           
            const id = req.session.user.id;
            // note est une chaine de caracteres
            const idNote = req.params.id;
                        
            await database.query('DELETE FROM "note" WHERE id = $1 AND id_note = $2', [idNote, id]);

            res.redirect('/');


        } catch (error) {
            res.render('404', {
                title: 'Erreur 404',
                error: error.message,
            });
        }
    },

};


export default noteController;