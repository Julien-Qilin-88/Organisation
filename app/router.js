import express from 'express';
import data from './data.js';
import * as controllers from './controllers.js';

const router = express.Router();

router.get('/', controllers.accueil);

export default router;