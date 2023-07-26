import validator from 'validator';
import database from '../database.js';
import slugify from 'slugify';

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
     
            const nom = req.body.nom;
            const lieu = req.body.lieu;
            const date = req.body.date;
            const heure = req.body.heure;
            
            // retirer les : de l'heure
            const heureSansDeuxPoints = heure.replace(':', '');

            const id = req.session.user.id;

            await database.query('INSERT INTO "rdv" (nom, lieu, date, heure, id_rdv) VALUES ($1, $2, $3, $4, $5)', [nom, lieu, date, heureSansDeuxPoints, id]);

            res.redirect('/');

        } catch (error) {
            res.render('404', {
                title: 'Erreur 404',
                error: error.message,
            });
        }
    },

    // action supprimer note
    deleteRdvAction: async (req, res) => {
        try {
           
            const id = req.session.user.id;

            const idRdv = req.params.id;

            console.log(id);
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