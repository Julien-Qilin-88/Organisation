import express from 'express';
import data from './data.js';
import * as controllers from './controllers.js';

const router = express.Router();

router.get('/', controllers.accueil);

router.get('/kanban', controllers.kanban);

export default router;