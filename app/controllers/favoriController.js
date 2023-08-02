import database from '../database.js';
import Favori from '../models/favori.js';
import Note from '../models/note.js';
import Rdv from '../models/rdv.js';

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

            const notes = await Note.findAll(req.session.user.id);
            const rdvs = await Rdv.findAll(req.session.user.id);
            const favoris = await Favori.findAll(req.session.user.id);
    
            res.render('accueil', { user: req.session.user, notes, rdvs, favoris, errorFavori: error.message });
                      
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