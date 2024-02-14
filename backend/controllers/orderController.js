import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models.orderModel.js';

//@desc  Create new order
//@route POST/api.orders
//@access Private
const addOrderItems= asyncHandler(async(req,res)=> { 
  const {
   orderItems,
   shippingAddress,
   paymentMethod,
   itemsPrice,
   taxPrice,
   shippingPrice,
   totalPrice,
  }=req.body

  if(orderItems && orderItems.length===0){
   res.status(400);
   throw new Error ('No order items');
   
  }else{
   const order=new Order({
      orderItems:orderItems.map((x)=>({
         ...x,
         product:x._id,
         _id:undefined

      })),
      user:req.user._id,
      shippingAddress,
      paymentMethod,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
   });
    const createdOrder=await order.save();
    res.status(201).json(createdOrder);
  }

});

//@desc  Get logged in user order
//@route GET/api/orders/myorders
//@access Private
const getMyOrders= asyncHandler(async(req,res)=> { 
 const orders=await Order.find({user:req.user._id});
  res.status(200).json(orders);
 });
 
 

//@desc Get order by ID
//@route Get/api.orders/:id
//@access Private
const getOrderById= asyncHandler(async(req,res)=> { 
   
 });
 
 
//@desc Update order to paid
//@route GET/api/orders/:id/pay
//@access Private
const updateOrderToPaid= asyncHandler(async(req,res)=> { 
    res.send('update order to paid');
 const order=await Order.findbyId(req.params.id).populate
 ('user','name email');
 if(order){
res.status(200).json(order);
 }else{
   res.status(404)
 }
});
 
 
//@desc Update order to delivered
//@route GET/api/orders/:id/pay
//@access Private/admin
const updateOrderToDelivered= asyncHandler(async(req,res)=> { 
    res.send('update order to delivered');
 });
 
//@desc Get all orders
//@route GET/api/orders
//@access Private/admin
const getOrders= asyncHandler(async(req,res)=> { 
    res.send('get all orders');
 });
 
 export{
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders
 };
 
 
 
