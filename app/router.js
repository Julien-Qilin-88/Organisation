import express from 'express';
import data from './data.js';
import * as controllers from './controllers.js';
import userController from './controllers/userController.js';
import database from './database.js';
import noteController from './controllers/noteController.js';
 
const router = express.Router();

router.get('/', controllers.accueil, userController.signupPage, noteController.deleteNoteAction);
router.post('/', userController.loginAction);
router.post('/ajoutnote', noteController.addNoteAction);

router.get('/inscription', userController.signupPage);
router.post('/inscription', userController.signupAction);

router.get('/disconnect', userController.disconnect);

router.get('/kanban', controllers.kanban);

export default router;