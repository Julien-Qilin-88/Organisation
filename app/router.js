import express from 'express';
import data from './data.js';
import * as controllers from './controllers.js';
import userController from './controllers/userController.js';
import database from './database.js';
import noteController from './controllers/noteController.js';
import rdvController from './controllers/rdvController.js';
 
const router = express.Router();

router.get('/', controllers.accueil, userController.signupPage);
router.post('/', userController.loginAction);

router.post('/ajoutnote', noteController.addNoteAction);
router.post('/delete-note/:id', noteController.deleteNoteAction);

router.post('/ajoutrdv', rdvController.addRdvAction);
router.post('/delete-rdv/:id', rdvController.deleteRdvAction);

router.get('/inscription', userController.signupPage);
router.post('/inscription', userController.signupAction);

router.get('/disconnect', userController.disconnect);

router.get('/kanban', controllers.kanban);


export default router;