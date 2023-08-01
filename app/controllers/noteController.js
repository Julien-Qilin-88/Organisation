import database from '../database.js';
import Note from '../models/note.js';


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

        const result = await database.query('SELECT * FROM "note" WHERE id_note = $1', [req.session.user.id]);
        const notes = result.rows;
      
        const rdv = await database.query('SELECT id, nom, lieu, TO_CHAR("date", \'DD/MM/YYYY\') AS "date", TO_CHAR("heure", \'HH24:MI\') AS "heure" FROM "rdv" WHERE id_rdv = $1', [req.session.user.id]);
        const rdvs = rdv.rows;

        const favori = await database.query('SELECT * FROM "favori" WHERE id_favori = $1', [req.session.user.id]);
        const favoris = favori.rows;

        res.render('accueil', { user: req.session.user, notes, rdvs, favoris, error: error.message });
            // avec gestion des erreurs et ajout des select de la page d'accueil qui sont dans la fonction accueil du fichier controllers.js
            
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