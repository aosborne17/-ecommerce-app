import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

// @description  Create New Order
// @route  POST /api/orders
// @access Private

const addOrderItems = asyncHandler(async (req, res) => {
  // these are akk the parameters we will receive when a user places an order
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  if (orderItems && !orderItems.length) {
    res.status(400);
    throw new Error('No Order Items');
    return;
  } else {
    const order = new Order({
      orderItems,
      // as this is a protected route, we will be able to use the token to get the id of the signed in user
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

export { addOrderItems };

// @description  getOrderById
// @route  GET /api/orders/:id
// @access Private

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    // here we have attached some details from another model and returned the fields we want
    'user',
    'name email'
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order Not Found');
  }
});

export { getOrderById };

// @description  update order to piad
// @route  PUT /api/orders/:id/pay
// @access Private

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    // Here we are updating the database with the new information we receive when the user has payed for the order
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order Not Found');
  }
});

export { updateOrderToPaid };

// @description  get logged in user orders
// @route  GET /api/orders/myorders
// @access Private

const getMyOrders = asyncHandler(async (req, res) => {
  // here we only want the orders where the user field is the same as the logged in user
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json(orders);
});

export { getMyOrders };
