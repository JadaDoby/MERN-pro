import express from 'express';
import { getProducts,getProductsByID } from '../controllers/productControllers';
import { get } from 'mongoose';

router.route('/').get(getProducts);
router.route('/:id').get(getProductsByID);

// Route to fetch all products


export default router;