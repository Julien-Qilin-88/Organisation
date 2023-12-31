import express from 'express';
import * as controllers from './controllers/controllers.js';
import userController from './controllers/userController.js';
import noteController from './controllers/noteController.js';
import rdvController from './controllers/rdvController.js';
import favoriController from './controllers/favoriController.js';
 
const router = express.Router();

router.get('/', controllers.accueil, userController.signupPage, userController.loginPage);
router.post('/', userController.loginAction);

router.post('/ajoutnote', noteController.addNoteAction);
router.post('/delete-note/:id', noteController.deleteNoteAction);

router.post('/ajoutrdv', rdvController.addRdvAction);
router.post('/delete-rdv/:id', rdvController.deleteRdvAction);

router.post('/ajoutfavori', favoriController.addFavoriAction);
router.post('/delete-favori/:id', favoriController.deleteFavoriAction);

router.get('/inscription', userController.signupPage);
router.post('/inscription', userController.signupAction);

router.get('/disconnect', userController.disconnect);

router.get('/kanban', controllers.kanban);


export default router;