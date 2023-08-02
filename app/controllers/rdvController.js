import validator from 'validator';
import database from '../database.js';
import slugify from 'slugify';
import Rdv from '../models/rdv.js';
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

            const result = await database.query('SELECT * FROM "note" WHERE id_note = $1', [req.session.user.id]);
            const notes = result.rows;
          
            const rdv = await database.query('SELECT id, nom, lieu, TO_CHAR("date", \'DD/MM/YYYY\') AS "date", TO_CHAR("heure", \'HH24:MI\') AS "heure" FROM "rdv" WHERE id_rdv = $1', [req.session.user.id]);
            const rdvs = rdv.rows;
    
            const favori = await database.query('SELECT * FROM "favori" WHERE id_favori = $1', [req.session.user.id]);
            const favoris = favori.rows;
    
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