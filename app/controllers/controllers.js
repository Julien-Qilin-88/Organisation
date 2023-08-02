import Favori from '../models/favori.js';
import Note from '../models/note.js';
import Rdv from '../models/rdv.js';

export const accueil = async (req, res) => {

    if (req.session.user) {

        const notes = await Note.findAll(req.session.user.id);
        const rdvs = await Rdv.findAll(req.session.user.id);
        const favoris = await Favori.findAll(req.session.user.id);

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