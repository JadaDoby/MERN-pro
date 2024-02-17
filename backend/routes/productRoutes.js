import { getProducts, getProductsByID, createProduct, deleteProduct } from '../controllers/productControllers.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/:id').get(getProductsByID).put(protect, admin, updatedProduct).delete(protect, admin, deleteProduct);

export default router;
