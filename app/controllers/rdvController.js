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