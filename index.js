import express from 'express';
import session from 'express-session';
import * as dotenv from 'dotenv';
import router from './app/router.js';
import data from './app/data.js';


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

app.use((req, res) => {
    res.status(404)
});

app.listen(port, () => {
  console.log(`app sur http://localhost:${port}/`);
});