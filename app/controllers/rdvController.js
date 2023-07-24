import validator from 'validator';
import database from '../database.js';

const rdvController = {
    // page ajout note
    addRdvPage: (req, res) => {
        res.render('accueil', {
            title: 'Ajouter une note',
        });
    },

    // action ajout note
    addRdvAction: async (req, res) => {

        try {
            if (!validator.isLength(req.body.note, { min: 1, max: 255 }) && req.session.user) {
                throw new Error('La note doit contenir entre 1 et 255 caractères');

            }

            const note = req.body.note;
            const id = req.session.user.id;
            console.log(note);
            console.log(id);
            await database.query('INSERT INTO "note" (note, id_note) VALUES ($1, $2)', [note, id]);

            res.redirect('/');

        } catch (error) {
            res.render('accueil', {
                title: 'Ajouter une note',
                error: error.message,
            });
        }
    },

    // action supprimer note
    deleteRdvAction: async (req, res) => {
        try {
           
            const id = req.session.user.id;
            // note est une chaine de caracteres
            const idNote = req.params.id;

            console.log(`je sui bien arriver ici + idnote ${idNote} et id ${id}`);
                        
            await database.query('DELETE FROM "note" WHERE id = $1 AND id_note = $2', [idNote, id]);

            console.log('je suis enfin arriver ici');

            res.redirect('/');


        } catch (error) {
            res.render('404', {
                title: 'Erreur 404',
                error: error.message,
            });
        }
    },

};


export default rdvController;