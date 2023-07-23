import validator from 'validator';
import User from '../models/User.js';
import * as bcrypt from 'bcrypt';
import database from '../database.js';

const userController = {
    signupPage: (req, res) => {
        res.render('inscription', {
            title: 'Inscription',
            });

    },

    signupAction: async (req, res) => {
        try {


            const options = { minLength: 12, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 };
            if (!validator.isEmail(req.body.email)) {
                throw new Error('Email invalide');


            }
            else if (!validator.isStrongPassword(req.body.password, options)) {
                throw new Error('Le mot de passe doit comporter au moins 12 caractères et au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial');
            }
            else if (req.body.password !== req.body.passwordConfirm) {
                throw new Error('Les mots de passe ne sont pas identiques');
            }

            const hash = await bcrypt.hash(req.body.password, 10);
            const user = new User({
                email: req.body.email,
                prenom: req.body.prenom,
                nom: req.body.nom,
                hash: hash,
            });

            await database.query('INSERT INTO "account" (email, prenom, nom, hash) VALUES ($1, $2, $3, $4)', [user.email, user.prenom, user.nom, user.hash]);

            res.redirect('/');


        } catch (error) {

            console.log(error);
            res.render('inscription', {
                title: 'Inscription',
                error: error.message
            });
        }

    },

    loginPage: function (req, res) {
        res.render('accueil', {
            title: 'Connexion',
            });
    },

    loginAction: async (req, res) => {
        try {
            const foundUser = await database.query('SELECT * FROM "account" WHERE email = $1', [req.body.email]);
            const user = foundUser?.rows[0];
            if (user) {

                bcrypt.compare(req.body.password, user.hash, (err, result) => {

                    if (err) {
                        throw new Error('Mauvais couple identifiant/mot de passe');

                    }
                    else if (result) {
                        req.session.isLogged = true;
                        req.session.user = foundUser.rows[0];
                        res.redirect('/');
                    } else {
                        res.render('accueil', {
                            title: 'Connexion',
                            error: 'Mauvais couple identifiant/mot de passe'
                        });
                    }
                });
            }
            else {
                res.render('accueil', {
                    title: 'Connexion',
                    error: 'Mauvais couple identifiant/mot de passe',
                });
            }

        } catch (error) {
            res.render('accueil', {
                title: 'Connexion',
                error: error.message,
            });
        }
    },

    disconnect: function (req, res) {
        req.session.destroy();
        res.redirect('/');
    }




}



export default userController;