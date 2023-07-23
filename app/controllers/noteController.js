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
    deleteNoteAction: async (req, res) => {
        try {
            const id = req.session.user.id;
            const note = req.body.note;
            await database.query('DELETE FROM "note" WHERE id_note = $1 AND note = $2', [id, note]);
        } catch (error) {
            res.render('accueil', {
                title: 'Ajouter une note',
                error: error.message,
            });
        }
    },

    // afficher note

    // displayNoteAction: async (req, res) => {
    //     try {
    //         const id = req.session.user.id;
    //         const result = await database.query('SELECT * FROM "note" WHERE id_note = $1', [id]);
    //         if (result) {

    //             return result.rows;
            
    //         } else {
    //             throw new Error('Aucune note');
    //         }


    //     } catch (error) {
    //         res.render('accueil', {
    //             title: 'Ajouter une note',
    //             error: error.message,
    //         });
    //     }
    // },
};


export default noteController;