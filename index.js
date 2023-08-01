import express from 'express';
import session from 'express-session';
import * as dotenv from 'dotenv';
import router from './app/router.js';
import database from './app/database.js';



dotenv.config();

const port = process.env.PORT || 4000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', './app/views/');

app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: process.env.SECRET,
}));



app.use((req, res, next) => {
  res.locals.isLogged = req.session.isLogged
  res.locals.formData = req.session.formData || {};
  next();
});

app.use(express.urlencoded({ extended: true }));

app.use(express.static('./public'));

app.use(router);

// app.use( async (req, res) => {
//   // renvoi la vu accueil avec le tableau data
//   if (req.session.user) {

//     const result = await database.query('SELECT * FROM "note" WHERE id_note = $1', [req.session.user.id]);
//     const notes = result.rows;
  
//     const rdv = await database.query('SELECT id, nom, lieu, TO_CHAR("date", \'DD/MM/YYYY\') AS "date", TO_CHAR("heure", \'HH24:MI\') AS "heure" FROM "rdv" WHERE id_rdv = $1', [req.session.user.id]);
//     const rdvs = rdv.rows;

//     const favori = await database.query('SELECT * FROM "favori" WHERE id_favori = $1', [req.session.user.id]);
//     const favoris = favori.rows;
// console.log(favoris);
//     res.render('accueil', { user: req.session.user, notes, rdvs, favoris, error: error.message });
// } else {
//     res.render('accueil');
// }
// });


app.listen(port, () => {
  console.log(`app sur http://localhost:${port}/`);
});