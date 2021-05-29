import express from 'express';
import {
  getBundles,
  getBundleById,
  deleteBundle,
  createBundle,
  updateBundle,
  createBundleReview,
  getTopBundle,
  getLatestBundles,
  getBundlesNewUser,
} from '../controllers/bundleController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getBundles).post(protect, admin, createBundle);
router.route('/register/bundleplan').get(protect, getBundlesNewUser);

router.route('/:id/reviews').post(protect, createBundleReview);
router.get('/top', getTopBundle);
router.get('/latest', getLatestBundles);
router
  .route('/:id')
  .get(getBundleById)
  .delete(protect, admin, deleteBundle)
  .put(protect, admin, updateBundle);

export default router;
