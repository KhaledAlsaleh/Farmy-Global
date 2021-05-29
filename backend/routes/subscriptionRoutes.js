import express from 'express';
import {
  addSubscriptionItems,
  getSubscriptionById,
  updateSubscriptionToPaid,
  updateSubscriptionToDelivered,
  getMySubscription,
  getSubscription,
  updateSubscriptionById,
  cancelSubscription,
} from '../controllers/subscriptionController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, addSubscriptionItems).get(protect, admin, getSubscription);
router.route('/mysubscription').get(protect, getMySubscription);
router
  .route('/:id')
  .get(protect, getSubscriptionById)
  .put(protect, updateSubscriptionById)
  .delete(protect, cancelSubscription);
router.route('/:id/pay').put(protect, updateSubscriptionToPaid);
router.route('/:id/deliver').put(protect, admin, updateSubscriptionToDelivered);

export default router;
