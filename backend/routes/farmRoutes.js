import express from 'express';
import { getFarms, getFarmById } from '../controllers/farmController.js';

const router = express.Router();

router.route('/').get(getFarms);
router.route('/:id').get(getFarmById);

export default router;
