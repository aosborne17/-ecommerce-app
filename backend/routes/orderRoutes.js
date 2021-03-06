import express from 'express';
const router = express.Router();
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/', protect, addOrderItems);
router.get('/myorders', protect, getMyOrders);

// the :id will take the id from the url and from this get the correct order from the db
router.get('/:id', protect, getOrderById);

router.put('/:id/pay', protect, updateOrderToPaid);

export default router;
