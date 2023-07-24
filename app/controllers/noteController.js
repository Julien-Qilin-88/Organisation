import validator from 'validator';
import database from '../database.js';

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
            if (!validator.isLength(req.body.note, { min: 1, max: 255 }) && req.session.user) {
                throw new Error('La note doit contenir entre 1 et 255 caractères');

            }

            const note = req.body.note;
            const id = req.session.user.id;
           
            await database.query('INSERT INTO "note" (note, id_note) VALUES ($1, $2)', [note, id]);

            res.redirect('/');

        } catch (error) {
            res.render('404', {
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