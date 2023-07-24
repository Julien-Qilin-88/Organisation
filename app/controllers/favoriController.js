import validator from 'validator';
import database from '../database.js';

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
                
            const titre = req.body.titreLien;
            const lien = req.body.lien;
            const id = req.session.user.id;

            console.log(titre + ' ' + lien + ' ' + id);

            await database.query('INSERT INTO "favori" (titre, lien, id_favori) VALUES ($1, $2, $3)', [titre, lien, id]);

            res.redirect('/');

        } catch (error) {
            res.render('accueil', {
                title: 'Ajouter un favori',
                error: error.message,
            });
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