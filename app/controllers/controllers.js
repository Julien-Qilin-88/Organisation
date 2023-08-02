import database from '../database.js';
import Favori from '../models/favori.js';
import Note from '../models/note.js';
import Rdv from '../models/rdv.js';

export const accueil = async (req, res) => {

    if (req.session.user) {

        // const result = await database.query('SELECT * FROM "note" WHERE id_note = $1', [req.session.user.id]);
        // const notes = result.rows;

        const notes = await Note.findAll(req.session.user.id);
      
        // const rdv = await database.query('SELECT id, nom, lieu, TO_CHAR("date", \'DD/MM/YYYY\') AS "date", TO_CHAR("heure", \'HH24:MI\') AS "heure" FROM "rdv" WHERE id_rdv = $1', [req.session.user.id]);
        // const rdvs = rdv.rows;

        const rdvs = await Rdv.findAll(req.session.user.id);


        // methode static de la class Favori
        const favoris = await Favori.findAll(req.session.user.id);


        // const favori = await database.query('SELECT * FROM "favori" WHERE id_favori = $1', [req.session.user.id]);
        // const favoris = favori.rows;

        // cookies de la session de l'utilisateur connecté pour garder session active meme si je ferme le navigateur
        // res.cookie('user', req.session.user, { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true });



        res.render('accueil', { user: req.session.user, notes, rdvs, favoris });
    } 
    // si erreur je renvoi le message d'erreur
    else if (req.session.error) {
        res.render('accueil', { error: req.session.error });
    }
    // sinon je renvoi la vu accueil
    else {

        res.render('accueil');
    }
    
}

export const kanban = (req, res) => {
    // si je suis connecté
    if (req.session.isLogged) {
        res.render('kanban', { user: req.session.user });
    }
    else {
        res.redirect('/');
    }
}



