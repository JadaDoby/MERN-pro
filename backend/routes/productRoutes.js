import { getProducts, getProductsByID, createProduct, deleteProduct,createProductReview } from '../controllers/productControllers.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/:id').get(getProductsByID).put(protect, admin, updatedProduct)
.delete(protect, admin, deleteProduct);

router.route('/:id/reviews').post(protect,createProductReview);
export default router;

router.route('/:id/reviews').post(protect, checkObjectId, createProductReview);

router
  .route('/:id')
  .get(checkObjectId, getProductById)
  .put(protect, admin, checkObjectId, updateProduct)
  .delete(protect, admin, checkObjectId, deleteProduct);