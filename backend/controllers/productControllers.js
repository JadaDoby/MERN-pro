import express from 'express';
import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

const router=express.Router();



//@desc Fetch all products
//@route GET/api/products
//@access Public
const getProducts= asyncHandler(async(req,res)=> { 
    const products = await Product.find({});
    res.json(products)

});

//@desc Fetch all products
//@route GET/api/products/:id
//@access Public
const getProductsByID= asyncHandler(async(req,res)=> { 
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error('Resource not found');
    }

});

//@desc  Create a product
//@route POST/api/products
//@access  Private/admin
const createProduct = asyncHandler(async(req,res)=> { 
    const product=new Product({
      name:'Sample name',
      user:req.user._id,
      image:'/images/sample.jpg',
      brand:'Sample brand',
      category:'Sample category',
      countInStock:0,
      numReviews:0,
      description:'Sample description',
    })
    const createdProduct=await product.save();
    res.status(201).json(createdProduct);
});

//@desc Update a product
//@route PUT/api/products/:id
//@access Private/Admin
const updateProduct= asyncHandler(async(req,res)=> { 
  const {name,price,description,image,brand,catergory,
    countInStock}=req.body;
    const product=await Product.findById(req.params.id);
 if(product){
    product.name=name;
    product.price=price;
    product.description=description;
    product.iamge=image;
    product.brand=brand;
    product.category=category;
    product.countInStock=countInStock;
    
    const updateProduct=await product.save();
    res.json(updatedProduct);
 }else{
 res.status(404);
 throw new Error('Resource not found');
 }
 
});

//@desc Delete a product
//@route DELETE/api/products/:id
//@access Private/Admin
const deleteProduct= asyncHandler(async(req,res)=> { 
    


    const product=await Product.findById(req.params.id);
 if(product){
    await Product.deleteOne({_id: product._id});
    res.status()
 }else{
  res.status(404);
  throw new Error('Resource not found');
 }
    
});




export{getProducts,getProductsByID,createProduct,deleteProduct};