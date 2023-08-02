import database from '../database.js';
import Note from '../models/note.js';
import Rdv from '../models/rdv.js';
import Favori from '../models/favori.js';

const noteController = {
    // page ajout note
    addNotePage: (req, res) => {
        res.render('accueil', {
            title: 'Ajouter une note',
        });
    },

    // action ajout note
    addNoteAction: async (req, res, next) => {
        try {
            
            const note = new Note(
                req.body.note,
                req.session.user.id
            );
            await note.create();

                res.redirect('/');
                
        } catch (error) {

            const notes = await Note.findAll(req.session.user.id);
            const rdvs = await Rdv.findAll(req.session.user.id);
            const favoris = await Favori.findAll(req.session.user.id);

        res.render('accueil', { user: req.session.user, notes, rdvs, favoris, error: error.message });
           
            
        }
    },

    // action supprimer note
    deleteNoteAction: async (req, res) => {
        try {
          
            const id = req.session.user.id;
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