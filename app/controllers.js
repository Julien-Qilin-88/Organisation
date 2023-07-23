import data from './data.js';
import database from './database.js';

export const accueil = async (req, res) => {

    if (req.session.user) {
        const result = await database.query('SELECT * FROM "note" WHERE id_note = $1', [req.session.user.id]);
        const notes = result.rows;
        console.log(notes);

        res.render('accueil', { user: req.session.user, notes });
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



