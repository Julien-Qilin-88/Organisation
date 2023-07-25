import data from '../data.js';
import database from '../database.js';

export const accueil = async (req, res) => {

    if (req.session.user) {

        const result = await database.query('SELECT * FROM "note" WHERE id_note = $1', [req.session.user.id]);
        const notes = result.rows;
      
        const rdv = await database.query('SELECT nom, lieu, TO_CHAR("date", \'DD/MM/YYYY\') AS "date", TO_CHAR("heure", \'HH24:MI\') AS "heure" FROM "rdv" WHERE id_rdv = $1', [req.session.user.id]);
        const rdvs = rdv.rows;

        const favori = await database.query('SELECT * FROM "favori" WHERE id_favori = $1', [req.session.user.id]);
        const favoris = favori.rows;

        res.render('accueil', { user: req.session.user, notes, rdvs, favoris });
    } else {
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



