import validator from 'validator';
import database from '../database.js';
import Favori from '../models/favori.js';

const favoriController = {
    // page ajout favori
    addFavoriPage: (req, res) => {
        res.render('accueil', {
            title: 'Ajouter un favori',
        });
    },

    // action ajout favori
    addFavoriAction: async (req, res) => {
        try {
            const favori = new Favori(
                req.body.titreLien,
                req.body.lien,
                req.session.user.id
            );
            await favori.create();

            res.redirect('/');
       
        } catch (error) {

            const result = await database.query('SELECT * FROM "note" WHERE id_note = $1', [req.session.user.id]);
            const notes = result.rows;
          
            const rdv = await database.query('SELECT id, nom, lieu, TO_CHAR("date", \'DD/MM/YYYY\') AS "date", TO_CHAR("heure", \'HH24:MI\') AS "heure" FROM "rdv" WHERE id_rdv = $1', [req.session.user.id]);
            const rdvs = rdv.rows;
    
            const favori = await database.query('SELECT * FROM "favori" WHERE id_favori = $1', [req.session.user.id]);
            const favoris = favori.rows;
    
            res.render('accueil', { user: req.session.user, notes, rdvs, favoris, errorFavori: error.message });
                // avec gestion des erreurs et ajout des select de la page d'accueil qui sont dans la fonction accueil du fichier controllers.js
                
            }
    },

    // action supprimer favori
    deleteFavoriAction: async (req, res) => {
        try {
            const id = req.session.user.id;
            // note est une chaine de caracteres
            const idFavori = req.params.id;

            await database.query('DELETE FROM "favori" WHERE id = $1 AND id_favori = $2', [idFavori, id]);

            res.redirect('/');
        } catch (error) {
            res.render('404', {
                title: 'Erreur 404',
                error: error.message,
            });
        }
    },

};

export default favoriController;