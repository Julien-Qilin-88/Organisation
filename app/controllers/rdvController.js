import database from '../database.js';
import Rdv from '../models/rdv.js';
import Note from '../models/note.js';
import Favori from '../models/favori.js';

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

            const rdv = new Rdv(
                req.body.nom,
                req.body.lieu,
                req.body.date,
                req.body.heure,
                req.session.user.id
            );

            await rdv.create();

            res.redirect('/');

        } catch (error) {

            const notes = await Note.findAll(req.session.user.id);
            const rdvs = await Rdv.findAll(req.session.user.id);
            const favoris = await Favori.findAll(req.session.user.id);

            res.render('accueil', { user: req.session.user, notes, rdvs, favoris, errorRdv: error.message });

        }
    },

    // action supprimer note
    deleteRdvAction: async (req, res) => {
        try {

            const id = req.session.user.id;
            const idRdv = req.params.id;
            await database.query('DELETE FROM "rdv" WHERE id = $1 AND id_rdv = $2', [idRdv, id]);

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