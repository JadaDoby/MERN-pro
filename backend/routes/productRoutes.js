import { getProducts, getProductsByID, createProduct, deleteProduct,createProductReview } from '../controllers/productControllers.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/:id').get(getProductsByID).put(protect, admin, updatedProduct)
.delete(protect, admin, deleteProduct);

router.route('/:id/reviews').post(protect,createProductReview);
export default router;
